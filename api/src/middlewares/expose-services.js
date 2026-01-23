const services = {
  telegramService: new (require('../services/telegram-service'))(process.env.TELEGRAM_ADMIN_TOKEN, process.env.TELEGRAM_ADMIN_CHAT_ID),
  authorizationService: new (require('../services/authorization-service'))(),
}

function createServiceMiddleware (serviceName) {
  return (req, res, next) => {
    req[serviceName] = services[serviceName]
    next()
  }
}

module.exports = Object.keys(services).reduce((middlewares, serviceName) => {
  middlewares[`${serviceName}Middleware`] = createServiceMiddleware(serviceName)
  return middlewares
}, {})
