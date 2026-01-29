const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')

const UserCredential = sequelizeDb.UserCredential

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacíos.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).send({ message: 'La dirección de correo electrónico no es válida.' })
    }

    const credential = await UserCredential.findOne({
      where: { email, deletedAt: null }
    })

    if (!credential) {
      return res.status(401).send({ message: 'Usuario o contraseña incorrecta' })
    }

    const passwordIsValid = await bcrypt.compare(password, credential.password)

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Usuario o contraseña incorrecta' })
    }

    req.session.user = {
      id: credential.id,
      admin: true
    }

    res.status(200).send({ redirection: '/admin' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error al iniciar sesión.' })
  }
}

exports.checkSignin = (req, res) => {
  if (req.session.user) {
    return res.status(200).send({ redirection: '/admin' })
  }
  res.status(401).send({ redirection: '/admin/login' })
}

exports.reset = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).send({ message: 'El email es obligatorio' })
    }

    const credential = await UserCredential.findOne({
      where: { email, deletedAt: null }
    })

    if (!credential) {
      return res.status(404).send({ message: 'Usuario no encontrado' })
    }

    await req.authorizationService.createResetPasswordToken(
      credential.id,
      'user'
    )

    res.status(200).send({
      message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.'
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error al solicitar el reseteo de contraseña.' })
  }
}
