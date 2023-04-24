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


const createPokemon = async(nombre , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo ) => {
    const newPokemon = await Pokemon.create({nombre , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo});
    await newPokemon.addType(tipo);
    return newPokemon;


}

const getAllPokemons = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
    const api = response.data.results
    const pokemonsInfo = api.map( async (element) => {
        const response = await axios.get(element.url)
        const pokemon = response.data
        return{
            id:pokemon.id,
            nombre:pokemon.name,
            imagen:pokemon.sprites.other.home.front_default,
            vida:pokemon.stats[0].base_stat || "No disponible",
            ataque:pokemon.stats[1].base_stat || "No disponible",
            defensa:pokemon.stats[2].base_stat || "No disponible",
            velocidad:pokemon.stats[5].base_stat || "No disponible",
            altura:pokemon.height || null,
            peso:pokemon.weight || null,
            tipo:pokemon.types.map(type => type.type.name),
            create: false
        };
    });

    const pokemonsAPI = await Promise.all(pokemonsInfo);


    const pokemonDB = await Pokemon.findAll({ include: Type});
    return [...pokemonsAPI, ...pokemonDB]
};


const searchPokemonByName = async (nombre) => {
    const pokemonsDB = await Pokemon.findAll({
        where: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("nombre")),
            {[Op.like]: `%${nombre.toLowerCase}%`}
        ),
        include: Type
    });


    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
    const api = response.data.results;
    const pokemonsInfo = api.map( async (element) => {
        const response = await axios.get(element.url)
        const pokemon = response.data
        return{
            id:pokemon.id,
            nombre:pokemon.name,
            imagen:pokemon.sprites.other.home.front_default,
            vida:pokemon.stats[0].base_stat || "No disponible",
            ataque:pokemon.stats[1].base_stat || "No disponible",
            defensa:pokemon.stats[2].base_stat || "No disponible",
            velocidad:pokemon.stats[5].base_stat || "No disponible",
            altura:pokemon.height || null,
            peso:pokemon.weight || null,
            tipo:pokemon.types.map(type => type.type.name),
            create: false
        };
    });

    const pokemonsAPI = await Promise.all(pokemonsInfo)

    const pokemonsAPIFiltered = pokemonsAPI.filter(
        pokemon => {
            return pokemon.nombre.toLowerCase().includes(nombre.toLowerCase());
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