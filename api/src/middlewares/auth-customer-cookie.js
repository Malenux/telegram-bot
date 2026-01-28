module.exports = (req, res, next) => {
  if (req.session.customer) {
    next()
  } else {
    res.status(401).send({
      message: 'No autorizado. Debe iniciar sesión como cliente.',
      redirection: '/login-customer'
    })
  }
}
