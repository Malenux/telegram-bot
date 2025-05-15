// Importa la instancia de Sequelize definida en los modelos
const sequelizeDb = require('../../models/sequelize')
// Obtiene el modelo 'Bot' definido en Sequelize
const Bot = sequelizeDb.Bot
// Importa el operador 'Op' de Sequelize para construir condiciones avanzadas en consultas
const Op = sequelizeDb.Sequelize.Op

// Controlador para crear una nueva instancia de Bot
exports.create = async (req, res, next) => {
  try {
    // Crea un nuevo registro en la base de datos con los datos enviados en el body de la petición
    const data = await Bot.create(req.body)
    // Envía una respuesta con el recurso creado
    res.status(200).send(data)
  } catch (err) {
    // Captura errores de validación de Sequelize y establece un status HTTP 422
    if (err.name === 'SequelizeValidationError') {
      err.statusCode = 422
    }
    // Pasa el error al middleware de manejo de errores
    next(err)
  }
}

// Controlador para obtener todos los registros con paginación y filtros dinámicos
exports.findAll = async (req, res, next) => {
  try {
    // Extrae y parsea los parámetros de paginación de la query string
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.size) || 10
    const offset = (page - 1) * limit

    // Inicializa un objeto para construir condiciones WHERE dinámicamente
    const whereStatement = {}

    // Recorre los parámetros de la query para construir condiciones de búsqueda
    for (const key in req.query) {
      if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
        // Usa el operador 'substring' para hacer búsquedas con coincidencia parcial
        whereStatement[key] = { [Op.substring]: req.query[key] }
      }
    }

    // Define la cláusula WHERE solo si hay condiciones activas
    const condition = Object.keys(whereStatement).length > 0
      ? { [Op.and]: [whereStatement] }
      : {}

    // Ejecuta la consulta con paginación, filtro, selección de campos y ordenamiento
    const result = await Bot.findAndCountAll({
      where: condition,
      attributes: ['id', 'platform', 'name', 'createdAt', 'updatedAt'], // selecciona campos específicos
      limit,
      offset,
      order: [['createdAt', 'DESC']] // ordena por fecha de creación descendente
    })

    // Agrega metadatos de paginación al resultado
    result.meta = {
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page,
      size: limit
    }

    // Devuelve los resultados paginados
    res.status(200).send(result)
  } catch (err) {
    // Pasa cualquier error al middleware de errores
    next(err)
  }
}

// Controlador para obtener un registro por su clave primaria (id)
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id
    // Busca un registro por su ID (primary key)
    const data = await Bot.findByPk(id)

    // Si no se encuentra el registro, lanza un error 404
    if (!data) {
      const err = new Error(`No se puede encontrar el elemento con la id=${id}.`)
      err.statusCode = 404
      throw err
    }

    // Devuelve el registro encontrado
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

// Controlador para actualizar un registro existente
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id
    // Ejecuta la actualización usando Sequelize y destructura el número de filas afectadas
    const [numberRowsAffected] = await Bot.update(req.body, { where: { id } })

    // Si no se actualizó ninguna fila, lanza un error 404
    if (numberRowsAffected !== 1) {
      const err = new Error(`No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado o el cuerpo de la petición está vacío.`)
      err.statusCode = 404
      throw err
    }

    // Confirma que la actualización fue exitosa
    res.status(200).send({
      message: 'El elemento ha sido actualizado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}

// Controlador para eliminar un registro por su ID
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id
    // Ejecuta la eliminación y obtiene el número de filas eliminadas
    const numberRowsAffected = await Bot.destroy({ where: { id } })

    // Si no se eliminó ninguna fila, lanza un error 404
    if (numberRowsAffected !== 1) {
      const err = new Error(`No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado.`)
      err.statusCode = 404
      throw err
    }

    // Confirma que la eliminación fue exitosa
    res.status(200).send({
      message: 'El elemento ha sido borrado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}
