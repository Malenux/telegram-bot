const TelegramBot = require('node-telegram-bot-api')
const sequelizeDb = require('../models/sequelize')
const mongooseDb = require('../models/mongoose')
const OpenAIService = require('./openai-service')

const Customer = sequelizeDb.Customer
const CustomerBotActivationToken = sequelizeDb.CustomerBotActivationToken
const Chat = mongooseDb.Chat

class TelegramChatCustomerService {
  constructor (token) {
    this.token = token
    this.bot = new TelegramBot(this.token, { polling: true })
    this.activeChats = new Map()

    this.initializeHandlers()
  }

  initializeHandlers () {
    this.bot.onText(/\/start (.+)/, async (msg, match) => {
      await this.handleStartWithToken(msg, match[1])
    })

    this.bot.on('message', async (msg) => {
      if (msg.text && msg.text.startsWith('/start')) return

      await this.handleMessage(msg)
    })
  }

  async handleStartWithToken (msg, token) {
    const telegramId = msg.from.id.toString()
    const chatId = msg.chat.id

    try {
      const activationToken = await CustomerBotActivationToken.findOne({
        where: {
          token,
          used: false,
          expirationDate: {
            [sequelizeDb.Sequelize.Op.gt]: new Date()
          }
        }
      })

      if (!activationToken) {
        return this.bot.sendMessage(
          chatId,
          '❌ Token inválido o expirado. Por favor, solicita un nuevo enlace.'
        )
      }

      await Customer.update(
        { telegramId },
        { where: { id: activationToken.customerId } }
      )

      await activationToken.update({ used: true })

      const openai = new OpenAIService()
      await openai.createThread()

      this.activeChats.set(telegramId, {
        customerId: activationToken.customerId,
        threadId: openai.threadId
      })

      await Chat.create({
        customerStaffId: activationToken.customerId.toString(),
        assistantName: 'Customer Support Bot',
        assistantEndpoint: process.env.OPENAI_ASSISTANT_CHATBOT_ID,
        threadId: openai.threadId,
        resume: 'Chat iniciado desde Telegram',
        run: {},
        messages: [],
        deletedAt: null
      })

      await this.bot.sendMessage(
        chatId,
        '✅ ¡Cuenta vinculada correctamente!\n\n' +
        '🤖 Ahora puedes chatear conmigo. ¿En qué puedo ayudarte hoy?'
      )
    } catch (error) {
      console.error('Error en handleStartWithToken:', error)
      await this.bot.sendMessage(
        chatId,
        '❌ Ocurrió un error al vincular tu cuenta. Por favor, inténtalo de nuevo más tarde.'
      )
    }
  }

  async handleMessage (msg) {
    const telegramId = msg.from.id.toString()
    const chatId = msg.chat.id
    const text = msg.text

    if (!text) return

    try {
      let chatInfo = this.activeChats.get(telegramId)

      if (!chatInfo) {
        const customer = await Customer.findOne({
          where: { telegramId }
        })

        if (!customer) {
          return this.bot.sendMessage(
            chatId,
            '❌ No tienes una cuenta vinculada. Por favor, usa el enlace que recibiste por correo para comenzar.'
          )
        }

        const existingChat = await Chat.findOne({
          customerStaffId: customer.id.toString(),
          deletedAt: { $exists: false }
        }).sort({ createdAt: -1 }).lean()

        if (existingChat) {
          chatInfo = {
            customerId: customer.id,
            threadId: existingChat.threadId
          }
          this.activeChats.set(telegramId, chatInfo)
        } else {
          const openai = new OpenAIService()
          await openai.createThread()

          chatInfo = {
            customerId: customer.id,
            threadId: openai.threadId
          }
          this.activeChats.set(telegramId, chatInfo)

          await Chat.create({
            customerStaffId: customer.id.toString(),
            assistantName: 'Customer Support Bot',
            assistantEndpoint: process.env.OPENAI_ASSISTANT_CHATBOT_ID,
            threadId: openai.threadId,
            resume: 'Chat continuado desde Telegram',
            run: {},
            messages: [],
            deletedAt: null
          })
        }
      }

      await this.bot.sendChatAction(chatId, 'typing')

      const openai = new OpenAIService()
      openai.setThread(chatInfo.threadId)
      await openai.setAssistant(process.env.OPENAI_ASSISTANT_CHATBOT_ID)
      await openai.createMessage(text)
      await openai.runStatus()

      await Chat.findOneAndUpdate(
        { threadId: chatInfo.threadId },
        {
          messages: openai.messages,
          run: openai.run
        }
      )

      const response = openai.answer || 'Lo siento, no pude procesar tu mensaje.'

      const maxLength = 4096
      if (response.length > maxLength) {
        const chunks = this.splitMessage(response, maxLength)
        for (const chunk of chunks) {
          await this.bot.sendMessage(chatId, chunk)
        }
      } else {
        await this.bot.sendMessage(chatId, response)
      }
    } catch (error) {
      console.error('Error en handleMessage:', error)
      await this.bot.sendMessage(
        chatId,
        '❌ Ocurrió un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'
      )
    }
  }

  splitMessage (text, maxLength) {
    const chunks = []
    let currentChunk = ''

    const lines = text.split('\n')
    for (const line of lines) {
      if ((currentChunk + line + '\n').length > maxLength) {
        if (currentChunk) chunks.push(currentChunk.trim())
        currentChunk = line + '\n'
      } else {
        currentChunk += line + '\n'
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim())
    return chunks
  }

  async sendMessageToCustomer (telegramId, message) {
    try {
      await this.bot.sendMessage(telegramId, message)
      return true
    } catch (error) {
      console.error('Error enviando mensaje a customer:', error)
      return false
    }
  }
}

module.exports = TelegramChatCustomerService
