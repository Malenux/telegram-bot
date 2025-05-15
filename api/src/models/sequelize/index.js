// Este archivo se encarga de inicializar la conexion a la BD y cargar los modelos definidios en los archivos de este directiorio.
const fs = require('fs') // Módulo para interactuar con el sistema de archivos
const Sequelize = require('sequelize') // ORM para manejar bases de datos SQL
const path = require('path') // Módulo para manipular rutas de archivos

const basename = path.basename(__filename) // Nombre del archivo actual (usado para ignorarse a sí mismo)
// path: utilizado para manejo de rutas de archivos
const sequelizeDb = {} // Objeto donde se almacenarán los modelos cargados

// Inicializa la conexión a la base de datos con la configuración tomada de variables de entorno de Sequelize (lo pone en la constante y lo que esta en amarillo)
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  pool: {
    max: 5, // Número máximo de conexiones en el pool.
    min: 0, // Número mínimo de conexiones en el pool.
    acquire: 30000, // Tiempo máximo en milisegundos que el pool intentará establecer una conexión antes de lanzar un error.
    idle: 10000, // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada.
  },
}
)

// Lee todos los archivos del directorio actual (excepto este mismo) y carga los modelos definidos en ellos
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    )
  })
  // Aqui se carga los modelos de la base de datos y se le pasan los parametros de configuración
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    sequelizeDb[model.name] = model
  })

// Si los modelos definen asociaciones (realaciones), las inicializa
Object.keys(sequelizeDb).forEach(modelName => {
  if (sequelizeDb[modelName].associate) {
    sequelizeDb[modelName].associate(sequelizeDb)
  }
})

// Expone la instancia de Sequelize y los modelos para usarlos en otras partes del proyecto
sequelizeDb.sequelize = sequelize
sequelizeDb.Sequelize = Sequelize

module.exports = sequelizeDb
