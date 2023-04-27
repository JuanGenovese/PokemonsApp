import { NavLink } from "react-router-dom";
import "./Landing.module.css"

const Landing = () => {
    return(
        <div className="">
            <NavLink to="/home">
                <button> Comencemos... </button>
            </NavLink>
           
        </div>
    )
}

export default Landing;