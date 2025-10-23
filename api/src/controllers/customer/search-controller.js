const { ChromaClient } = require('chromadb')
const chroma = new ChromaClient()

async function find (req, res) {
  try {
    const searchText = req.query.query || ''
    if (!searchText.trim()) return res.json([])

    const productCollection = await chroma.getOrCreateCollection({ name: 'products' })

    const queryResults = await productCollection.query({
      queryTexts: [searchText],
      nResults: 10
    })

    const resultIds = queryResults.ids[0] || []
    const resultMetadatas = queryResults.metadatas[0] || []
    const resultDistances = queryResults.distances[0] || []

    const combinedResults = resultIds.map((id, index) => ({
      id,
      distance: resultDistances[index],
      ...resultMetadatas[index]
    }))

    const sortedResults = combinedResults.sort((a, b) => a.distance - b.distance)
    const topResults = sortedResults.slice(0, 3)

    res.json(topResults)
  } catch (error) {
    console.error('❌ Error en búsqueda:', error)
    res.status(500).json({ error: 'Error al buscar productos' })
  }
}

module.exports = { find }
