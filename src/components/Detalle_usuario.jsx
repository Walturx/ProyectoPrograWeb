//HECHO POR ANDRES BEJAR 20230352

import React, { useState, useEffect } from "react";
import { getUsuarioById } from "./services/api";

function DetalleUsuario({ id }) {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            // Si no hay ID o es 0, no cargar nada
            if (!id || id === 0) {
                setUsuario(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getUsuarioById(id);
                setUsuario(data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar usuario:', err);
                setError(err.message || "Error al cargar usuario");
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [id]);

    function Estado(v) {
        if (v == true)
            return ("Activo")
        else
            return ("Inactivo")
    }

    if (loading) {
        return (
            <div>
                <div className="Detalle">
                    <p>Cargando detalles del usuario...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="Detalle">
                    <p style={{ color: 'red' }}>Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div>
                <div className="Detalle">
                    <p>Selecciona un usuario para ver sus detalles</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="Detalle">
                <div className="Detalle-info">
                    <h2>{usuario.nombre}</h2>
                    <p><strong>Correo:</strong> {usuario.email || usuario.correo}</p>
                    <p><strong>Fecha de registro:</strong> {usuario.fecha || new Date(usuario.createdAt).toLocaleDateString()}</p>
                    <p><strong>Estado:</strong> {Estado(usuario.estado)}</p>
                </div>
                <div>
                    <img src={usuario.imagen || '/default-avatar.png'} alt="Foto de perfil" />
                </div>
            </div>
        </div>

    )
}

export default DetalleUsuario;
