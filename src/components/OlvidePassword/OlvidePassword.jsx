import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './OlvidePassword.css';

const OlvidePassword = () => {
    const navigate = useNavigate();
    const { recoverPassword } = useUser();
    const [email, setEmail] = useState('');

    const handleRecover = () => {

        if (!email) {
            alert("Por favor, ingresa un correo electrónico.");
            return;
        }

        // Llamamos a la función del contexto
        const emailExiste = recoverPassword(email);

        // Mostramos un mensaje genérico por seguridad y redirigimos
        alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
        if (emailExiste){
            navigate(`/reset-password/${email}`);
        } 
    };

    return (
        <>
            <main className="containerOlvide">
                <div className="container1">
                    <h2>Olvidé mi contraseña</h2>

                    <p className="textoOlvide">
                        Se enviará un enlace a tu correo electrónico para que puedas validar tu
                        identidad y restablecer tu contraseña. Por favor, asegúrate de revisar
                        tu bandeja de entrada y la carpeta de spam.
                    </p>
                    
                    <div className="grupo">
                        <p>Correo</p>
                        <input type="email" id="recovery-email" placeholder="usuario@gmail.com" 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <button onClick={() => handleRecover()} className="btn-primary" style={{ marginTop: '5px' }}>Recuperar contraseña</button>
                </div>
            </main>
        </>
    );
}

export default OlvidePassword;