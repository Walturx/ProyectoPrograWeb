//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import informacion from "../data/informacion";
import TablaUsuarios from "../components/Usuarios_registrados";
import '../views/Dashboard.css'
import InfoUsuarios from "../components/Detalle_usuario"
import TablaOrdenes from "../components/TablaOrdenes";
import Nav from "../components/Barra_nav"
import ListaOrden from "../components/Listado_ordenes";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const iraProductos = () =>(
        navigate('/productos')
    )

    const[usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    return(
        <>
            <HeaderHome/>
            <NavBarHome/>
            <h1>Dashboard</h1>
            <div class ="informacion">
                <h2 class="Dash_cab">Órdenes  ----- {informacion.ordenes}</h2>
                <h2 class="Dash_cab">Usuarios nuevos ----- {informacion.usuarios}</h2>
                <h2 class="Dash_cab">Ingresos totales ----- S/{informacion.ingresos}</h2>
            </div>
            <div class ="tablas">
                <div class="tablas_dash">
                    <TablaUsuarios onUsuario={setUsuarioSeleccionado}/>
                    <Nav/>
                </div>
                <div class="tablas_dash">
                    <h3>Detalle Usuario</h3>
                    <br />
                    <div class="contenido-usuario">
                        {usuarioSeleccionado ? (
                            <InfoUsuarios id={usuarioSeleccionado}/>) : (<InfoUsuarios id={0}/>)}
                        <TablaOrdenes/>
                    </div>
                    <Nav/>
                </div>   
            </div>
            <div>
                <div className="Ordenes">
                    <h3>Listado de ordenes</h3>
                    <div className="botonOrden">
                    <button className="Desactivar" onClick={iraProductos}>Ver productos</button>
                    <button className="Desactivar">Ver todas las ordenes</button>
                    </div>
                </div>
            </div>
            
            <ListaOrden/>
            <Nav/>
        </>    
    )
}
export default Dashboard;