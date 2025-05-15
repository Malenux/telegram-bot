module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Bot',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Plataforma".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Plataforma".'
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre".'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Descripción".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Descripción".'
          }
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Token".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Token".'
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
      tableName: 'Bots',
      timestamps: true,
      paranoid: true, // Esto significa que los registros eliminados no se borran físicamente, sino que se marcan como eliminados (deletedAt se establece con la fecha y hora de eliminación).
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
// Este modelo representa la tabla de usuarios en la base de datos y define sus atributos y validaciones. También establece las asociaciones con otros modelos, si es necesario.
