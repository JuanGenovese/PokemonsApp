import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByType, filterByOrigin, setOrder, getPokemons } from "../../redux/actions";
import "./Filtros.module.css";


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
        console.log(origin)
    };

    const handleOrder = (event) => {
        const value = event.target.value;
        const orderValue = event.target.value.split('-');

        if (value === 'all') {
            dispatch(setOrder({ ordenarPor: null, orden: null }));
            dispatch(getPokemons());
            console.log(value)

        } else if (value === "nombre-Az" || value === "nombre-Za"){
            dispatch(setOrder({ ordenarPor: "nombre", orden: orderValue[1]}));

        } else {
            dispatch(setOrder({ordenarPor: "ataque", orden: orderValue[1]}));
        }
    };


    return (
        <div>
            <form>
                <select defaultValue='all' onChange={handleOrder}>
                    <option value="all"> ORDENAR </option>
                    <option value="nombre-Az">A -z</option>
                    <option value="nombre-Za">Z - a</option>
                    <option value="ataque-asc">Ataque ▲</option>
                    <option value="ataque-desc">Ataque ▼</option>
                </select>
                <select defaultValue={origen} onChange={handleOrigin}>
                    <option value="all"> ORIGEN </option>
                    <option value="database"> MIS POKEMONES </option>
                    <option value="api"> API </option>
                </select>
                <select defaultValue={filtro} onChange={handleChange}>
                    <option value="all"> todos </option>
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