import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filtros from "../../components/Filtros/Filtros";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes} from "../../redux/actions";
import style from "./Home.module.css";



const Home = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])


    return(
        <div className={style.NavBar}>
            <div >
                <NavBar/>
            </div>
            <Filtros/>
            <CardsContainer/>
        </div>
    )
}

export default Home;