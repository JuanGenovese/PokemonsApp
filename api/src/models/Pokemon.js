const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {


  sequelize.define('Pokemon', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.BLOB,
      allowNull: false
    },
    vida:{
      type: DataTypes.DECIMAL,
      allowNull: false

    },
    ataque:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    defensa:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    velocidad:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    altura:{
      type: DataTypes.STRING,
      allowNull: false
    },
    peso:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });

};
