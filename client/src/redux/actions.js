import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";

export const getPokemons = () => {
    return async function(dispatch){
        const serverData = await axios.get(
            "http://localhost:3001/pokemons"
        );
        const pokemons = serverData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemons})
    };
};



export const getPokemonByName = (name) => {
    return async function(dispatch){
        const serverData = await axios.get(
            `http://localhost:3001/pokemons?name=${name}`
        );
        const pokemonName = serverData.data;
        dispatch({type: GET_POKEMON_BY_NAME, payload: pokemonName})
    };
};  



export const getTypes = () => {
    return async function(dispatch){
        const serverData = await axios.get(
            "http://localhost:3001/types"
        );
        const tipos = serverData.data;
        dispatch({type: GET_TYPES, payload: tipos})
    };
};



