import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByType, filterByOrigin, setOrder, getPokemons } from "../../redux/actions";
import style from "./Filtros.module.css";


const Filtros = () => {
    const tipos = useSelector((state) => state.tipos);
    const filtro = useSelector((state) => state.filtroPorTipo);
    const origen = useSelector((state) => state.filtroPorOrigin);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);


    const handleChange = (event) => { //funciona correctamente
        const tipo = event.target.value;
        dispatch(filterByType(tipo));

    };
 
    const handleOrigin = (event) => {
        const origin = event.target.value;
        dispatch(filterByOrigin(origin));
    };

    const handleOrder = (event) => {
        const value = event.target.value;
        const orderValue = event.target.value.split('-');

        if (value === 'all') {
            dispatch(setOrder({ ordenarPor: null, orden: null }));
            dispatch(getPokemons());

        } else if (value === "nombre-Az" || value === "nombre-Za"){
            dispatch(setOrder({ ordenarPor: "nombre", orden: orderValue[1]}));

        } else {
            dispatch(setOrder({ordenarPor: "ataque", orden: orderValue[1]}));
        }
    };


    return (
        <div className={style.filtrosContainer}>
            <form className={style.formFiltros}>
                <select className={style.select} defaultValue='all' onChange={handleOrder}>
                    <option value="all"> ORDER </option>
                    <option value="nombre-Az">A -z</option>
                    <option value="nombre-Za">Z - a</option>
                    <option value="ataque-asc">Attack ▲</option>
                    <option value="ataque-desc">Attack ▼</option>
                </select>
                <select className={style.select} defaultValue={origen} onChange={handleOrigin}>
                    <option value="all"> ORIGIN </option>
                    <option value="database"> MY POKEMONS </option>
                    <option value="api"> API POKEMONS</option>
                </select>
                <select className={style.select} defaultValue={filtro} onChange={handleChange}>
                    <option value="all">TYPE</option>
                    {tipos?.map(tipo => {
                        return( 
                        <option value={tipo.tipo}> {tipo.tipo} </option>
                        )
                    })}
                </select>
            </form>
        </div>


    )
};

        
export default Filtros;