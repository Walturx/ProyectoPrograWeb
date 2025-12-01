//HECHO POR ANDRES BEJAR 20230352

import React, { useState, useEffect } from "react";
import { getOrdenes } from "./services/api";

function ListaOrden() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Cargar órdenes desde el backend
    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getOrdenes();
                setOrdenes(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar órdenes:', err);
                setError(err.message || "Error al cargar órdenes");
                setLoading(false);
            }
        };

        fetchOrdenes();
    }, []);

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

    // Determinar estado de la orden
    const determinarEstado = (orden) => {
        // El backend puede enviar 'estado' como boolean o string
        if (typeof orden.estado === 'boolean') {
            return orden.estado;
        }
        // Si es string, verificar valores comunes
        if (typeof orden.estado === 'string') {
            const estadoLower = orden.estado.toLowerCase();
            return estadoLower === 'entregado' || estadoLower === 'completado' || estadoLower === 'true';
        }
        return false;
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Cargando órdenes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        );
    }

    if (ordenes.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>No hay órdenes disponibles</p>
            </div>
        );
    }

    return (
        <>
            <table className="TablaOrden">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Usuario</th>
                        <th>Fecha de orden</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((v) => {
                        const estado = determinarEstado(v);
                        return (
                            <tr key={v.id}>
                                <td className="ID">#{v.id}</td>
                                <td>{v.usuario || v.nombreusuario || `Usuario #${v.idusuario}`}</td>
                                <td>{formatearFecha(v.fecha)}</td>
                                <td>{formatearTotal(v.total)}</td>
                                <td style={{ color: estado ? "green" : "red" }}>
                                    {estado ? "Entregado" : "No entregado"}
                                </td>
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

export default ListaOrden;