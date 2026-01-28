const { ChromaClient } = require('chromadb')
const client = new ChromaClient()

exports.searchProducts = async (req, res) => {
  try {
    const collection = await client.getOrCreateCollection({
      name: 'products'
    })

    const queryResults = await collection.query({
      queryTexts: [req.body.query],
      nResults: 5,
    })

    const products = queryResults.metadatas[0].map(result => result)

    console.log(products)

    res.status(200).send({
      success: true,
      results: products
    })
  } catch (error) {
    console.error('Error en searchProducts:', error)
    res.status(500).send({
      message: 'Error al buscar productos',
      error: error.message
    })
  }
}
