import { 
    GET_POKEMONS, 
    GET_POKEMON_BY_NAME, 
    GET_TYPES, 
    GET_BY_ID,
    FILTER_BY_TYPE,
    FILTER_BY_ORIGIN,
    SET_ORDER,
    CLEAR_POKEMON
} from "./actions";

const initialState = {
    pokemons: [],
    pokemonId:[],
    tipos:[], 
    filtroPorTipo: "all", 
    filtroPorOrigen: "all",
    ordenarPor: "all",
    orden: "all"
};


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemons:action.payload}

        case GET_POKEMON_BY_NAME:
            return {...state, pokemons:action.payload}

        case GET_TYPES: 
            return {...state, tipos:action.payload}

        case GET_BY_ID:
            return {...state, pokemonId:action.payload}

        case CLEAR_POKEMON:    
            return {...state, pokemonId:action.payload}
        case FILTER_BY_TYPE: 
                return {...state, filtroPorTipo: action.payload}

        case SET_ORDER:
            return {...state, 
                ordenarPor: action.payload.ordenarPor,
                orden: action.payload.orden,
            };

        case FILTER_BY_ORIGIN: 
            if (action.payload !== "all" && action.payload === "database") {
                return {...state, filtroPorOrigen: action.payload};

            } else if(action.payload !== "all" && action.payload === "api") {
                return {...state, filtroPorOrigen: action.payload}
            } else { 
                return {...state, filtroPorOrigen: null}
            }

        default: 
            return { ...state };
    }
};

export default rootReducer;

