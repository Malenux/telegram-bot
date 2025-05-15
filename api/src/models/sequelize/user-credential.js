module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserCredentials',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "userId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "userId".'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          isEmail: {
            msg: 'Por favor, rellena el campo "Email".'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          }
        }
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
        allowNull: false
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
      tableName: 'UserCredentialss',
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
