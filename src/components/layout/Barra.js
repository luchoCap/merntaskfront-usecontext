import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {

    //Extraer la informacion de autenticacion
    const authToken = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authToken

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : null}


            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => { cerrarSesion() }}
                >Cerrar Sesion</button>
            </nav>
        </header>
    );
}

export default Barra;