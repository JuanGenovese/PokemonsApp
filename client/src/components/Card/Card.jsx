import style from "./Card.module.css";

const Card = (props) => {
    return(
        <div className={style.card}>
            <img alt="imagen ilustrativa del pokemon" src={props.imagen}/>
            <h6>{props.name.toUpperCase()}</h6>
            <p>Tipo: {props.tipo}</p>
        </div>
    )
}

export default Card;