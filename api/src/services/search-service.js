const { ChromaClient } = require('chromadb')

async function buscarProductos (searchText, maxResults = 2) {
  const chroma = new ChromaClient()
  const productCollection = await chroma.getOrCreateCollection({ name: 'products' })

  const queryResults = await productCollection.query({
    queryTexts: [searchText],
    nResults: maxResults
  })

  const resultIds = queryResults.ids[0] || []
  const resultMetadatas = queryResults.metadatas[0] || []
  const resultDistances = queryResults.distances[0] || []

  return resultIds.map((id, index) => ({
    id,
    distance: resultDistances[index],
    ...resultMetadatas[index]
  }))
}

module.exports = { buscarProductos }
