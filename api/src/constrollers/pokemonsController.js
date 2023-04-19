const { Pokemon, Type} = require("../db");
const axios = require("axios");


const createPokemon = async(conditions) => Pokemon.create(conditions);
const findAllPokemons = async (conditions) => await Pokemon.findAll(conditions);
const findPokemonsByPK = async (conditions) => await Pokemon.findByPk(conditions);
const getPokemonsApi = async () => await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
const getPokemonsApiById = async () => await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);


module.exports = {
    findAllPokemons,
    getPokemonsApi,
    findPokemonsByPK,
    getPokemonsApiById,
    createPokemon
}