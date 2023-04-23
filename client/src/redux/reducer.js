import { GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES} from "./actions";

const initialState = {
    pokemonsApi: [],
    pokemonsDB: [],
    tipos:[],

};


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemonsApi:action.payload}
        case GET_POKEMON_BY_NAME:
            return {...state, pokemonsApi:action.payload}
        case GET_TYPES: 
            return {...state, tipos:action.payload}
        default: 
            return { ...state };
    }
};

export default rootReducer;