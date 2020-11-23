import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext

    //obtengo las tareas del proyecto
    const tareasContext = useContext(tareaContext)
    const { tareasProyecto } = tareasContext

    //Si no hay proyecto seleccionado
    if (!proyecto) return <h2>Slecciona un proyecto</h2>

    const [proyectoActual] = proyecto;

    const onCLickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }
    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.lenght === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    tareasProyecto.map(tarea => (


                        <Tarea
                            key={tarea._id}
                            tarea={tarea}
                        />

                    ))
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onCLickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default ListadoTareas;