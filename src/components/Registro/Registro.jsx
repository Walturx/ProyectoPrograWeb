import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import './Registro.css';
const Registro = () => {
    const navigate = useNavigate();
    const { register } = useUser();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {

        // Validaciones básicas
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        if (!nombre || !email || !password) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        const newUser = {
            id: Date.now(),
            nombre: nombre,
            apellido: apellido,
            email: email, 
            dni: dni,
            password: password,
            admin: 0, // Rol 
            estado: "Activo",
            fechaRegistro: "16/10/2025",
            imagen: "https://i.pravatar.cc/150?img=3",
            telefono: ""
        };

        // Llamamos a la función register del contexto
        const exito = register(newUser);

        if (exito) {
            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate('/');
        }
    };

    return (
        <>
            <main className="containerRegistro">
                <div className="container1" style={{ maxWidth: '650px' }}>
                    <h2>Registro</h2>
                    
                    <div className="grupos">
                        <div className="cont_1">
                            <p>Nombre</p>
                            <input type="text" id={nombre} placeholder="Nombre del usuario" 
                                    value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        </div>
                        <div className="cont_1">
                            <p>Apellido</p>
                            <input type="text" id="reg-surname" placeholder="Apellido del usuario" 
                                    value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                        </div>
                    </div>

                    <div className="grupos">
                        <div className="cont_1">
                            <p>Correo</p>
                            <input type="email" id="reg-email" placeholder="usuario@gmail.com" 
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="cont_1">
                            <p>DNI</p>
                            <input type="text" id="reg-dni" placeholder="DNI" 
                                    value={dni} onChange={(e) => setDni(e.target.value)}/>
                        </div>
                    </div>

                    <div className="grupos">
                        <div className="cont_1">
                            <p>Contraseña</p>
                            <input type="password" id="reg-password" placeholder="Contraseña" 
                                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="cont_1">
                            <p>Confirmar contraseña</p>
                            <input type="password" id="reg-confirm-password" placeholder="Contraseña" 
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button onClick={() => handleRegister()} className="btn-primary2" style={{ marginTop: '20px' }}>Registrarme</button>
                </div>
            </main>
        </>
    );
};

export default Registro;
