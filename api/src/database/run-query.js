module.exports = async function runQuery ({ userQuery, semanticAnswer, threadId, origin }) {
  const GraphService = require('../services/graph-service')
  const VectorService = require('../services/vector-service')
  const OpenAIService = require('../services/openai-service')
  const MongoDBService = require('../services/mongodb-service')
  const { broadcast } = require('../services/websocket-service')

  console.log('[runQuery] 🚀 Iniciando proceso de consulta')
  console.log(`[runQuery] 📝 Parametros recibidos - threadId: ${threadId}, origin: ${origin}, semanticAnswer: ${semanticAnswer}`)

  const mongoService = new MongoDBService({
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB
  })

  const graphService = new GraphService()
  const vectorService = new VectorService({ collectionName: process.env.CHROMADB_DATABASE })
  const openaiService = new OpenAIService()

  const shouldBroadcast = origin === 'web'  // ✅ Definir fuera del try

  try {
    console.log('[runQuery] ⚙️ Obteniendo elemento de referencia desde MongoDB')
    const element = await mongoService.getFirst('elements')

    const { _id, id, specifications, ...cleanElement } = element
    console.log('[runQuery] 🟢 Elemento obtenido:', element)
    const whereFields = {}
    for (const [key, value] of Object.entries(cleanElement)) {
      whereFields[key] = typeof value
    }
    console.log('[runQuery] 📚 Tipos de campos mapeados:', Object.keys(whereFields).length, 'campos')

    const constructQueryResponse = await openaiService.runPrompt(
      process.env.CONSTRUCT_QUERY_PROMPT_ID,
      { query: userQuery, wherefields: JSON.stringify(whereFields) }
    )
    console.log('[runQuery] 🤖⚙️ Consulta construida mediante IA')

    if (shouldBroadcast) {
      console.log('[runQuery] ℹ️ Enviando progreso: 20% - Construyendo la consulta')
      broadcast(threadId, {
        threadId,
        completePercentage: 20,
        message: '⚙️ Construyendo la consulta'
      })
    }

    const parsed = JSON.parse(constructQueryResponse.output_text)
    console.log('[runQuery] 🟢 Respuesta de construccion parseada correctamente')

    const baseQueryOptions = {
      queryTexts: parsed.queryText,
      nResults: 1
    }

    const whereChromaDbExists = parsed.whereChromaDb &&
    typeof parsed.whereChromaDb === 'object' &&
    Object.keys(parsed.whereChromaDb).length > 0

    let queryOptions
    if (whereChromaDbExists) {
      console.log('[runQuery] ⚙️ Aplicando filtros whereChromaDb a la consulta vectorial')
      queryOptions = { ...baseQueryOptions, where: parsed.whereChromaDb }
    } else {
      console.log('[runQuery] ⚙️ Sin filtros whereChromaDb - usando consulta base')
      queryOptions = baseQueryOptions
    }

    if (shouldBroadcast) {
      console.log('[runQuery] ℹ️ Enviando progreso: 40% - Buscando mejor resultado')
      broadcast(threadId, {
        threadId,
        completePercentage: 40,
        message: 'Buscando mejor resultado'
      })
    }

    console.log('[runQuery] Ejecutando busqueda vectorial en ChromaDB')
    const vectorResult = await vectorService.query(queryOptions)
    console.log('[runQuery] Resultado vectorial obtenido')

    if (shouldBroadcast) {
      console.log('[runQuery] ℹ️ Enviando progreso: 60% - Buscando resultados relacionados')
      broadcast(threadId, {
        threadId,
        completePercentage: 60,
        message: 'Buscando resultados relacionados'
      })
    }

    const elementId = vectorResult.ids[0][0]
    console.log(`[runQuery] 💫 ID del elemento encontrado: ${elementId}`)

    console.log('[runQuery] 🌐 Consultando grafo Neo4j para relaciones')
    const elements = await graphService.getRelatedAndSelf({
      entity: 'Element',
      entityId: elementId,
      relation: 'HAS_SPECIFICATION',
      entityConnected: 'Specification',
      where: parsed.whereNeo4j
    })
    console.log(`[runQuery] 🟢 Elementos relacionados obtenidos: ${elements.length} elementos`)

    graphService.close()
    console.log('[runQuery] 🌐🔒 Conexion con Neo4j cerrada')

    if (shouldBroadcast) {
      console.log('[runQuery] ℹ️ Enviando progreso: 80% - Procesando resultados')
      broadcast(threadId, {
        threadId,
        completePercentage: 80,
        message: 'Procesando resultados'
      })
    }

    const promptId = semanticAnswer
      ? process.env.SEMANTIC_ANSWER_PROMPT_ID
      : process.env.FILTER_ELEMENTS_PROMPT_ID

    console.log(`[runQuery] ⚙️ Ejecutando prompt de ${semanticAnswer ? 'respuesta semantica' : 'filtrado de elementos'}`)
    const response = await openaiService.runPrompt(promptId, {
      query: userQuery,
      data: JSON.stringify(elements)
    })
    console.log('[runQuery] 🤖✅ Respuesta del modelo de IA obtenida')

    console.log('[runQuery] Actualizando thread en MongoDB')
    await mongoService.updateOne('threads', { _id: mongoService.createId(threadId) }, {
      $set: {
        constructQueryResponse,
        vectorResult,
        elements,
        answer: response.output_text,
        updatedAt: new Date()
      }
    })
    console.log('[runQuery] 📚✅ Thread actualizado correctamente')

    let finalOutput = response.output_text

    if (!semanticAnswer) {
      console.log('[runQuery] ⚙️ Modo no semantico: filtrando elementos por IDs')
      const idsCandidates = JSON.parse(response.output_text)
      finalOutput = elements.filter(element => idsCandidates.includes(element.id))
      console.log(`[runQuery] 🟢 Elementos filtrados: ${finalOutput.length} de ${elements.length}`)
    }

    if (shouldBroadcast) {
      console.log('[runQuery] ℹ️Enviando progreso: 100% - Listo')
      broadcast(threadId, {
        threadId,
        completePercentage: 100,
        message: 'Listo',
        response: finalOutput
      })
      return finalOutput
    } else {
      console.log('[runQuery] 📚 Retornando respuesta directamente (origen no web)')
      return finalOutput
    }
  } catch (error) {
    console.error('[runQuery] 🚨 Error capturado en el proceso:', error.message)
    console.error('[runQuery] 🚨 Stack trace:', error.stack)

    if (shouldBroadcast) {
      console.log('[runQuery] ⚠️ Notificando error via broadcast')
      broadcast(threadId, {
        threadId,
        completePercentage: 100,
        message: 'Error'
      })
    }

    console.error('[runQuery] 🔴 Error en runQuery:', error)
    return null
  } finally {
    if (mongoService && typeof mongoService.close === 'function') {
      await mongoService.close()
      console.log('[runQuery] 📚🔒 Conexion con MongoDB cerrada')
    }
  }
}
