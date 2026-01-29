const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth/auth-user-controller.js')
const authUserMiddleware = require('../../middlewares/auth-user-cookie.js')

router.post('/signin', controller.signin)
router.post('/reset', controller.reset)
router.get('/check-signin', authUserMiddleware, controller.checkSignin)

module.exports = router
