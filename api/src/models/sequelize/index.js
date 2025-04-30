// este archivo es el que se encarga de inicializar la base de datos y cargar los modelos de "sequelize"
// pero es la configuración mínima
const fs = require('fs') // aquí se encarga de leer los archibos de la carpeta 'files sistem
const Sequelize = require('sequelize') // lee los archivos de la carpeta 'sequelize'
const path = require('path') // lee los archivos de la carpeta 'path' que se encarga de manejar las rutas de los archivos
const basename = path.basename(__filename) // se obtiene el nombre del archivo actual
const sequelizeDb = {} // se esta preparando un objeto vacio para llenarlo con la información que se va a exportar para así utilizarlo en otros archivos

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  // variable sequlize para que coja la configuración del archivo .env

  host: process.env.DATABASE_HOST, // host de la base de datos
  dialect: process.env.DATABASE_DIALECT, // dialecto de la base de datos

  pool: {
    max: 5, // máximo de conexiones simultaneas de los usuarios
    min: 0, // mínimo de conexiones simultaneas de los usuarios
    acquire: 30000, // tiempo milisegundos máximo de espera para una conexión
    idle: 10000 // tiempo milisegundos máximo de espera para una conexión inactiva
  }
})
// aqui se inicializa la base de datos y se le pasan los parametros de configuracion

fs.readdirSync(__dirname) // lee los archivos de la carpeta
  .filter(file => { // para filtrar los archivos que no son el archivo actual
    return ( // solo se quedan los archivos que cumplen las siguientes condinciones:
      file.indexOf('.') !== 0 && // si el archivo noj empiza con punto
      file !== basename && // si el archivo no es el actual
      file.slice(-3) === '.js' // si el archivo termina con .js
    )
  })
  .forEach(file => { // para cada archivo que cumpla las condiciones anteriores
    const model = require(path.join(__dirname, file))( // aqui se carga el archivo
      sequelize, // se le pasa la variable sequelize que contiene la configuración de la base de datos
      Sequelize.DataTypes // se le pasa el tipo de datos de sequelize
    )
    sequelizeDb[model.name] = model // se le asigna el modelo al objeto sequelizeDb con el nombre del modelo como clave
  })
  // aqui se cargan los modelos de la base de datos y se le pasan los parametros de configuracion

Object.keys(sequelizeDb).forEach(modelName => { // para cada modelo que se ha cargado
  if (sequelizeDb[modelName].associate) { // si el modelo tiene una funcion associate, es decir, si tiene asociaciones con otros modelos
    sequelizeDb[modelName].associate(sequelizeDb) // se le pasa el objeto sequelizeDb para que pueda acceder a los modelos
  }
})
// aqui se asocian los modelos de la base de datos

sequelizeDb.sequelize = sequelize // se le asigna la variable 'sequelize' al objeto sequelizeDb para que pueda ser utilizado en otros archivos
sequelizeDb.Sequelize = Sequelize

module.exports = sequelizeDb
// aqui se exporta la base de datos y los modelos
