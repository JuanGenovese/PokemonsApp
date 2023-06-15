import { NavLink} from "react-router-dom";
import style from "./NavBarDetail.module.css"

const NavBarDetail = () => {
    return(
        <div className={style.mainContainer}>
            <NavLink to="/home" className={style.NavLink}><i class="bi bi-arrow-left"> Go back </i></NavLink>
            <NavLink to="/create" className={style.NavLink}> New Pokemon +</NavLink>
        </div>
    )
}

export default NavBarDetail;