const { Pokemon, Type} = require("../db");
const { Sequelize, Op } = require('sequelize');
const axios = require("axios");


// molde para crear un pokemon
//{
//    "name":"Juan", 
//    "imagen":"imagen", 
//    "vida":5000,
//    "ataque":1000,
//    "defensa":1000, 
//    "velocidad":35,
//    "altura":180,
//    "peso":75,
//    "tipo":"fuego"
//}


const createPokemon = async(name , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo ) => {
    const newPokemon = await Pokemon.create({name , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo});

    console.log(newPokemon)
    await newPokemon.addType(tipo);
    return newPokemon;


}

const getAllPokemons = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
    const pokemonsAPI = response.data.results
    const pokemonDB = await Pokemon.findAll({ include: Type});
    return [...pokemonsAPI, ...pokemonDB]
};


const searchPokemonByName = async (name) => {
    const pokemonsDB = await Pokemon.findAll({
        where: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("name")),
            {[Op.like]: `%${name.toLowerCase}%`}
        ),
        include: Type
    });
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
    const pokemonsAPI = response.data.results;
    const pokemonsAPIFiltered = pokemonsAPI.filter(
        pokemon => {
            return pokemon.name.toLowerCase().includes(name.toLowerCase());
        }
    );
    return [...pokemonsAPIFiltered, ...pokemonsDB];
}


const getPokemonById = async (idPokemon, source) => {
    const pokemon = 
        source === "api" 
        ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data
        : await Pokemon.findByPk( idPokemon, {
            include: Type,
        });
    return pokemon;
}


module.exports = {
    createPokemon,
    getAllPokemons,
    searchPokemonByName,
    getPokemonById
}