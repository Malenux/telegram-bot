module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { // validate es una propiedad de Sequelize que permite definir reglas de validación para los atributos del modelo. Estas reglas se aplican al momento de crear o actualizar registros en la base de datos.
          notNull: { // Validación para asegurarse de que el campo no sea nulo
            msg: 'Por favor, rellena el campo "Nombre".'
          },
          notEmpty: { // Validación para asegurarse de que el campo no esté vacío
            msg: 'Por favor, rellena el campo "Nombre".'
          }
          // la diferencia entre notNull y notEmpty es que notNull se aplica a los valores nulos, mientras que notEmpty se aplica a cadenas vacías.
          // En este caso, ambos son necesarios para asegurarse de que el campo no esté vacío o nulo.
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Debe ser um e-mail válido'
          },
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email".'
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
      tableName: 'users',
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
