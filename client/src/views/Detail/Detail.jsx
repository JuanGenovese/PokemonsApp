import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, clearPokemon } from "../../redux/actions";
import style from "./Detail.module.css";
import NavBarDetail from "../../components/NavBarDetail/NavBarDetail";
import Fondo from "../Fondo.mp4";

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
            <NavBarDetail/>
            <video className={style.Fondo} autoPlay loop muted>
                    <source src={Fondo} type="video/mp4"></source>
            </video>
            {
                (pokemon && pokemon.nombre) ?
                (<>
                    
                    <h1 className={style.detailTitle}> {pokemon.nombre.toUpperCase()}</h1>
                    <div className={style.detailContainer}>
                        <img src={pokemon.imagen} className={style.detailImg} alt="."/>
                        <div className={style.detailInfo}>
                            <p className={style.detailInfoItem}>
                                Health: {pokemon.vida}
                            </p>
                            <p className={style.detailInfoItem}>
                                Attack: {pokemon.ataque}
                            </p>
                            <p className={style.detailInfoItem}>
                                Defense: {pokemon.defensa}
                            </p> 
                            <p className={style.detailInfoItem}>
                                Speed: {pokemon.velocidad}
                            </p>
                            <p className={style.detailInfoItem}>
                                Height: {pokemon.altura}
                            </p>
                            <p className={style.detailInfoItem}>
                                Weight: {pokemon.peso}
                            </p>
                            <p className={style.detailInfoItem}>
                                Type: {pokemon.tipo}
                            </p>
                        </div>
                    </div> 
                </>) 
                : (<h1 className={style.loading}>Loading...</h1>)
            } 
        </div>
    )    
}

export default Detail;