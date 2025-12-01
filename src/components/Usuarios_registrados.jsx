//HECHO POR ANDRES BEJAR 20230352

import React, { useState, useEffect } from 'react';
import { getUsuarios, cambiarEstadoUsuario } from './services/api';
import { useNavigate } from 'react-router-dom';

function TablaUsuarios({ onUsuario }) {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Cargar usuarios desde el backend
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                setLoading(true);
                const data = await getUsuarios();
                setUsuarios(data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar usuarios:', err);
                if (err.message.includes("401") || err.message.includes("Unauthorized")) {
                    setError("Sesión expirada o no autorizada. Por favor inicia sesión nuevamente.");
                } else {
                    setError(err.message || "Error al cargar usuarios");
                }
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const irATodos_Usuarios = () => {
        navigate("/admin/usuarios");
    };

    const CambiarEstado = async (id) => {
        try {
            // Encontrar el usuario actual
            const usuario = usuarios.find(u => u.id === id);
            if (!usuario) return;

            // Cambiar el estado en el backend
            const nuevoEstado = !usuario.estado;
            await cambiarEstadoUsuario(id, nuevoEstado);

            // Actualizar el estado local
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((u) =>
                    u.id === id ? { ...u, estado: nuevoEstado } : u
                )
            );
        } catch (err) {
            console.error('Error al cambiar estado:', err);
            alert('Error al cambiar el estado del usuario');
        }
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div>
                <div className="tablas_cab">
                    <h3>Usuarios registrados</h3>
                    <button className="btn-solid" onClick={irATodos_Usuarios}>Ver todos los usuarios</button>
                </div>
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="tablas_cab">
                    <h3>Usuarios registrados</h3>
                    <button className="btn-solid" onClick={irATodos_Usuarios}>Ver todos los usuarios</button>
                </div>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="tablas_cab">
                <h3>Usuarios registrados</h3>
                <button className="btn-solid" onClick={irATodos_Usuarios}>Ver todos los usuarios</button>
            </div>
            <table className="TbUsuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((v) => (

                        <tr key={v.id}>

                            <td>
                                <img src={v.imagen || '/default-avatar.png'} alt={v.nombre} /></td>
                            <td>{v.nombre}</td>
                            <td className={v.estado ? "text-green" : "text-red"}>
                                {v.estado ? "Activo" : "Inactivo"}
                            </td>
                            <td className="acciones-btns">
                                <button
                                    onClick={() => CambiarEstado(v.id)}
                                    className="btn-solid"
                                    style={{ backgroundColor: v.estado ? "#22c55e" : "#22c55e" }}
                                >
                                    {v.estado ? "Desactivar" : "Activar"}
                                </button>
                                <button className="btn-outline" onClick={() => onUsuario(v.id)}>Ver detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="Pagination">
                <button
                    className="Page-btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`Page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="Page-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>


    )
}

export default TablaUsuarios;