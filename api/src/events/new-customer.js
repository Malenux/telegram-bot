const AuthorizationService = require('../services/authorization-service')
const EmailService = require('../services/email-service')

exports.handleEvent = async (redisClient, subscriberClient) => {
  await subscriberClient.subscribe('new-customer', async (message) => {
    try {
      const data = JSON.parse(message)

      const authorizationService = new AuthorizationService()
      const activationUrl = await authorizationService.createActivationToken(data.id, 'customer')
      const customerBotActivationTokenUrl = await authorizationService.createActivationToken(data.id, 'customer-bot-activation-token')

      const emailService = new EmailService('gmail')
      await emailService.sendEmail(
        data,
        'customer',
        'activationUrl',
        {
          name: data.name,
          activationUrl,
          customerBotActivationTokenUrl
        }
      )
      console.log('[new-customer] Email enviado correctamente')
    } catch (error) {
      console.error('[new-customer] Error procesando mensaje:', error)
    }
  })
}
