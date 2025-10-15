import { createContext, useState, useContext } from 'react'
import usuarios from "../data/usuarios";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null)

    const login = (email, password) => {
        const resultado = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase() 
                                        && u.password.toLowerCase() === password.toLowerCase())

        if (resultado) {
            setUser(resultado)
            localStorage.setItem("usuario", JSON.stringify(resultado));
            return true;
        } else 
            return false;
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('usuario')
    }

    const register = (newUser) => {
        // Verificamos si el usuario ya existe
        const existe = usuarios.find(u => u.email.toLowerCase() === newUser.email.toLowerCase());
        if (existe) {
            alert("El correo ya está registrado.");
            return false;
        }

        // Si no existe, lo agregamos al arreglo
        usuarios.push(newUser);
        console.log("Nuevo usuario añadido:", newUser);
        console.log("Lista de usuarios actualizada:", usuarios);
        return true;
    };

    const recoverPassword = (email) => {
        const existe = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!existe) {
            // Si el correo no existe, retornamos false
            console.log(`Solicitud de recuperación para: ${email}. Usuario no encontrado.`);
            return false;
        }
        console.log(`Solicitud de recuperación para: ${email}. Usuario encontrado: ${!!existe}`);
        return true;
    };

    const resetPassword = (email, newPassword) => {
        const usuarioEncontrado = usuarios.find(u => u.username.toLowerCase() === email.toLowerCase());

        // Si encontramos el usuario...
        if (usuarioEncontrado) {
            // Verificamos que la nueva contraseña no sea igual a la anterior
            if (usuarioEncontrado.password === newPassword) {
            alert("La nueva contraseña no puede ser igual a la anterior.");
            return false;
            }
            // Actualizamos la contraseña del usuario en nuestro arreglo
            usuarioEncontrado.password = newPassword;
            console.log("Contraseña actualizada para:", email);
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
            { children }
        </UserContext.Provider>
    )
}

export function useUser () {
    const context = useContext(UserContext)
    return context;
}