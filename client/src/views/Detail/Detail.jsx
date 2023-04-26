import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = () => {
    const { id } =  useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonId)
    

    useEffect(() => {
        dispatch(getById(id))
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
                                    <span>Vida:</span>{pokemon.vida}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Ataque:</span>{pokemon.ataque}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Defensa:</span>{pokemon.defensa}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Velocidad:</span>{pokemon.velocidad}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Altura:</span>{pokemon.altura}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Peso:</span>{pokemon.peso}
                                </p>
                                <p className={style.detailInfoItem}>
                                    <span>Tipo:</span>  {pokemon.tipo}
                                </p>
                            </div>
                        </div>
                    </div> 
                </>) 
                : (<h3>Loading</h3>)
            } 
        </div>
    )    
}

export default Detail;