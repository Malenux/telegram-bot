module.exports = (err, req, res, next) => {
  console.error('🛑 Error capturado:', err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Ha ocurrido un error inesperado en el servidor.'

  res.status(statusCode).json({
    error: true,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
// se le pone el module.exports para que se pueda importar en otro archivo y se le pone el nombre de la función que se va a exportar.
// se le pone el nombre de la función que se va a exportar y se le pone el nombre del archivo que se va a importar
// err es el error que se ha capturado
// req es la petición que se ha hecho al servidor
// res es la respuesta que se va a enviar al cliente
// next es la función que se utiliza para pasar el control al siguiente middleware
// el statusCode es la respuesta que se le va a enviar al cliente
