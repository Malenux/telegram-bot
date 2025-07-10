module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('CustomerActivationToken',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "customerId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "customerId".'
          }
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Token".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Token".'
          },
          isEmail: {
            msg: 'Por favor, rellena el campo "Token".'
          }
        }
      },
      expirationDate: {
        type: DataTypes.DATETIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Fecha de expiración".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Fecha de expiración".'
          }
        }
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Usado".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Usado".'
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
      tableName: 'CustomerActivationTokens',
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
