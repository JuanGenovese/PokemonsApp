import { Link} from "react-router-dom";
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
            <Link to="/home"> HOME </Link>
            <div>
                <input type="text" value={input} onChange={changeHandler}/>
                <button onClick={clickHandler}>BUSCAR</button>
            </div>
            <Link to="/create">New Pokemon +</Link>
        </div>
    )
}

export default NavBar;