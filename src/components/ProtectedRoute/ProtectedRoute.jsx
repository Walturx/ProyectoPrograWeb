//Codigo hecho por Martín Tejada
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    try {
        const usuarioString = localStorage.getItem("usuario");

        // Si no hay nada en localStorage, redirigir a login
        if (!usuarioString) {
            console.log("ProtectedRoute: No hay usuario en localStorage");
            return <Navigate to="/login" replace />;
        }

        // Intentar parsear el usuario
        const usuario = JSON.parse(usuarioString);

        // Verificar que el usuario tenga al menos un ID
        if (!usuario || !usuario.id) {
            console.log("ProtectedRoute: Usuario inválido o sin ID");
            localStorage.removeItem("usuario"); // Limpiar datos corruptos
            return <Navigate to="/login" replace />;
        }

        console.log("ProtectedRoute: Usuario válido:", usuario.email);
        return children;

    } catch (error) {
        console.error("ProtectedRoute: Error al verificar usuario", error);
        localStorage.removeItem("usuario"); // Limpiar en caso de error
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;