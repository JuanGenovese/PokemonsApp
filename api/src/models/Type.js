const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
