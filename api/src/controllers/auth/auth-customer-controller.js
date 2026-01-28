// API: api/src/controllers/auth/auth-customer-controller.js
const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')
const CustomerCredential = sequelizeDb.CustomerCredential
const Customer = sequelizeDb.Customer

exports.signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacios.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(req.body.email)) {
      return res.status(400).send({ message: 'La dirección de correo electrónico no es válida.' })
    }

    const data = await CustomerCredential.findOne({
      where: {
        email: req.body.email,
        deletedAt: null
      }
    })

    if (!data) {
      return res.status(404).send({ message: 'Cliente o contraseña incorrecta' })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    )

    if (!passwordIsValid) {
      return res.status(404).send({
        message: 'Cliente o contraseña incorrecta'
      })
    }

    req.session.customer = { id: data.customerId, type: 'customer' }

    console.log(req.session)

    res.status(200).send({
      redirection: '/customer-panel'
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  }
}

exports.checkSignin = (req, res) => {
  if (req.session.customer) {
    res.status(200).send({
      redirection: '/customer-panel'
    })
  } else {
    res.status(401).send({
      redirection: '/login-customer'
    })
  }
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
      return res.status(404).send({ message: 'Customer no encontrado' })
    }

    res.status(200).send(customer)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message || 'Error al obtener los datos del customer.' })
  }
}

exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err)
        return res.status(500).send({ message: 'Error al cerrar sesión' })
      }
      res.status(200).send({ message: 'Sesión cerrada correctamente' })
    })

    // Opción 2 (alternativa): Solo eliminar customer de la sesión
    // delete req.session.customer
    // res.status(200).send({ message: 'Sesión cerrada correctamente' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Error al cerrar sesión' })
  }
}

exports.reset = async (req, res) => {
  CustomerCredential.findOne({
    where: {
      email: req.body.email,
      deletedAt: null
    }
  }).then(async data => {
    if (!data) {
      return res.status(404).send({ message: 'Cliente no encontrado' })
    }

    await req.authorizationService.createResetPasswordToken(data.customerId, 'customer')

    res.status(200).send({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' })
  }).catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  })
}
