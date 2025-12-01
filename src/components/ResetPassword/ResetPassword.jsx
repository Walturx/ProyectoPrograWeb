//Codigo hecho por Martín Tejada
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { email } = useParams(); // Obtenemos el email de la URL
    const { resetPassword } = useUser();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!newPassword) {
            alert("Ingresa una contraseña.");
            return;
        }

        setCargando(true);
        const exito = await resetPassword(email, newPassword);
        setCargando(false);

        if (exito) {
            alert("Contraseña actualizada con éxito. Por favor, inicia sesión de nuevo.");
            navigate('/login');
        }
    };

    return (
        <main className="containerRecuperar containerRecuperarExtra">
            <div className="container1">
                <h2>Recuperar contraseña para {email}</h2>
                <form onSubmit={handleReset}>
                    <div className="grupo">
                        <p>Nueva contraseña</p>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                    </div>

                    <div className="grupo">
                        <p>Repetir contraseña</p>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repetir contraseña"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={cargando}
                        style={{ marginTop: '5px' }}
                    >
                        {cargando ? "Actualizando..." : "Cambiar contraseña"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ResetPassword;