//Codigo por Martín Tejada
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const usuarioString = localStorage.getItem("usuario");

    if (!usuarioString) {
        return <Navigate to="/" replace />;
    }

    const usuario = JSON.parse(usuarioString);

    if (usuario.admin !== 1) {
        
        return <Navigate to="/home" replace />;
    }

    return children; 
};

export default AdminRoute;