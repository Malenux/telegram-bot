// es una bariable |global| (utilizable para linux/windows...) que se puede leer cualquier parte del archivo para llamar a otro archivo y
// ha recibido el nombre "basedir" y te devuelve la ruta del archivo

global.__basedir = __dirname

const app = require('./src/app')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT} `)
})
