import { useUser } from "../../context/UserContext";
import ordenes from "../../data/ordenes";
import { useNavigate } from "react-router-dom";
import './UserDashboard.css';

const UserDashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="welcome-title">Hola {user.nombre} !</h1>
            <div className="user-info-grid">
                <div className="info-card">
                    <h4>Datos personales</h4>
                    <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                </div>
                <div className="info-card">
                    <h4>Dirección de envío</h4>
                    <p>Av la molina 1234, Lima</p>
                </div>
                <div className="summary-cards">
                    <div className="summary-card green">
                        <p>Órdenes</p>
                        <span>{ordenes.length}</span>
                    </div>
                </div>
            </div>

            <h2 className="orders-title">Tus órdenes</h2>
            <div className="order-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>#ORDEN</th>
                            <th>Usuario</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden) => (
                            <tr key={orden.id}>
                                <td className="order-id">{orden.id}</td>
                                <td>{orden.usuario}</td>
                                <td>S/ {orden.total.toFixed(2)}</td>
                                <td>
                                    <span className={orden.estado === 'Entregado' ? 'status-delivered' : 'status-pending'}>
                                        {orden.estado}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-detail">Ver detalle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button onClick={handleCerrarSesion} className="btn-logout">Cerrar Sesión</button>
        </div>
    );
};

export default UserDashboard;