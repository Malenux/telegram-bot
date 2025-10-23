const express = require('express')
const controller = require('../../controllers/customer/search-controller.js')

const router = express.Router()

router.get('/', controller.find)

module.exports = router
