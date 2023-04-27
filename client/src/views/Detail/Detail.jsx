import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById, clearPokemon } from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = () => {
    const { id } =  useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonId)
    

    useEffect(() => {
        dispatch(getById(id))
        return () => dispatch(clearPokemon())
    },[dispatch, id])

    return(
        <div className={style.contenedor}>
            {
                (pokemon && pokemon.nombre) ?
                (<>
                    <Link to="/home">
                        <button className={style.detailBtn}>GO BACK!</button>
                    </Link>
                    <h1 className={style.detailTitle}> {pokemon.nombre.toUpperCase()}</h1>
                    <div className={style.detailContainer}>
                        <div className={style.detailImgContainer}>
                            <img src={pokemon.imagen} className={style.detailImg} alt="."/>
                        </div>
                        <div className={style.detailInfoContainer}>
                            <div className={style.detailInfo}>
                                <p className={style.detailInfoItem}>
                                    Vida:{pokemon.vida}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Ataque: {pokemon.ataque}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Defensa:{pokemon.defensa}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Velocidad:{pokemon.velocidad}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Altura:{pokemon.altura}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Peso:{pokemon.peso}
                                </p>
                                <p className={style.detailInfoItem}>
                                    Tipo:  {pokemon.tipo}
                                </p>
                            </div>
                        </div>
                    </div> 
                </>) 
                : (<h1 className={style.loading}>Loading...</h1>)
            } 
        </div>
    )    
}

export default Detail;