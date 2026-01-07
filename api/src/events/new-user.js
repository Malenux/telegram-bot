const EmailService = require('../services/email-services.js')

exports.handleEvent = async (redisClient, subscriberClient) => {
  subscriberClient.subscribe('new-user', (err) => {
    if (err) {
      console.error('🔴 Error al suscribirse al canal:', err)
    }
  })

  subscriberClient.on('message', async (channel, message) => {
    if (channel === 'new-user') {
      const data = JSON.parse(message)
      const emailService = new EmailService('gmail')

      try {
        emailService.sentEmail(data, 'user', 'activationUrl', {
          name: data.name,
          email: data.email,
          uuid: data.uuid
        })

        console.log('[New User] 🟢 ✉️ Email enviado', data)
      } catch (err) {
        console.error('[New User] 🔴 ✉️ Error al enviar email:', err)
      }
    }
  })
}
