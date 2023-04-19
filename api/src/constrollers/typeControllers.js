const { Type } = require("../db");
const axios = require("axios");

const findAllTypes = async () => await Type.findAll();
const typeCreate = async (objeto) => await Type.create(objeto);
const getTypesAPI = async () => await axios.get("https://pokeapi.co/api/v2/type");


module.exports = {
    findAllTypes,
    typeCreate,
    getTypesAPI
}