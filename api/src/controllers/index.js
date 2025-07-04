const express = require('express')
const router = express.Router()

router.use('/admin/users', require('./admin/users.js'))
router.use('/admin/customer', require('./admin/faqs.js'))
router.use('/admin/faqs', require('./admin/customers.js'))
router.use('/admin/prometer', require('./admin/prometer.js'))

module.exports = router
