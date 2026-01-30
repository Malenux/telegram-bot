const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')
const Customer = sequelizeDb.Customer
const CustomerCredential = sequelizeDb.CustomerCredential
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res, next) => {
  try {
    const data = await Customer.create(req.body)
    req.redisClient.publish('new-customer', JSON.stringify(data))
    res.status(200).send(data)
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      err.statusCode = 422
    }
    next(err)
  }
}

exports.findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.size) || 10
    const offset = (page - 1) * limit
    const whereStatement = {}

    for (const key in req.query) {
      if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
        whereStatement[key] = { [Op.substring]: req.query[key] }
      }
    }

    const condition = Object.keys(whereStatement).length > 0
      ? { [Op.and]: [whereStatement] }
      : {}

    const result = await Customer.findAndCountAll({
      where: condition,
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })

    result.meta = {
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page,
      size: limit
    }

    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await Customer.findByPk(id)

    if (!data) {
      const err = new Error()
      err.message = `No se puede encontrar el elemento con la id=${id}.`
      err.statusCode = 404
      throw err
    }

    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id
    const [numberRowsAffected] = await Customer.update(req.body, { where: { id } })

    if (numberRowsAffected !== 1) {
      const err = new Error()
      err.message = `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado.`
      err.statusCode = 404
      throw err
    }

    res.status(200).send({
      message: 'El elemento ha sido actualizado correctamente.'
    })
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      err.statusCode = 422
    }

    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id
    const numberRowsAffected = await Customer.destroy({ where: { id } })

    if (numberRowsAffected !== 1) {
      const err = new Error()
      err.message = `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado.`
      err.statusCode = 404
      throw err
    }

    res.status(200).send({
      message: 'El elemento ha sido borrado correctamente.'
    })
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      err.statusCode = 422
    }

    next(err)
  }
}

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacíos.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).send({ message: 'La dirección de correo electrónico no es válida.' })
    }

    const credential = await CustomerCredential.findOne({
      where: { email, deletedAt: null }
    })

    if (!credential) {
      return res.status(401).send({ message: 'Cliente o contraseña incorrecta' })
    }

    const passwordIsValid = await bcrypt.compare(password, credential.password)

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Cliente o contraseña incorrecta' })
    }

    req.session.customer = {
      id: credential.customerId,
      type: 'customer'
    }

    res.status(200).send({ redirection: '/customer-panel' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error al iniciar sesión.' })
  }
}

exports.checkSignin = (req, res) => {
  if (req.session.customer) {
    return res.status(200).send({ redirection: '/customer-panel' })
  }
  res.status(401).send({ redirection: '/login-customer' })
}

exports.getCurrentCustomer = async (req, res) => {
  try {
    if (!req.session.customer) {
      return res.status(401).send({ message: 'No hay sesión activa' })
    }

    const customer = await Customer.findByPk(req.session.customer.id, {
      attributes: ['id', 'name', 'email', 'createdAt']
    })

    if (!customer) {
      return res.status(404).send({ message: 'Cliente no encontrado' })
    }

    res.status(200).send(customer)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error al obtener los datos del cliente.' })
  }
}

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err)
      return res.status(500).send({ message: 'Error al cerrar sesión' })
    }
    res.status(200).send({ message: 'Sesión cerrada correctamente' })
  })
}

exports.reset = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).send({ message: 'El email es obligatorio' })
    }

    const credential = await CustomerCredential.findOne({
      where: { email, deletedAt: null }
    })

    if (!credential) {
      return res.status(404).send({ message: 'Cliente no encontrado' })
    }

    await req.authorizationService.createResetPasswordToken(
      credential.customerId,
      'customer'
    )

    res.status(200).send({
      message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.'
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error al solicitar el reseteo de contraseña.' })
  }
}
