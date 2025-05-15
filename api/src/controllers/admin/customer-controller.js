const sequelizeDb = require('../../models/sequelize')
const Customer = sequelizeDb.Customer
const Op = sequelizeDb.Sequelize.Op // importa el modelo de cliente y el operador Op de Sequelize para realizar consultas

exports.create = async (req, res, next) => { // crea un nuevo cliente
  try {
    const data = await Customer.create(req.body) // crea un nuevo cliente con los datos que se le pasan por el body de la petición
    res.status(200).send(data) // devuelve el cliente creado
  } catch (err) { // si hay un error, lo lanza al siguiente middleware
    if (err.name === 'SequelizeValidationError') {
      err.statusCode = 422
    }
    next(err)
  }
}

exports.findAll = async (req, res, next) => { // busca todos los clientes
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.size) || 10
    const offset = (page - 1) * limit
    const whereStatement = {}

    for (const key in req.query) { // recorre todos los parámetros de la query
      if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
        whereStatement[key] = { [Op.substring]: req.query[key] } // si el parámetro no está vacío y no es null, lo añade al whereStatement
      }
    }

    const condition = Object.keys(whereStatement).length > 0 // si hay algún parámetro en el whereStatement
      ? { [Op.and]: [whereStatement] }
      : {}

    const result = await Customer.findAndCountAll({ // busca todos los clientes y cuenta el número de clientes que hay
      where: condition,
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })

    result.meta = { // añade la información de la paginación al resultado
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page,
      size: limit
    }

    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await Customer.findByPk(id) // busca un dato por su id

    if (!data) { // si no encuentra el dato, lanza un error
      const err = new Error(`No se puede encontrar el elemento con la id=${id}.`)
      err.statusCode = 404
      throw err
    }

    res.status(200).send(data) // si encuentra el dato, lo devuelve
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => { // actualiza un cliente
  try {
    const id = req.params.id
    const [numberRowsAffected] = await Customer.update(req.body, { where: { id } })
    // actualiza el cliente con los datos que se le pasan por el body de la petición
    if (numberRowsAffected !== 1) {
      const err = new Error(`No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado o el cuerpo de la petición está vacío.`)
      err.statusCode = 404
      throw err
    }
    // si no se ha encontrado el cliente, lanza un error
    res.status(200).send({
      message: 'El elemento ha sido actualizado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id
    const numberRowsAffected = await Customer.destroy({ where: { id } })
    // borra el cliente con la id que se le pasa por la petición
    if (numberRowsAffected !== 1) {
      const err = new Error(`No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado.`)
      err.statusCode = 404
      throw err
    }

    res.status(200).send({
      message: 'El elemento ha sido borrado correctamente.'
    })
  } catch (err) {
    next(err)
  }
}
