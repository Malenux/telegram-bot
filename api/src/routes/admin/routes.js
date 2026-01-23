const express = require('express')
const router = express.Router()
const authCookie = require('../../middlewares/auth-cookie.js')
const controller = require('../../controllers/admin/route-controller.js')

router.post('/', [authCookie], controller.findAll)

module.exports = router
