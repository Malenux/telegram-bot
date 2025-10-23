const { ChromaClient } = require('chromadb')

async function find (req, res) {
  try {
    const query = req.query.query || ''
    if (!query.trim()) return res.json([])

    const client = new ChromaClient()
    const collection = await client.getOrCreateCollection({ name: 'products' })

    const results = await collection.query({
      queryTexts: [query],
      nResults: 10
    })

    const ids = results.ids[0] || []
    const metadatas = results.metadatas[0] || []
    const distances = results.distances[0] || []

    const response = ids.map((id, i) => ({
      id,
      distancia: distances[i],
      ...metadatas[i]
    }))

    const ordenados = response.sort((a, b) => a.distancia - b.distancia)

    const top2 = ordenados.slice(0, 3)

    res.json(top2)
  } catch (error) {
    console.error('❌ Error en búsqueda:', error)
    res.status(500).json({ error: 'Error al buscar productos' })
  }
}

module.exports = { find }
