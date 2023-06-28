import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./Form.module.css";
import NavBarForm from "../../components/NavBarForm/NavBarForm";
import Fondo from "../Fondo.mp4";
import Ash from "./Ash.png"

const Form = () => {

    const tipos = useSelector(state => state.tipos); //array de {id: num, tipo: "tipo"}
    const pokemons = useSelector(state => state.pokemons); // array de 60 {pokemons}

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
    });

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        if(property === "nombre"){
            validateNombre({...form, [property]:value})
        } else if ( property === "imagen" ){
            validateImagen({...form, [property]:value})
        } else {
            validate(value, property)
        }

        setForm({...form, [property]:value})
    };

    const validateNombre = (form) => {
        if(/^[a-zA-Z]+$/.test(form.nombre)){
            setErrors({...errors, nombre:""})
        }else{
            setErrors({...errors, nombre:"!! - El nombre solo puede estar compuesto por letras"})
        }

        if(form.nombre==="") {
            setErrors({...errors, nombre: "Por favor ingrese un nombre"})
        }
    };

    const validateImagen = (form) => {
        const regexJPG = /(https?:\/\/.*\.jpg)/i;
        const regexPGN = /(https?:\/\/.*\.png)/i;
        if( regexJPG.test(form.imagen) || regexPGN.test(form.imagen) ) {
            setErrors({...errors, imagen: ""})
        } else {
            setErrors({...errors, imagen: "Debe ser una URL que termine en '.jpg' o '.png'"})
        }
    };

    const validate = (value, property) => {
        if(value <= 0){
            setErrors({...errors, [property]:"Debe ser mayor que 0"})
        }else{
            setErrors({...errors, [property]:""})
        }

    };

    const selectHandler = (event) => {
        const value = event.target.value; // id
        const seRepite = form.tipo.find(tipo => tipo === value);

        if(form.tipo.length < 2 && !seRepite ){
            setForm({...form, tipo:[...form.tipo, (value/1)]}) //
        }
    }


    const submitHandler = async (event) => {
        event.preventDefault()
        const yaExiste = pokemons.find(poke => poke.nombre.toLowerCase() === form.nombre.toLocaleLowerCase());
        if(yaExiste) {
            return alert("¡! : Éste Pokemon ya existe");

        } else {
            try {
                //https://pokemonsapp-production.up.railway.app
                //http://localhost:3001/
                await axios.post("https://pokemonsapp-production.up.railway.app/pokemons", form);
                alert("Pokemon creado correctamente");

            } catch (error) {

                alert("Hubo un problema al crear el Pokemon, consulte con el desarrollador")
            }
        } 
        

    }

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
          form.tipo.length === 2 &&
          errors.nombre === "" &&
          errors.vida === "" &&
          errors.ataque === "" &&
          errors.defensa === "" &&
          errors.velocidad === "" &&
          errors.altura === "" &&
          errors.peso === "" && 
          errors.imagen === "" 
        )
    }

    return(
        <div className={style.formContainer}>
            <NavBarForm/>
            <video className={style.Fondo} autoPlay loop muted>
                <source src={Fondo} type="video/mp4"></source>
            </video>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.titleForm}>
                    <h2>Add your new Pokémon!</h2>
                </div> 
                <div>
                    <input className={style.input} type="text" value={form.nombre} onChange={changeHandler} name="nombre" placeholder="Name"/>
                    {errors.nombre && <span className={style.span}>{errors.nombre}</span>}
                </div>

                <div>
                    <input className={style.input} type="number" value={form.vida} onChange={changeHandler} name="vida" placeholder="Health"/>
                    {errors.vida && <span className={style.span}>{errors.vida}</span>}
                </div>
    
                <div>
                    <input className={style.input} type="number" value={form.ataque} onChange={changeHandler} name="ataque" placeholder="Attack"/>
                    {errors.ataque && <span className={style.span}>{errors.ataque}</span>}
                </div>

                <div>
                    <input className={style.input} type="number" value={form.defensa} onChange={changeHandler} name="defensa" placeholder="Defense"/>
                    {errors.defensa && <span className={style.span}>{errors.defensa}</span>}
                </div>

                <div>
                    <input className={style.input} type="number" value={form.velocidad} onChange={changeHandler} name="velocidad" placeholder="Speed"/>
                    {errors.velocidad && <span className={style.span}>{errors.velocidad}</span>}
                </div>

                <div>
                    <input className={style.input} type="number"  value={form.altura} onChange={changeHandler} name="altura" placeholder="Height"/>
                    {errors.altura && <span className={style.span}>{errors.altura}</span>}
                </div>

                <div>
                    <input className={style.input} type="number"  value={form.peso} onChange={changeHandler} name="peso" placeholder="Weight"/>
                    {errors.peso && <span className={style.span}>{errors.peso}</span>}
                </div>

                <div>
                    <input className={style.input} type="text" value={form.imagen} onChange={changeHandler} name="imagen"placeholder="Image URL"/>
                    {errors.imagen && <span className={style.span}>{errors.imagen}</span>}
                </div>
                <div className={style.selectContainer}>
                    <select defaultValue="unknown" onChange={selectHandler} className={style.select}>
                        <option>Type</option>
                        {tipos.map(tipo => {
                        return(
                            <option value={tipo.id} name="tipo">{tipo.tipo}</option>
                        )
                        })}
                    </select>
                    <select defaultValue="unknown" onChange={selectHandler} className={style.select}>
                        <option value={19}>Type</option>
                        {tipos.map(tipo => {
                        return(
                            <option value={tipo.id} name="tipo">{tipo.tipo}</option>
                        )
                        })}
                    </select>
                </div>
                    
                {allFieldsValid() && (
                    <button className={style.submit} type="submit" onClick={submitHandler}>
                        SUBMIT
                    </button>)
                }
            </form>
            <img src={Ash} alt="Ash" className={style.img}/>
        </div>
    )
}
export default Form;