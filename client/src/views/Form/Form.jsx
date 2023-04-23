import { Link } from "react-router-dom";
import { useState } from "react";

const Form = () => {
    const [ form, setForm ]= useState({
        nombre:"",
        numeros:"",
        imagen:""
    });

    const [errors, setErrors] = useState({
        nombre:"",
        numeros:"",
        imagen:""
    });

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        property === "nombre"
            ? validateNombre({...form, [property]:value}) 
            : validate({...form, [property]:value})

        setForm({...form, [property]:value})
    }

    const validateNombre = (form) => {
        if(/^[a-zA-Z]+$/.test(form.nombre)){
            setErrors({...errors, nombre:""})
        }else{
            setErrors({...errors, nombre:"El nombre solo puede estar compuesto por letras"})
        }

        if(form.nombre==="") {
            setErrors({...errors, nombre: "Porfavor, elija un nombre"})
        }
    };


    const validate = (form) => {
        if(form.vida < 1){
            setErrors({...errors, numeros:"Debe ser mayor que 0"})
        }else{
            setErrors({...errors, nombre:"El nombre solo puede estar compuesto por letras"})
        }
        if(form.nombre==="") setErrors({...errors, email: "Porfavor, elija un nombre"})

    };


    //const changeHandler = (event) => {
    //    const property = event.target.name
    //    const value = event.target.value
    //
    //    validate({...form, [property]:value})
    //
    //    setForm({...form, [property]:value})
    //};


   
    const submitHandler = (event) => {
        event.preventDefault()
    //  const response = axios.post("http://localhost:3001/pokemons", form)
    //  .then(res => alert(res))
    //  .catch(err => alert(err))
    }


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
                </div>
    
                <div>
                    <label>Ataque </label>
                    <input type="number" value={form.ataque} onChange={changeHandler} name="ataque"/>
                </div>
                <div>
                    <label>Defensa </label>
                    <input type="number" value={form.defensa} onChange={changeHandler} name="defensa"/>
                </div>
                <div>
                    <label>Velocidad </label>
                    <input type="number" value={form.velocidad} onChange={changeHandler} name="velocidad"/>
                </div>
                <div>
                    <label>Altura </label>
                    <input type="number"  value={form.altura} onChange={changeHandler} name="altura"/>
                </div>
                <div>
                    <label>Peso </label>
                    <input type="number"  value={form.peso} onChange={changeHandler} name="peso"/>
                </div>
                <div>
                    <label>Imagen </label>
                    <input type="text" value={form.imagen} onChange={changeHandler} name="imagen"/>
                </div>
                {errors.nombre==="" && errors.vida==="" && errors.ataque==="" && errors.defensa==="" &&errors.velocidad==="" && errors.altura==="" && errors.peso==="" && errors.imagen==="" ?
                (<button type="submit" onClick={submitHandler}>SUBMIT</button>) : null}
            </form>
        </div>
    )
}

export default Form;