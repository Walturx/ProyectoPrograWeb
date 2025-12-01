// src/components/Login/Login.jsx
import './Login.css';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser(); // Usamos la función del contexto nuevo

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Para deshabilitar botón mientras carga

    const handleLogin = async () => {
        if (!usuario || !password) {
            alert("Por favor ingresa correo y contraseña");
            return;
        }

        setLoading(true);
        // Ahora login es una promesa, usamos await
        const usuarioLogueado = await login(usuario, password);
        setLoading(false);

        if (usuarioLogueado) {
            // Verificamos si es admin (tu backend lo guarda como boolean o 1/0)
            if (usuarioLogueado.admin === true || usuarioLogueado.admin === 1) {
                navigate('/dashboard-admin');
            } else {
                navigate('/home');
            }
        }
        // Si falló, el Context ya mostró el alert con el error.
    };

    return (
        <main className="containerLogin">
            <div className="container1">
                <h2>Iniciar sesión</h2>
                <div className="grupo">
                    <p>Correo</p>
                    <input 
                        type="email" 
                        placeholder="usuario@gmail.com"
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="grupo">
                    <p>Contraseña</p>
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button 
                    onClick={handleLogin} 
                    className="btn-primary" 
                    disabled={loading} // Evita doble clic
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Cargando..." : "Iniciar sesión"}
                </button>

                {/* Mantenemos tus Links originales */}
                <Link to="/registro" className="link-text">Registrarme</Link>
                <Link to="/olvide-password" className="link-text">Olvidé mi contraseña</Link>
            </div>
        </main>
    );
};

export default Login;