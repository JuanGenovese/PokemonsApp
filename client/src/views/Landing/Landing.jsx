import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";
import Pokemon from "./Pokemon.png";
import Fondo from "../Fondo.mp4";

const Landing = () => {
    return(
        <div className={style.container}>
            <video className={style.Fondo} autoPlay loop muted>
                <source src={Fondo} type="video/mp4"></source>
            </video>
            <img src={Pokemon} alt="Title" className={style.Pokemon}/>
            <p className={style.parrafo}>¡Descubre el fascinante mundo de Pokémon en PokemonsApp! Haz clic abajo para comenzar tu aventura como Entrenador Pokémon. ¡Atrapa, entrena y crea tus propios Pokémon ¡Explora ahora!</p>
            <NavLink to="/home">
                <button className={style.button}> ¡Comencemos! </button>
            </NavLink>
        </div> 
    )
}

export default Landing;