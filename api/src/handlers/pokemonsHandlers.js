const { Sequelize, Op } = require('sequelize');
const { 
    findAllPokemons, 
    findPokemonsByPK,
    getPokemonsApi, 
    getPokemonsApiById, 
    createPokemon
} = require("../constrollers/pokemonsController");



const getPokemonsHandler = async ( req , res ) => { //funciona correctamente
    try {

        const { name } = req.query;
        let pokemons = [];
        

        if(name) {
  
            const pokemonsDB = await findAllPokemons({
                where:Sequelize.where(
                    Sequelize.fn("lower", Sequelize.col("name")),
                    {[Op.like]: `%${name.toLowerCase}%`}
                ),
                include: Type
            });
  
  
            const pokemonsAPI = await getPokemonsApi();
            const pokemonsAPIFiltered = pokemonsAPI.data.results.filter(pokemon => {
                return pokemon.name.toLowerCase().includes(name.toLowerCase());
            });
  
  
            pokemons = pokemonsAPIFiltered.concat(pokemonsDB);
  
        } else {
            const pokemonsAPI = await getPokemonsApi();
            const pokemonDB = await findAllPokemons({ include: Type});
            pokemons = pokemonsAPI.data.results.concat(pokemonDB);
  
        }

        if(pokemons.length === 0) {
            return res.status(404).send("No se encontraron pokemones con ese nombre");
        }

        res.status(200).json(pokemons);
  
    } catch (error) {
  
      res.status(400).send( error.message )
  
    };
};



const getPokemonsIdHandler = async ( req , res ) => { //funciona correctamente
    try {
  
      const { idPokemon } = req.params;
      let PokemonInd = await findPokemonsByPK( idPokemon, {
        include: Type,
      });

  
      if(!PokemonInd) {
        const response = await getPokemonsApiById()
        PokemonInd = {
            name: response.data.name,
            image: response.data.sprites.front_default,
            types: response.data.types.map(type => type.type.name)
        };
      } else {

        PokemonInd = {
            name: PokemonInd.name,
            image: PokemonInd.image,
            types: PokemonInd.tipo.map(type => type.name)

        };
      };
  
      res.status(200).json( PokemonInd );
  
    } catch (error) {
      
      res.status(400).send( error.message );

    };
};

const postPokemonsHandler = async ( req , res ) => { //funciona correctamente
    try {
  
        const {name , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo } = req.body;
  
        await createPokemon({name, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo})
        .then(pokemon => {
          res.status(200).send("Pokemón correctamente creado en la DB");
        })
  
  
    } catch (error) {
  
        res.status(400).send( error.message );
  
    }
};


module.exports = {
    getPokemonsHandler,
    getPokemonsIdHandler,
    postPokemonsHandler
}
