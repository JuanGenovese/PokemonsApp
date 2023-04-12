const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const { Pokemon, Type } = require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});






server.get("/pokemons", async ( req , res ) => {
  try {


    const allPokemons =  await Pokemon.findAll()
    res.status(200).send( allPokemons);


  } catch (error) {


    res.status(400).send( error.message )


  }
});




server.get("/pokemons/:idPokemon", async ( req , res ) => {
  try {



    const { idPokemon } = req.params;
    const Pokemon = await Pokemon.findByPk( idPokemon, {
      include: Type,
    });

    if(!Pokemon) {
      return res.status(404).send("El pokemon que desea no existe en nuestra base de datos");
    }

    res.status(200).send( Pokemon );



  } catch (error) {
    
    res.status(400).send( error.message );

  }
});




server.get("/pokemons", async ( req , res) => {
  try {

    const { name } = req.query;
    const Pokemon = await findAll({where:{ 
      name:{name}
    }});

  } catch (error) {

    res.status(400).send( error.message );

  }
});




server.post("/pokemons", ( req , res ) => {
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




server.get("/types", ( req , res ) => {
  try {
    
  } catch (error) {

    res.send(400).send( error.message );

  }
});




module.exports = server;
