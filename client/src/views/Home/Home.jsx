import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filtros from "../../components/Filtros/Filtros";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes} from "../../redux/actions";
import style from "./Home.module.css";
import Fondo from "../Fondo.mp4";



const Home = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])


    return(
        <div className={style.NavBar}>
            <video className={style.Fondo} autoPlay loop muted>
                <source src={Fondo} type="video/mp4"></source>
            </video>
            <div >
                <NavBar/>
            </div>
            <Filtros/>
            <CardsContainer/>
        </div>
    )
}

export default Home;