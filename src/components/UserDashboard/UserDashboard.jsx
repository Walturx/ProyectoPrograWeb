import { useUser } from "../../context/UserContext";
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
            {/* --- CONTENEDOR SIMPLE PARA EL ENCABEZADO --- */}
            <div className="user-header">
                <h1 className="welcome-title">Hola, {user.nombre}!</h1>
                <div className="avatar">
                    <img src={user.imagen} alt={`Foto de ${user.nombre}`} />
                </div>
            </div>

            {/* --- El resto del contenido sigue igual --- */}
            <div className="user-info-grid">
                <div className="info-card">
                    <h4>Datos personales</h4>
                    <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Fecha de registro:</strong> {user.fechaRegistro}</p>
                </div>
                <div className="info-card">
                    <h4>Dirección de envío</h4>
                    <p>Av. La Molina 1234, Lima</p>
                </div>
                <div className="summary-cards">
                    <div className="summary-card green">
                        <p>Órdenes</p>
                        <span>3</span>
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
                        <tr>
                            <td className="order-id">#1234</td>
                            <td>Juan Perez</td>
                            <td>S/ 199.00</td>
                            <td><span className="status-delivered">Entregado</span></td>
                            <td><button className="btn-detail">Ver detalle</button></td>
                        </tr>
                        <tr>
                            <td className="order-id">#1235</td>
                            <td>Juan Perez</td>
                            <td>S/ 89.50</td>
                            <td><span className="status-pending">Por entregar</span></td>
                            <td><button className="btn-detail">Ver detalle</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <button onClick={handleCerrarSesion} className="btn-logout">Cerrar Sesión</button>
        </div>
    );
};

export default UserDashboard;