//Codigo por Martín Tejada
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const usuarioString = localStorage.getItem("usuario");

    if (!usuarioString) {
        return <Navigate to="/login" replace />;
    }

    const usuario = JSON.parse(usuarioString);

    // ACEPTA cualquier formato de admin:
    // 1, true, "1", "true"
    const isAdmin =
        usuario.admin === 1 ||
        usuario.admin === true ||
        usuario.admin === "1" ||
        usuario.admin === "true";

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;