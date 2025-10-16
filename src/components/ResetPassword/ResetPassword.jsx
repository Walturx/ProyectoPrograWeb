//Codigo hecho por Martín Tejada
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useUser } from '../../context/UserContext';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { email } = useParams(); 
    const { resetPassword } = useUser(); 

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const exito = resetPassword(email, newPassword);

        if (exito) {
            alert("Contraseña actualizada con éxito. Por favor, inicia sesión de nuevo.");
            navigate('/');
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