const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')

const CustomerCredential = sequelizeDb.CustomerCredential
const Customer = sequelizeDb.Customer

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
