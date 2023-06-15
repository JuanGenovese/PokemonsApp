import style from "./Card.module.css";

const Card = (props) => {
    return(
        <div className={style.card}>
            <img className={style.imagen} alt="imagen ilustrativa del pokemon" src={props.imagen}/>
            <div className={style.dataContainer}>
                <h6 className={style.name}>{props.nombre.toUpperCase()}</h6>
                <p className={style.tipo}>Type: {props.tipo} </p> 
            </div>
        </div>
    )
}

export default Card;