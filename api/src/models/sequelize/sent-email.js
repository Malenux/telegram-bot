'use strict'

module.exports = (sequelize, DataTypes) => {
  const SentEmail = sequelize.define(
    'SentEmail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      emailTemplate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sentAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      readedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'sent_emails',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ['uuid']
        },
        {
          fields: ['userType', 'userId']
        }
      ]
    }
  )

  return SentEmail
}
