const { MongoClient, ObjectId } = require('mongodb')

module.exports = class MongoDBService {
  static instance = null

  constructor ({
    uri,
    dbName
  }) {
    console.log('[MongoDB] 🚀 Inicializando servicio de MongoDB')
    this.uri = uri
    this.dbName = dbName

    this.client = new MongoClient(uri)
    this.client.connect()
    this.db = this.client.db(this.dbName)
  }

  async changeDb (dbName) {
    this.dbName = dbName
    this.db = this.client.db(this.dbName)
  }

  async getCollection (collection) {
    console.log(`[MongoDB] ⚙️ Obteniendo coleccion ${collection}`)
    return this.db.collection(collection).find().toArray()
  }

  async getFirst (collection) {
    console.log(`[MongoDB] ⚙️Obteniendo primer documento de la coleccion ${collection}`)
    return await this.db.collection(collection).findOne()
  }

  async insertMany (collection, docs) {
    console.log(`[MongoDB] ⚙️ Insertando ${docs.length} documentos en la coleccion ${collection}`)
    return await this.db.collection(collection).insertMany(docs)
  }

  async insertOne (collection, doc) {
    console.log(`[MongoDB] ⚙️ Insertando documento en la coleccion ${collection}`)
    return await this.db.collection(collection).insertOne(doc)
  }

  async updateOne (collection, filter, update) {
    console.log(`[MongoDB] ♻️ Actualizando documento en la coleccion ${collection}`)
    return await this.db.collection(collection).updateOne(filter, update)
  }

  async updateMany (collection, filter, update) {
    console.log(`[MongoDB] ♻️ Actualizando documentos en la coleccion ${collection}`)
    return await this.db.collection(collection).updateMany(filter, update)
  }

  async processElementsWithKeywords (elements, openai) {
    console.log(`[MongoDB] 🔘Iniciando procesamiento de ${elements.length} elementos para extraer keywords`)

    const result = {
      ids: [],
      documents: [],
      metadatas: []
    }

    const tasks = elements.map(async (element) => {
      const jsonString = JSON.stringify(element)
      console.log(`[MongoDB] ⚙️ Procesando elemento con ID: ${element.id}`)

      console.log('[MongoDB] ℹ️ Enviando JSON a OpenAI para extraccion de keywords')
      const response = await openai.runPrompt(
        process.env.EXTRACT_KEYWORDS_BY_JSON_PROMPT_ID,
        { json: jsonString }
      )
      console.log('[MongoDB] ℹ️ Respuesta recibida de OpenAI')

      const parsed = JSON.parse(response.output_text)
      console.log('[MongoDB] ✅ Keywords parseadas correctamente')

      const keywords = JSON.stringify(parsed.keywords)
      console.log(`[MongoDB] ℹ️ Keywords extraidas: ${parsed.keywords.length} palabras clave`)

      result.ids.push(element.id)
      result.documents.push(keywords)
      result.metadatas.push({
        ...element,
        specifications: null
      })
    })

    console.log('[MongoDB] ⚙️ Esperando finalizacion de todas las tareas de procesamiento')
    await Promise.all(tasks)
    console.log(`[MongoDB] ✅ Procesamiento completado: ${result.ids.length} elementos procesados`)

    return result
  }

  createId (id) {
    return new ObjectId(id)
  }

  async close () {
    console.log('[MongoDB] 👋 Cerrando conexion a MongoDB')
    await this.client.close()
  }
}
