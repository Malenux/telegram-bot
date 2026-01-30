const AuthorizationService = require('../services/authorization-service')
const EmailService = require('../services/email-service')

exports.handleEvent = async (redisClient, subscriberClient) => {
  await subscriberClient.subscribe('new-user', async (message) => {
    try {
      const data = JSON.parse(message)

      const authorizationService = new AuthorizationService()
      const activationUrl = await authorizationService.createActivationToken(data.id, 'user')

      const emailService = new EmailService('gmail')
      await emailService.sentEmail(
        data,
        'user',
        'activationUrl',
        { name: data.name, activationUrl }
      )
      console.log('[new-user] Email enviado correctamente')
    } catch (error) {
      console.error('[new-user] Error procesando mensaje:', error)
    }
  })
}
