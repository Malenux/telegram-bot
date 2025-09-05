const express = require('express')
const router = express.Router()

router.use('/admin/bots', require('./admin/bots.js'))
router.use('/admin/customers-bot-chats', require('./admin/customer-bot-chats.js'))
router.use('/admin/customers-bots', require('./admin/customer-bots.js'))
router.use('/admin/customers-events', require('./admin/customer-events.js'))
router.use('/admin/customers', require('./admin/customers.js'))
router.use('/admin/email-errors', require('./admin/email-errors.js'))
router.use('/admin/emails', require('./admin/email.js'))
router.use('/admin/event-categories', require('./admin/event-categories.js'))
router.use('/admin/event-occurrences', require('./admin/event-occurrences.js'))
router.use('/admin/faqs', require('./admin/faqs.js'))
router.use('/admin/promoter-spots', require('./admin/promoter-spots.js'))
router.use('/admin/promoters', require('./admin/promoters.js'))
router.use('/admin/send-emails', require('./admin/send-email.js'))
router.use('/admin/spots', require('./admin/spots.js'))
router.use('/admin/towns', require('./admin/town.js'))
router.use('/admin/users', require('./admin/users.js'))

router.use('/customer/faqs', require('./customer/faqs.js'))

module.exports = router
