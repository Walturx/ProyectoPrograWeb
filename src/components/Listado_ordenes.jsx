//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import ordenes from "../data/ordenes_B";

function ListaOrden() {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        return (
                            <tr key={v.id}>
                                <td className="ID">#{v.id}</td>
                                <td>{v.usuario}</td>
                                <td>{v.fecha}</td>
                                <td>{v.total}</td>
                                <td style={{ color: v.estado ? "green" : "red" }}>{v.estado ? "Entregado" : "No entregado"}</td>
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