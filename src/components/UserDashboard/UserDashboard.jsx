//Codigo hecho por Martin Tejada
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getOrdenByIdUsuario } from "../services/api";
import './UserDashboard.css';

const UserDashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    
    // Estados para guardar las órdenes reales y la carga
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCerrarSesion = () => {
        logout();
        navigate("/");
    };

    // Efecto para cargar las órdenes apenas se abra la página
    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            getOrdenByIdUsuario(user.id)
                .then(data => {
                    // El backend devuelve un array de órdenes
                    if (Array.isArray(data)) {
                        setOrdenes(data);
                    } else {
                        setOrdenes([]);
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (!user) {
        return <p className="text-center mt-10">Cargando información del usuario...</p>;
    }

    return (
        <div className="dashboard-container">
            <div className="user-header">
                <h1 className="welcome-title">Hola, {user.nombre}!</h1>
                <div className="avatar">
                    {/* Si el usuario tiene imagen la muestra, si no pone una por defecto */}
                    <img 
                        src={user.imagen || "https://i.scdn.co/image/ab67616d0000b273f885fb64a381318a1c9c14e4"} 
                        alt={`Foto de ${user.nombre}`} 
                    />
                </div>
            </div>

            <div className="user-info-grid">
                <div className="info-card">
                    <h4>Datos personales</h4>
                    <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>DNI:</strong> {user.dni}</p>
                    <p><strong>Fecha de registro:</strong> {user.fecharegistro || "—"}</p>
                </div>
                <div className="info-card">
                    <h4>Dirección principal</h4>
                    <p>{user.direccion || "No registrada"}</p>
                    <p>{user.ciudad || ""}</p>
                    <p>{user.telefono || ""}</p>
                </div>
                <div className="summary-cards">
                    <div className="summary-card green">
                        <p>Órdenes</p>
                        {/* Cantidad real de órdenes */}
                        <span>{ordenes.length}</span>
                    </div>
                </div>
            </div>

            <h2 className="orders-title">Tus órdenes recientes</h2>
            <div className="order-table-container">
                {loading ? (
                    <p style={{padding: '20px'}}>Cargando órdenes...</p>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>#ORDEN</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.length > 0 ? (
                                ordenes.map((orden) => (
                                    <tr key={orden.id}>
                                        <td className="order-id">#{orden.id}</td>
                                        {/* Formateamos la fecha para que se vea bien */}
                                        <td>{orden.fecha ? orden.fecha.substring(0, 10) : "-"}</td>
                                        <td>S/ {Number(orden.total).toFixed(2)}</td>
                                        <td>
                                            <span className={orden.estado === "Entregado" ? "status-delivered" : "status-pending"}>
                                                {orden.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn-detail"
                                                onClick={() => navigate(`/usuario/${user.id}/orden/${orden.id}`)}
                                            >
                                                Ver detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No tienes órdenes registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            
            <button onClick={handleCerrarSesion} className="btn-logout">Cerrar Sesión</button>
        </div>
    );
};

export default UserDashboard;