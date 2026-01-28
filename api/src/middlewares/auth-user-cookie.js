module.exports = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).send({
      message: 'No autorizado. Debe iniciar sesión como usuario.',
      redirection: '/admin/login'
    })
  }
}
