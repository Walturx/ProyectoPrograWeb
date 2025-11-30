//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import informacion from "../data/informacion";
import TablaUsuarios from "../components/Usuarios_registrados";
import '../views/Dashboard.css'
import InfoUsuarios from "../components/Detalle_usuario"
import TablaOrdenes from "../components/TablaOrdenes";
import ListaOrden from "../components/Listado_ordenes";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();


    const irATodos_Ordenes = () => {
        navigate("/admin/ordenes");
    };
    const iraProductos = () => (
        navigate('/admin/productos')
    )

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    return (
        <>
            <HeaderHome />
            <NavBarHome />
            <h1>Dashboard</h1>
            <div className="informacion">
                <div className="Dash_cab">
                    <span>Órdenes</span>
                    <span>{informacion.ordenes}</span>
                </div>
                <div className="Dash_cab">
                    <span>Usuarios nuevos</span>
                    <span>{informacion.usuarios}</span>
                </div>
                <div className="Dash_cab">
                    <span>Ingresos totales</span>
                    <span>S/{informacion.ingresos}</span>
                </div>
            </div>
            <div className="tablas">
                <div className="tablas_dash">
                    <TablaUsuarios onUsuario={setUsuarioSeleccionado} />
                </div>
                <div className="tablas_dash">
                    <h3>Detalle Usuario</h3>
                    <br />
                    <div className="contenido-usuario">
                        {usuarioSeleccionado ? (
                            <InfoUsuarios id={usuarioSeleccionado} />) : (<InfoUsuarios id={0} />)}
                        <TablaOrdenes />
                    </div>
                </div>
            </div>
            <div>
                <div className="Ordenes">
                    <div className="Ordenes-header">
                        <h3>Listado de ordenes</h3>
                        <div className="botonOrden">
                            <button className="btn-solid" onClick={iraProductos}>Ver productos</button>
                            <button className="btn-solid" onClick={irATodos_Ordenes}>Ver todas las ordenes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ListaOrden />
        </>
    )
}
export default Dashboard;