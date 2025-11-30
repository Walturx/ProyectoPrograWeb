//Codigo hecho por Martín Tejada
import { createContext, useState, useContext } from 'react'
import { usuarios } from "../data/usuarios";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = (emailUsuario, password) => {
        const resultado = usuarios.find((u) => u.email.toLowerCase() === emailUsuario.toLowerCase()
            && u.password === password);

        if (resultado) {
            setUser(resultado);
            localStorage.setItem("usuario", JSON.stringify(resultado));
            return resultado;
        } else {
            return null;
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('usuario')
    }

    const register = (newUser) => {
        const existe = usuarios.find(u => u.email.toLowerCase() === newUser.email.toLowerCase());
        if (existe) {
            alert("El correo ya está registrado.");
            return false;
        }

        usuarios.push(newUser);
        console.log("Nuevo usuario añadido:", newUser);
        console.log("Lista de usuarios actualizada:", usuarios);
        return true;
    };

    const recoverPassword = (emailUsuario) => {
        const existe = usuarios.find(u => u.email.toLowerCase() === emailUsuario.toLowerCase());
        if (!existe) {
            console.log(`Solicitud de recuperación para: ${emailUsuario}. Usuario no encontrado.`);
            return false;
        }
        console.log(`Solicitud de recuperación para: ${emailUsuario}. Usuario encontrado: ${!!existe}`);
        return true;
    };

    const resetPassword = (emailUsuario, newPassword) => {
        const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === emailUsuario.toLowerCase());

        if (usuarioEncontrado) {
            if (usuarioEncontrado.password === newPassword) {
                alert("La nueva contraseña no puede ser igual a la anterior.");
                return false;
            }
            usuarioEncontrado.password = newPassword;
            console.log("Contraseña actualizada para:", emailUsuario);
            console.log("Lista de usuarios actualizada:", usuarios);
            return true;
        }
        return false; // No se encontró el usuario
    };

    const value = {
        user,
        login,
        logout,
        register,
        recoverPassword,
        resetPassword
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    return context;
}