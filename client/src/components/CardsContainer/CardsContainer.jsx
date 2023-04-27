import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import Paginado from "../Paginado/Paginado";
import { getById } from "../../redux/actions";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const CardsContainer = () => {
    const allPokemons = useSelector(state => state.pokemons);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPorPagina, setPokemonsPorPagina ] = useState(12);

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

    console.log(OrdenarPor);
    


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

    console.log(porTipoyOrigen)


    const pokemonesOrdenados = porTipoyOrigen.sort(( a ,b ) => {
        if (OrdenarPor === "name") {
            if(orden === "asc"){
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
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
                   
                </NavLink>)
                })}
            </div>
            
        </div>
    )
}

export default CardsContainer;