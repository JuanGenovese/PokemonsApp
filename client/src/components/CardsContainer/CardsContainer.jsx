import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import Paginado from "../Paginado/Paginado";
import { getById } from "../../redux/actions";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const CardsContainer = () => {
    const allPokemons = useSelector(state => state.pokemons);// id, nombre, vida, atque

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPorPagina ] = useState(12);

    const IndexOfLastPokemon = currentPage * pokemonsPorPagina;
    const IndexOfFirstPokemon = IndexOfLastPokemon - pokemonsPorPagina
    const currentPokemons = allPokemons.slice(IndexOfFirstPokemon, IndexOfLastPokemon)// estos son los pokemones que se muestran por pagina

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const filtroPorTipo = useSelector(state => state.filtroPorTipo);
    const filtroPorOrigen = useSelector(state => state.filtroPorOrigen);
    const OrdenarPor = useSelector(state => state.ordenarPor);
    const orden = useSelector(state => state.orden);
    


    const porTipo = filtroPorTipo === "all" 
        ? currentPokemons 
        : currentPokemons.filter(pokemon => pokemon.tipo?.includes(filtroPorTipo));

    const porTipoyOrigen = filtroPorOrigen === "all" 
        ? porTipo 
        : porTipo.filter(pokemon => {
            if (filtroPorOrigen === "database") {
                return isNaN(pokemon.id);
                
            } else if(filtroPorOrigen === "api") {
                return pokemon.id <= 100;
            
            } else {
                return true;
            }
        }
    );


    const pokemonesOrdenados = porTipoyOrigen.sort(( a , b ) => {
        if (OrdenarPor === "nombre") {
            if(orden === "Az"){
                console.log(a.nombre.localeCompare(b.nombre))
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        } else if(OrdenarPor === "ataque") {
            if(orden === "asc"){
                return a.ataque - b.ataque;
            } else {
                return b.ataque - a.ataque;
            }
        } else {
            return 0;
        }
    });



    return(
        <div className={style.contenedor}>
            <div className={style.paginadoContainer}>
                <Paginado
                    pokemonsPorPagina={pokemonsPorPagina}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
            </div>
            <div className={style.container}>
                {pokemonesOrdenados.map(pokemon => {
                    return (
                        <NavLink to={`/home/${pokemon.id}`} className={style.navLink}>
                            <div onClick={getById(pokemon.id)}>
                                <Card
                                imagen={pokemon.imagen}
                                nombre={pokemon.nombre}
                                tipo={pokemon.tipo}
                                id={pokemon.id}
                                />
                            </div>
                        </NavLink>
                    )
                })}
            </div>  
        </div>
    )
}

export default CardsContainer;