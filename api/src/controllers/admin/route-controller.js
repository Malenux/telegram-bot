// const mongooseDb = require('../../models/mongoose')
// const localSeo = mongooseDb.LocalSeo

// exports.findAll = async (req, res) => {
//   const result = await localSeo.find({ enviromment: 'admin', languageAlias: req.userLenguage })

//   const response = result.reduce((acc, item) => {
//     acc[item.route] = {
//       filename: item.filename,
//       title: item.title,
//       description: item.description,
//     }

//     item.slugs.forEach(slug => {
//       acc[`${item.route}/${slug}`] = {
//         filename: item.filename,
//         title: item.title,
//         description: item.description,
//       }
//     })

//     return acc
//   }, {})

//   res.status(200).send(response)
// }
