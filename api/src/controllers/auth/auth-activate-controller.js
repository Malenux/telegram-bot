exports.activate = async (req, res) => {
  try {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

    console.log('📧 Password recibida:', req.body.password)
    console.log('📏 Longitud:', req.body.password?.length)
    console.log('✅ Test regex:', regex.test(req.body.password))

    if (!req.body.token || !req.body.password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacíos.' })
    }

    if (!regex.test(req.body.password)) {
      return res.status(400).send({ message: 'La contraseña no cumple con los requisitos mínimos.' })
    }

    const used = await req.authorizationService.useToken(req.body.token)

    if (!used) {
      return res.status(404).send({ message: 'Token no encontrado' })
    }

    await req.authorizationService.createCredentials(req.body.token, req.body.password)

    res.status(200).send({ message: 'Cuenta activada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Algún error ha surgido al activar la cuenta. Póngase en contacto con nosotros.' })
  }
}

exports.reset = async (req, res) => {
  try {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/

    console.log('📧 Password recibida:', req.body.password)
    console.log('📏 Longitud:', req.body.password?.length)
    console.log('✅ Test regex:', regex.test(req.body.password))

    if (!req.body.token || !req.body.password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacíos.' })
    }

    if (!regex.test(req.body.password)) {
      return res.status(400).send({ message: 'La contraseña no cumple con los requisitos mínimos.' })
    }

    const used = await req.authorizationService.useResetPasswordToken(req.body.token)

    if (!used) {
      return res.status(404).send({ message: 'Token no encontrado' })
    }

    await req.authorizationService.resetCredentials(req.body.token, req.body.password)

    res.status(200).send({ message: 'Contraseña restablecida correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Algún error ha surgido al restablecer la contraseña. Póngase en contacto con nosotros.' })
  }
}
