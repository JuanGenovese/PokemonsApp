import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardsContainer = () => {
    const pokemons = useSelector(state => state.pokemonsApi);

    return(
        <div className={style.container}>
            {pokemons.map(pokemon => {
                return (
                <Link to="/detail">
                   <Card
                        imagen={pokemon.imagen}
                        nombre={pokemon.nombre}
                        tipo={pokemon.tipo}
                    />
                </Link>)
            })}
        </div>
    )
}

export default CardsContainer;