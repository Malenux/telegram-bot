// este archivo es el que se encarga de inicializar la base de datos y cargar los modelos de "sequelize"
const express = require('express') // llama a express para poder utilizarlo en el archivo
const router = express.Router() // crea una instancia (es decir, un objeto) de express.Router() para poder utilizarlo en el archivo

//  aqui se importan los archivos de las rutas de la API
const adminUsers = require('./admin/users.js')
const adminFaqs = require('./admin/faqs.js')
const adminCustomers = require('./admin/customers.js')

// esto es para que se pueda utilizar el archivo en otros archivos
router.use('/admin/users', adminUsers)
router.use('/admin/customer', adminCustomers)
router.use('/admin/faqs', adminFaqs)

module.exports = router
// se exporta el objeto router para que se pueda utilizar en otros archivos
