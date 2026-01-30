'use strict'

module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define(
    'email',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'emails',
      timestamps: true,
      paranoid: true
    }
  )

  return Email
}
