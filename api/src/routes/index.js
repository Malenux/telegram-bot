const express = require('express')
const router = express.Router()

const adminUsers = require('./admin/users.js')
const adminFaqs = require('./admin/faqs.js')
const adminCustomers = require('./admin/customers.js')

router.use('/admin/users', adminUsers)
router.use('/admin/customer', adminCustomers)
router.use('/admin/faqs', adminFaqs)

module.exports = router
