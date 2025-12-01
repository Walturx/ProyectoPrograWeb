// Codigo hecho por Martin Tejada
import { createContext, useState, useContext, useEffect } from 'react';
import { loginUsuario, createUsuario, solicitarRecuperacion, restablecerPassword } from '../components/services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // 1. Al cargar la página, verificamos si ya hay un usuario guardado en el navegador
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        const tokenGuardado = localStorage.getItem("token");
        
        if (usuarioGuardado && tokenGuardado) {
            setUser(JSON.parse(usuarioGuardado));
        }
    }, []);

    // 2. Función LOGIN conectada al Backend
    const login = async (email, password) => {
        try {
            // Llamamos a la API
            const data = await loginUsuario({ email, password });

            if (data.success) {
                // Guardamos los datos en el estado y en el navegador (LocalStorage)
                setUser(data.usuario);
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                return data.usuario;
            } else {
                alert(data.message); // Mensaje del backend (ej: "Contraseña incorrecta")
                return null;
            }
        } catch (error) {
            console.error("Error login:", error);
            alert(error.message);
            return null;
        }
    };

    // 3. Función LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        // Opcional: limpiar carrito del storage si lo usas
        localStorage.removeItem('mi_carrito_productos');
    };

    // Mantenemos estas funciones vacías o simples para que no rompan otros componentes
    // hasta que lleguemos a esa parte (Registro ya lo manejas directo en el componente)
    const register = (newUser) => { return true; };
    const recoverPassword = async (email) => {
        try {
            const data = await solicitarRecuperacion(email);
            // El backend devuelve success: true si todo fue bien
            return data.success;
        } catch (error) {
            console.error("Error recuperación:", error);
            alert(error.message);
            return false;
        }
    };

    const resetPasswordCtx = async (email, newPassword) => {
        try {
            const data = await restablecerPassword(email, newPassword);
            return data.success;
        } catch (error) {
            console.error("Error reset password:", error);
            alert(error.message);
            return false;
        }
    };
    
    const value = {
        user,
        login,
        logout,
        register,
        recoverPassword,
        resetPassword: resetPasswordCtx 
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    return context;
}