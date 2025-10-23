const { ChromaClient } = require('chromadb')

async function buscarProductos (query, nResults = 2) {
  const client = new ChromaClient()
  const collection = await client.getOrCreateCollection({ name: 'products' })

  const results = await collection.query({
    queryTexts: [query],
    nResults
  })

  const ids = results.ids[0] || []
  const metadatas = results.metadatas[0] || []
  const distances = results.distances[0] || []

  return ids.map((id, i) => ({
    id,
    distancia: distances[i],
    ...metadatas[i]
  }))
}

module.exports = { buscarProductos }
