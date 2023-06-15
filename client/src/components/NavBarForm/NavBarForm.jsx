import { NavLink} from "react-router-dom";
import style from "./NavBarForm.module.css"

const NavBarForm = () => {
    return(
        <div className={style.mainContainer}>
            <NavLink to="/home" className={style.NavLink}><i class="bi bi-arrow-left"> Go home </i></NavLink>
        </div>
    )
}

export default NavBarForm;