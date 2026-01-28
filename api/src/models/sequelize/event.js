module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Event',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      promotorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, selecciona un "Promotor".'
          },
          notEmpty: {
            msg: 'Por favor, selecciona un "Promotor".'
          }
        },
      },
      townId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, selecciona una "Ciudad".'
          },
          notEmpty: {
            msg: 'Por favor, selecciona una "Ciudad".'
          }
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, selecciona un "Lugar".'
          },
          notEmpty: {
            msg: 'Por favor, selecciona un "Lugar".'
          }
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, selecciona una "Categoría".'
          },
          notEmpty: {
            msg: 'Por favor, selecciona una "Categoría".'
          }
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Título".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Título".'
          }
        },
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
        },
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
      tableName: 'events',
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
