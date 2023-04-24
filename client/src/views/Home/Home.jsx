import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes} from "../../redux/actions";
import style from "./Home.module.css";



const Home = () => {
    const dispatch = useDispatch();

    const tipos = useSelector(state => state.tipos)

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    return(
        <div>
            <NavBar/>
            <form>
                <select name="opciones">
                    <option value="opcion2">Todos</option>
                    <option value="opcion2">Creados</option>
                    <option value="opcion1">A - z</option>
                    <option value="opcion2">Z - a</option>
                  
                </select>
                <select>
                    {tipos.map(tipo => {
                        return(
                            <option>{tipo.tipo}</option>
                        )
                    })}
                </select>
                <select>
                    <option>Ataque más fuerte</option>
                    <option>Ataque más debil</option>
                </select>
                
            </form>
            <CardsContainer/>
        </div>
    )
}

export default Home;