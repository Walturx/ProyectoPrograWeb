import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importamos useParams
import { useUser } from '../../context/UserContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { email } = useParams(); // Obtenemos el email de la URL
    const { resetPassword } = useUser(); // Necesitaremos esta función del contexto

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Llamamos a la función del contexto para cambiar la contraseña
        const exito = resetPassword(email, newPassword);

        if (exito) {
            alert("Contraseña actualizada con éxito. Por favor, inicia sesión de nuevo.");
            navigate('/'); // Redirigimos al login
        } else {
            alert("No se pudo actualizar la contraseña.");
        }
    };

    return (
        <main className="containerRecuperar">
            <div className="container1">
                <h2>Recuperar contraseña</h2>
                <form onSubmit={handleReset}>
                    <div className="grupo">
                        <p>Nueva contraseña</p>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </div>
                    
                    <div className="grupo">
                        <p>Repetir contraseña</p>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '5px' }}>
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ResetPassword;