import { NavLink} from "react-router-dom";
import style from "./NavBar.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import Pokemon from "../../views/Landing/Pokemon.png";

const NavBar = () => {
    const dispatch = useDispatch();


    const [input, setInput] = useState("");


    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const clickHandler = () => {
        dispatch(getPokemonByName(input))
    }

    return(
        <div className={style.mainContainer}>
            <NavLink to="#" className={style.NavLink}>
                <img className={style.Pokemon} src={Pokemon} alt="Pokemon" />
            </NavLink>
            <form className={style.formBusqueda}>
                <input 
                  type="text" 
                  placeholder="Buscar pokemon..."
                  value={input} 
                  onChange={changeHandler}
                />
                <button type="button" onClick={clickHandler}>BUSCAR</button>
            </form>
            <NavLink to="/create" className={style.NavLink}> New Pokemon +</NavLink>
        </div>
    )
}

export default NavBar;