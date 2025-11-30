//Codigo hecho por Martín Tejada
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { createUsuario } from '../services/api';

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
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [imagen, setImagen] = useState('');
    const [cargando, setCargando] = useState(false);

    // Imagen por defecto
    const IMAGEN_POR_DEFECTO = 'https://i.scdn.co/image/ab67616d0000b273f885fb64a381318a1c9c14e4';

    const handleRegister = async () => {

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        if (!nombre || !apellido || !email || !dni || !password || !telefono || !direccion || !ciudad) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const newUser = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            dni: dni,
            password: password,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            imagen: imagen.trim() || IMAGEN_POR_DEFECTO, // Si no hay imagen, usar la por defecto
            admin: false // Siempre false como se requiere
        };

        try {
            setCargando(true);
            // Enviar al backend
            const resultado = await createUsuario(newUser);

            // También registrar en el contexto local (opcional, si quieres mantener compatibilidad)
            register(newUser);

            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate('/');
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert(error.message || "Error al registrar usuario. Por favor, intenta nuevamente.");
        } finally {
            setCargando(false);
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
                                value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="cont_1">
                            <p>Apellido</p>
                            <input type="text" id="reg-surname" placeholder="Apellido del usuario"
                                value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </div>
                    </div>

                    <div className="grupos">
                        <div className="cont_1">
                            <p>Correo</p>
                            <input type="email" id="reg-email" placeholder="usuario@gmail.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="cont_1">
                            <p>DNI</p>
                            <input type="text" id="reg-dni" placeholder="DNI"
                                value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>
                    </div>

                    <div className="grupos">
                        <div className="cont_1">
                            <p>Teléfono</p>
                            <input type="text" id="reg-telefono" placeholder="969750401"
                                value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                        <div className="cont_1">
                            <p>Ciudad</p>
                            <input type="text" id="reg-ciudad" placeholder="Lima"
                                value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                        </div>
                    </div>

                    <div className="grupo">
                        <p>Dirección</p>
                        <input type="text" id="reg-direccion" placeholder="Av. Gamer 123"
                            value={direccion} onChange={(e) => setDireccion(e.target.value)}
                            style={{ width: '100%' }} />
                    </div>

                    <div className="grupo">
                        <p>Imagen de Perfil (Opcional)</p>
                        <input
                            type="file"
                            id="reg-imagen-file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagen(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        />
                        <small style={{ color: '#666', fontSize: '12px' }}>
                            Si no subes una imagen, se usará una por defecto
                        </small>
                    </div>

                    <div className="grupos">
                        <div className="cont_1">
                            <p>Contraseña</p>
                            <input type="password" id="reg-password" placeholder="Contraseña"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="cont_1">
                            <p>Confirmar contraseña</p>
                            <input type="password" id="reg-confirm-password" placeholder="Contraseña"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>

                    <button
                        onClick={() => handleRegister()}
                        className="btn-primary2"
                        style={{ marginTop: '20px' }}
                        disabled={cargando}
                    >
                        {cargando ? 'Registrando...' : 'Registrarme'}
                    </button>
                </div>
            </main>
        </>
    );
};

export default Registro;
