//Codigo hecho por Martín Tejada
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './OlvidePassword.css';

const OlvidePassword = () => {
    const navigate = useNavigate();
    const { recoverPassword } = useUser();
    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleRecover = async () => {
        if (!email) {
            alert("Por favor, ingresa un correo electrónico.");
            return;
        }

        setCargando(true);
        const exito = await recoverPassword(email);
        setCargando(false);

        if (exito) {
            alert("Si el correo existe, se enviaron las instrucciones.");
            // En un caso real, el usuario va a su correo. 
            // Aquí simulamos que el link del correo lo lleva a reset-password:
            navigate(`/reset-password/${email}`);
        }
    };

    return (
        <main className="containerOlvide">
            <div className="container1">
                <h2>Olvidé mi contraseña</h2>
                <p className="textoOlvide">
                    Ingresa tu correo. Si está registrado, te enviaremos un enlace (Simulado).
                </p>
                
                <div className="grupo">
                    <p>Correo</p>
                    <input 
                        type="email" 
                        placeholder="usuario@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button 
                    onClick={handleRecover} 
                    className="btn-primary" 
                    disabled={cargando}
                    style={{ marginTop: '5px' }}
                >
                    {cargando ? "Enviando..." : "Recuperar contraseña"}
                </button>
            </div>
        </main>
    );
}

export default OlvidePassword;