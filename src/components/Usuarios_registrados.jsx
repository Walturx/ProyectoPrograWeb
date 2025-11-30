//HECHO POR ANDRES BEJAR 20230352

import React, { useContext, useState } from 'react';
import usuarios from '../data/usuarios_B';
import { useNavigate } from 'react-router-dom';

function TablaUsuarios({ onUsuario }) {
    const navigate = useNavigate();
    const irATodos_Usuarios = () => {
        navigate("/admin/usuarios");
    };

    const [estado, setEstado] = useState(usuarios)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const CambiarEstado = (id) => {
        setEstado((prevUsuarios) =>
            prevUsuarios.map((u) => u.id === id ? { ...u, estado: !u.estado } : u
            )
        )
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = estado.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(estado.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                                <img src={v.imagen} /></td>
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
                                <button className="btn-outline" onClick={() => onUsuario(v.id - 1)}>Ver detalle</button>
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