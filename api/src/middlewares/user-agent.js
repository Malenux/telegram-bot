// Exporta una función que será usada como middleware en una aplicación (por ejemplo, Express.js)
module.exports = (req, res, next) => {
  // Añade una propiedad 'isRobot' al objeto de la solicitud que indica si el User-Agent parece ser de un bot, crawler o spider
  req.isRobot = /bot|crawler|spider|crawling/i.test(req.headers['user-agent'])

  // Añade una propiedad 'userLanguage' con el idioma principal del encabezado 'Accept-Language'; si no existe, usa un idioma por defecto del entorno
  req.userLanguage = req.headers['accept-language']
    ? (req.headers['accept-language'].split(',')[0]).split('-')[0]
    : process.env.DEFAULT_LANGUAGE

  // Llama a la siguiente función middleware en la cadena
  next()
}
