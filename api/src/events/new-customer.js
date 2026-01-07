const EmailService = require('../services/email-services.js')

exports.handleEvent = async (redisClient, subscriberClient) => {
  subscriberClient.subscribe('customer', (err) => {
    if (err) {
      console.error('[NEW-CUSTOMER] 🔴 Error al suscribirse al canal:', err)
    }
  })

  subscriberClient.on('message', async (channel, message) => {
    if (channel === 'customer') {
      const data = JSON.parse(message)
      const emailService = new EmailService('gmail')

      emailService.sendEmail(data, 'customer', 'activationUrl', { name: data.name })
    }
  })
}
