module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('CustomerCredentials',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Evento".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Evento".'
          }
        }
      },
      startDateTime: {
        type: DataTypes.DATETIME,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Comienzo del evento".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Comienzo del evento".'
          }
        }
      },
      endDateTime: {
        type: DataTypes.DATETIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Final del evento".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Final del evento".'
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('createdAt')
            ? this.getDataValue('createdAt').toISOString().split('T')[0]
            : null
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('updatedAt')
            ? this.getDataValue('updatedAt').toISOString().split('T')[0]
            : null
        }
      }
    }, {
      sequelize,
      tableName: 'CustomerCredentials',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    }
  )

  Model.associate = function (models) {

  }

  return Model
}
