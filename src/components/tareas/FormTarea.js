import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext
    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])
    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    if (!proyecto) return null;

    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        //si es edición o si es nueva tarea
        if (tareaSeleccionada === null) {
            //tarea nueva
            //agregar la nueva tarea del state de tareas
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        } else {
            //actualiza tarea
            actualizarTarea(tarea);
            //elimina tarea seleccionada
            limpiarTarea()
        }


        //Obtener y filtrar las tareas del proyecto actual
        console.log(proyectoActual.id)
        obtenerTareas(proyectoActual.id)

        //reiniciar el form 
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    ></input>
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    ></input>
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>

    );
}

export default FormTarea;