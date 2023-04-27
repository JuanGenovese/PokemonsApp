import { NavLink} from "react-router-dom";
import style from "./NavBar.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";

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
            <NavLink to="/home" className={style.NavLink}> HOME </NavLink>
            <div>
                <input type="text" value={input} onChange={changeHandler}/>
                <button onClick={clickHandler}>BUSCAR</button>
            </div>
            <NavLink to="/create" className={style.NavLink}>New Pokemon +</NavLink>
        </div>
    )
}

export default NavBar;