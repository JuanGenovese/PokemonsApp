import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./Form.module.css";

const Form = () => {

    const tipos = useSelector(state => state.tipos);

    const [ form, setForm ]= useState({
        nombre: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        imagen: "",
        tipo:[]
    });

    const [errors, setErrors] = useState({
        nombre: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        imagen: "",
        tipo:[]
    });

    const [checkbox, setCheckbox] = useState(false);


    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        if(property === "nombre"){
            validateNombre({...form, [property]:value})
        } else if ( property === "imagen" ){
            validateImagen({...form, [property]:value})
        } else  {
            validate(value, property)
        }

        setForm({...form, [property]:value})
    };



    const validateNombre = (form) => {
        if(/^[a-zA-Z]+$/.test(form.nombre)){
            setErrors({...errors, nombre:""})
        }else{
            setErrors({...errors, nombre:"El nombre solo puede estar compuesto por letras"})
        }

        if(form.nombre==="") {
            setErrors({...errors, nombre: "Por favor ingrese un nombre"})
        }
    };



    const validate = (value, name) => {
        if(value <= 0){
            setErrors({...errors, [name]:"Debe ser mayor que 0"})
        }else{
            setErrors({...errors, [name]:""})
        }

    };



    const validateImagen = (form) => {
        const regex = /(https?:\/\/.*\.jpg)/i;
        if(regex.test(form.imagen)) {
            setErrors({...errors, imagen: ""})
        } else {
            setErrors({...errors, imagen: "Debe ser una URL que termine en '.jpg'"})
        }
    };


    const checkboxHandler = (event) => {
        setCheckbox(event.target.checked);
    }


    const submitHandler = (event) => {
        event.preventDefault()
        if(checkbox) {
            const response = axios.post("http://localhost:3001/pokemons", form)
            .then(alert("Pokemon creado correctamente"))
            .catch(err => alert(err))
        } else {
            alert("Seleccione al menos un tipo de pokemon antes de continuar")
        }
        
    };

    const allFieldsValid = () => {
        return (
          form.nombre !== "" &&
          form.vida !== "" &&
          form.ataque !== "" &&
          form.defensa !== "" &&
          form.velocidad !== "" &&
          form.altura !== "" &&
          form.peso !== "" &&
          form.imagen !== "" &&
          errors.nombre === "" &&
          errors.vida === "" &&
          errors.ataque === "" &&
          errors.defensa === "" &&
          errors.velocidad === "" &&
          errors.altura === "" &&
          errors.peso === "" && 
          errors.imagen === ""
        )
    };

    return(
        <div>
            <Link to="/home">
                <button>GO HOME!</button>
            </Link>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Nombre </label>
                    <input type="text" value={form.nombre} onChange={changeHandler} name="nombre"/>
                    {errors.nombre && <span>{errors.nombre}</span>}
                </div>
    
                <div>
                    <label>Vida </label>
                    <input type="number" value={form.vida} onChange={changeHandler} name="vida"/>
                    {errors.vida && <span>{errors.vida}</span>}
                </div>
    
                <div>
                    <label>Ataque </label>
                    <input type="number" value={form.ataque} onChange={changeHandler} name="ataque"/>
                    {errors.ataque && <span>{errors.ataque}</span>}
                </div>
                <div>
                    <label>Defensa </label>
                    <input type="number" value={form.defensa} onChange={changeHandler} name="defensa"/>
                    {errors.defensa && <span>{errors.defensa}</span>}
                </div>
                <div>
                    <label>Velocidad </label>
                    <input type="number" value={form.velocidad} onChange={changeHandler} name="velocidad"/>
                    {errors.velocidad && <span>{errors.velocidad}</span>}
                </div>
                <div>
                    <label>Altura </label>
                    <input type="number"  value={form.altura} onChange={changeHandler} name="altura"/>
                    {errors.altura && <span>{errors.altura}</span>}
                </div>
                <div>
                    <label>Peso </label>
                    <input type="number"  value={form.peso} onChange={changeHandler} name="peso"/>
                    {errors.peso && <span>{errors.peso}</span>}
                </div>
                <div>
                    <label>Imagen </label>
                    <input type="text" value={form.imagen} onChange={changeHandler} name="imagen"/>
                    {errors.imagen && <span>{errors.imagen}</span>}
                </div>
                <div className={style.checkboxContainer}>
                    {tipos.map(tipo => {
                        return(
                            <div>
                                <label>{tipo.tipo}</label>
                                <input type="checkbox" value={tipo.tipo} onChange={checkboxHandler}/>
                            </div>
                        )
                    })}
                </div>
                {allFieldsValid() && (
                    <button type="submit" onClick={submitHandler}>
                        SUBMIT
                    </button>)
                }
            </form>
        </div>
    )
}

export default Form;