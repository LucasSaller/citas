import React, { Fragment , useState} from 'react'
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types'

function Form({crearCita}) {
    // Crear State de Citas... 

    const [cita,setCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
    });
    

    const [error,setError] = useState(false);
    
    const handleChange = event => {
        setCita({
            ...cita,
            [event.target.name] : event.target.value
        })
    }
    // Extraer los valores

    const { mascota, propietario, fecha, hora , sintomas } = cita;

    // Cuando agrega una cita

    const submitCita = event => {
        event.preventDefault();

        // Validar
        if(mascota.trim()==='' || propietario.trim()===''|| 
        fecha.trim()===''|| hora.trim()===''
        || sintomas.trim()==='')
        {
            setError(true);
            return;
        }
        // Eliminar el mensaje de error
        setError(false);

        // Asignar id para cada Cita

        cita.id= uuid();
        console.log(cita)

        // Crear cita

        crearCita(cita);

        // Reiniciar Form
        setCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
        })
        

    }
    
    return (
        <Fragment>
            
            <h2>Crear Cita</h2>
            { error ? <p className=" alerta-error">Todos los campos son obligatorios</p> : null }
            <form onSubmit={submitCita}>
                <label> Nombre Mascota</label>
                <input type="text"
                       name="mascota"
                       className="u-full-width"
                       placeholder="Nombre Mascota"
                       onChange={handleChange}
                       value={mascota}

                />  
                <label> Nombre Duenio</label>
                <input type="text"
                       name="propietario"
                       className="u-full-width"
                       placeholder="Nombre duenio de la mascota"
                       onChange={handleChange}
                       value={propietario}
                />  
                <label> Fecha</label>
                <input type="date"
                       name="fecha"
                       className="u-full-width"
                       onChange={handleChange}
                       value={fecha}
                />
                 <label> Hora</label>
                <input type="time"
                       name="hora"
                       className="u-full-width"
                       onChange={handleChange}
                       value={hora}
                />
                <label> Sintomas</label>
                <textarea className="u-full-width"
                          name="sintomas"
                          onChange={handleChange}
                          value={sintomas}
                ></textarea> 
                <button type="submit"
                        className="u-full-width button-primary"
                        onChange={handleChange}
                > Agregar Cita</button>  
                 
            </form>
        </Fragment>
    )
}
Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Form
