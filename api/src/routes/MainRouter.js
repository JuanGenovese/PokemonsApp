const { Router } = require('express');
const { Pokemon, Type } = require("../db");

const router = Router();



router.get("/pokemons", async ( req , res ) => {
    try {
  
  
      const allPokemons =  await Pokemon.findAll()
      res.status(200).json( allPokemons);
  
  
    } catch (error) {
  
  
      res.status(400).send( error.message )
  
  
    }
});
  
  
  
  
router.get("/pokemons/:idPokemon", async ( req , res ) => {
    try {
  
  
  
      const { idPokemon } = req.params;
      const Pokemon = await Pokemon.findByPk( idPokemon, {
        include: Type,
      });
  
      if(!Pokemon) {
        return res.status(404).send("El pokemon que desea no existe en nuestra base de datos");
      }
  
      res.status(200).json( Pokemon );
  
  
  
    } catch (error) {
      
      res.status(400).send( error.message );
  
    }
});
  
  
  
  
router.get("/pokemons", async ( req , res) => {
    try {
  
      const { name } = req.query;
      const Pokemon = await findAll({where:{ 
        name:{name}
      }});
  
    } catch (error) {
  
      res.status(400).send( error.message );
  
    }
});
  
  
  
  
router.post("/pokemons", ( req , res ) => {
    try {
  
      const {name , imagen , vida , ataque , defensa , velocidad , altura , peso, tipo } = req.body;
  
      Pokemon.create({name, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo})
      .then(pokemon => {
        res.status(200).send("Pokemón correctamente creado en la DB");
      })
  
  
    } catch (error) {
  
      res.status(400).send( error.message );
  
    }
});
  
  
  
  
router.get("/types", async ( req , res ) => {
    try {
      
      const allTypes = await Type.findAll();
  
      if(allTypes.length > 0){
  
        res.status(200).json(allTypes.map( type => type.tipo));
  
      } else {
  
        const apiData = await axios.get("https://pokeapi.co/api/v2/type");
        console.log(apiData)
      }
    } catch (error) {
  
      res.send(400).send( error.message );
  
    }
});


module.exports = router;
