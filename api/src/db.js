require('dotenv').config();
const { Sequelize } = require('sequelize');
const pokemonModel = require("./models/Pokemon");
const typeModel = require("./models/Type");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;


const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {logging: false}
);


pokemonModel(sequelize);
typeModel(sequelize);


const { Pokemon, Type} = sequelize.models;


Pokemon.belongsToMany(Type,{through: "pokemonType"});
Type.belongsToMany(Pokemon, {through: "pokemonType"});

module.exports = {
   ...sequelize.models,
   sequelize,
};
