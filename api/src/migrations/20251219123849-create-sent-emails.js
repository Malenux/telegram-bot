'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sent_emails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      emailTemplate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      readedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      uuid: {
        type: Sequelize.STRING,
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
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sent_emails')
  }
}
