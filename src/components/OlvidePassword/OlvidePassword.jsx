//Codigo hecho por Martín Tejada
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solicitarRecuperacion } from '../services/api';
import './OlvidePassword.css';

const OlvidePassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [enviado, setEnviado] = useState(false);

    const handleRecover = async () => {
        if (!email) {
            alert("Por favor, ingresa un correo electrónico.");
            return;
        }

        try {
            setCargando(true);
            setError(null);

            // Llamamos al backend que a su vez llama a n8n
            await solicitarRecuperacion(email);

            setCargando(false);
            setEnviado(true);
            alert("Si el correo existe, se han enviado las instrucciones de recuperación.");

            // Opcional: Redirigir al login después de unos segundos
            // setTimeout(() => navigate('/login'), 3000);

        } catch (err) {
            setCargando(false);
            console.error("Error en recuperación:", err);
            // Incluso si falla (por seguridad no deberíamos decir si el correo existe o no), 
            // podemos mostrar un error genérico o el mensaje del backend si es desarrollo.
            setError(err.message || "Hubo un error al procesar la solicitud.");
        }
    };

    if (enviado) {
        return (
            <main className="containerOlvide">
                <div className="container1">
                    <h2>¡Correo Enviado!</h2>
                    <p className="textoOlvide">
                        Si el correo <strong>{email}</strong> está registrado, recibirás un enlace para restablecer tu contraseña en unos momentos.
                    </p>
                    <p className="textoOlvide">
                        Por favor revisa tu bandeja de entrada y spam.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="btn-primary"
                        style={{ marginTop: '15px' }}
                    >
                        Volver al Login
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="containerOlvide">
            <div className="container1">
                <h2>Olvidé mi contraseña</h2>
                <p className="textoOlvide">
                    Ingresa tu correo electrónico. Te enviaremos un enlace para recuperar tu cuenta.
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

                {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>}

                <button
                    onClick={handleRecover}
                    className="btn-primary"
                    disabled={cargando}
                    style={{ marginTop: '15px' }}
                >
                    {cargando ? "Enviando..." : "Recuperar contraseña"}
                </button>

                <button
                    onClick={() => navigate('/login')}
                    className="btn-outline"
                    style={{ marginTop: '10px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Cancelar
                </button>
            </div>
        </main>
    );
}

export default OlvidePassword;
