module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Spots',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      townId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "townId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "townId".'
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "dirección".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "dirección".'
          }
        }
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "latitud".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "latitud".'
          }
        }
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "longitud".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "longitud".'
          }
        }
      },
      environment: {
        type: DataTypes.ENUM('indoor', 'outdoor', 'mixed'),
        allowNull: false,
        validate: {
          notNull: { msg: 'Por favor, rellena el campo "Ambiente".' },
          isIn: {
            args: [['indoor', 'outdoor', 'mixed']],
            msg: 'El valor de "environment" debe ser indoor, outdoor o mixed.'
          }
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "activo".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "activo".'
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
      tableName: 'spots',
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
