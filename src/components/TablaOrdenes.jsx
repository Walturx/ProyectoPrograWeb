//HECHO POR ANDRES BEJAR 20230352

import React, { useState, useEffect } from "react";
import { getOrdenes, getOrdenByIdUsuario } from "./services/api";

function TablaOrdenes({ usuarioId }) {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Cargar órdenes desde el backend
    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;
                if (usuarioId) {
                    // Si hay un usuarioId, obtener solo las órdenes de ese usuario
                    data = await getOrdenByIdUsuario(usuarioId);
                } else {
                    // Si no hay usuarioId, obtener todas las órdenes
                    data = await getOrdenes();
                }

                setOrdenes(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar órdenes:', err);
                setError(err.message || "Error al cargar órdenes");
                setLoading(false);
            }
        };

        fetchOrdenes();
    }, [usuarioId]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Formatear fecha
    const formatearFecha = (fecha) => {
        if (!fecha) return 'N/A';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Formatear total
    const formatearTotal = (total) => {
        if (!total) return 'S/0.00';
        return `S/${parseFloat(total).toFixed(2)}`;
    };

    if (loading) {
        return <p>Cargando órdenes...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (ordenes.length === 0) {
        return <p>No hay órdenes disponibles</p>;
    }

    return (
        <>
            <table className="TablaOrdenes">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Fecha</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((v) => {
                        return (
                            <tr key={v.id}>
                                <td className="ID">#{v.id}</td>
                                <td>{formatearFecha(v.fecha)}</td>
                                <td>{formatearTotal(v.total)}</td>
                            </tr>
                        )
                    })}
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
        </>
    )
}

export default TablaOrdenes;