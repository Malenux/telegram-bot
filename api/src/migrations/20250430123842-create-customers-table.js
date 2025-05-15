'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // up es una función que se ejecuta cuando se aplica la migración, es decir, cuando se crea la tabla customers
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      telephone: {
        type: Sequelize.STRING(12),
        unique: true,
        allowNull: false
      },
      prefix: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  // down es una función que se ejecuta cuando se deshace la migración, es decir, cuando se elimina la tabla customers
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers')
  }
}
