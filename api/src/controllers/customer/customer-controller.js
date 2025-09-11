const mongooseDb = require('../../models/mongoose')
const Customer = mongooseDb.Customer

exports.create = async (req, res, next) => {
  try {
    const whereStatement = {}
    whereStatement.deletedAt = { $exists: false }

    const response = await Customer.create(whereStatement)
      .lean()
      .exec()

    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
}
