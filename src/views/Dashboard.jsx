//HECHO POR ANDRES BEJAR 20230352

import React, { useState, useEffect } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import { getOrdenes } from '../components/services/api';
import TablaUsuarios from "../components/Usuarios_registrados";
import '../views/Dashboard.css'
import InfoUsuarios from "../components/Detalle_usuario"
import TablaOrdenes from "../components/TablaOrdenes";
import ListaOrden from "../components/Listado_ordenes";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [informacion, setInformacion] = useState({
        usuarios: 0,
        ordenes: 0,
        ingresos: 0
    });
    const [loading, setLoading] = useState(true);

    // Cargar datos del dashboard desde el backend
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Solo obtener órdenes (endpoint público)
                const ordenes = await getOrdenes();

                // Calcular ingresos totales sumando los totales de las órdenes
                const ingresosTotales = ordenes.reduce((sum, orden) => {
                    return sum + (parseFloat(orden.total) || 0);
                }, 0);

                // Extraer usuarios únicos de las órdenes
                const usuariosUnicos = new Set(ordenes.map(orden => orden.idusuario));

                setInformacion({
                    usuarios: usuariosUnicos.size || 0,
                    ordenes: ordenes.length || 0,
                    ingresos: ingresosTotales.toFixed(2)
                });

                setLoading(false);
            } catch (err) {
                console.error('Error al cargar datos del dashboard:', err);
                // Intentar cargar solo con datos por defecto
                setInformacion({
                    usuarios: 0,
                    ordenes: 0,
                    ingresos: '0.00'
                });
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const irATodos_Ordenes = () => {
        navigate("/admin/ordenes");
    };

    const iraProductos = () => {
        navigate('/admin/productos');
    };

    return (
        <>
            <HeaderHome />
            <NavBarHome />
            <h1>Dashboard</h1>
            <div className="informacion">
                <div className="Dash_cab">
                    <span>Órdenes</span>
                    <span>{loading ? '...' : informacion.ordenes}</span>
                </div>
                <div className="Dash_cab">
                    <span>Usuarios únicos</span>
                    <span>{loading ? '...' : informacion.usuarios}</span>
                </div>
                <div className="Dash_cab">
                    <span>Ingresos totales</span>
                    <span>S/{loading ? '...' : informacion.ingresos}</span>
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