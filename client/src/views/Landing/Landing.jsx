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
            <p className={style.parrafo}>Discover the fascinating world of Pokémon on PokemonsApp! Click below to start your adventure as a Pokémon Trainer. Catch, train, and create your own Pokémon. Explore now!</p>
            <NavLink to="/home">
                <button className={style.button}>Let's begin!</button>
            </NavLink>
        </div> 
    )
}

export default Landing;