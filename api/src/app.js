const express = require('express')
const app = express()

const errorHandler = require('./middlewares/error-handler')
const userAgentMiddleware = require('./middlewares/user-agent')
const userTrackingMiddleware = require('./middlewares/user-tracking')
const exposeServiceMiddleware = require('./middlewares/expose-services')

const { createClient } = require('redis')
const session = require('express-session')
const { RedisStore } = require('connect-redis')

let redisClient
let subscriberClient

async function initializeRedis () {
  redisClient = createClient({ url: process.env.REDIS_URL })

  redisClient.on('connect', () => console.log('✅ Redis conectado'))
  redisClient.on('error', (err) => console.error('❌ Redis error:', err))
  redisClient.on('ready', () => console.log('✅ Redis listo'))

  await redisClient.connect()

  subscriberClient = redisClient.duplicate()
  await subscriberClient.connect()

  require('./events')(redisClient, subscriberClient)
}

initializeRedis().catch(console.error)

const sessionConfig = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    domain: new URL(process.env.API_URL).hostname,
    path: '/',
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 3600
  }
})

app.use((req, res, next) => {
  req.redisClient = redisClient
  next()
})

const routes = require('./routes')

app.use(sessionConfig)
app.use(express.json({ limit: '10mb', extended: true }))
app.use(userTrackingMiddleware)
app.use(userAgentMiddleware)
app.use(...Object.values(exposeServiceMiddleware))

app.use('/api', routes)
app.use(errorHandler)

module.exports = app
