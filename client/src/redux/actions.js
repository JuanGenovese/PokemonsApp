import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const GET_BY_ID = "GET_BY_ID";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SET_ORDER = "SET_ORDER";



export const getPokemons = () => {
    return async function(dispatch){
        const serverData = await axios.get(
            "http://localhost:3001/pokemons"
        );
        const pokemons = serverData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemons})
    };
};



export const getPokemonByName = (input) => {
    return async function(dispatch){
        const serverData = await axios.get(
            `http://localhost:3001/pokemons?name=${input}`
        );
        const pokemonName = serverData.data;
        dispatch({type: GET_POKEMON_BY_NAME, payload: pokemonName})
    };
};  



export const getById = (id) => {
    return async function(dispatch){
        const serverData = await axios.get(
            `http://localhost:3001/pokemons/${id}`
        );
        const pokemonId = serverData.data;
        dispatch({type: GET_BY_ID, payload:pokemonId})
    }
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



export const filterByType = (tipo) => {
    return function (dispatch){
        dispatch({type: FILTER_BY_TYPE, payload: tipo})
        console.log(tipo);
    }
};



export const filterByOrigin = (origin) => {
    return function (dispatch){
       dispatch({type: FILTER_BY_ORIGIN, payload: origin}) // value: "api" || "database" || "all"
       console.log(origin)
    }
};



export const setOrder = (setOrder) => {
    return function (dispatch) {
        dispatch({type: SET_ORDER, payload: setOrder})
        console.log(setOrder)
    }   
};

