//Codigo hecho por Martín Tejada
import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from '../../context/UserContext';

const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useUser();

    const handleLogin = () => {
        
        if (login(usuario, password)) {
            navigate('/home')
        }
        else
            alert('Usuario o password incorrecto!')
    }


    return (
        <>
            <main className="containerLogin">
                <div className="container1">
                    <h2>Iniciar sesión</h2>
                    <div className="grupo">
                        <p>Correo</p>
                        <input type="email" id="login-email" placeholder="usuario@gmail.com" 
                            value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="grupo">
                        <p>Contraseña</p>
                        <input type="password" id="login-password" placeholder="Contraseña"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={() => handleLogin()} className="btn-primary">Iniciar sesión</button>

                    <Link to="/registro" className="link-text">Registrarme</Link>
                    <Link to="/olvide-password" className="link-text">Olvidé mi contraseña</Link>
                </div>
            </main>
        </>
    );
};


export default Login;