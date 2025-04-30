module.exports = async (req, res, next) => {
  next()

  if (!req.ip || req.ip !== '::1') {
    try {
      const ipClient = req.ip.replace('::ffff:', '')
      const response = await fetch(`http://ip-api.com/json/${ipClient}`)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error fetching user tracking data:', error)
    }
  }
}

// se pone el next() antes de la llamada a la api para que no se bloquee el servidor y para que no se bloquee la respuesta del cliente
// y se pueda seguir ejecutando el resto del código.
// el next es una función que se utiliza para pasar el control al siguiente middleware en la cadena de middlewares de express
// y se utliza para que el servidor no se bloquee y pueda seguir ejecutando el resto del código.
