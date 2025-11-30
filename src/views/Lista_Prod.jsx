//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import productos from "../data/productos_B";
import "./tablas.css"
import Nav from "../components/Barra_nav";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";


function Lista_Prod() {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleDeleteClick = (producto) => {
        setProductToDelete(producto);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // Here you would typically call an API to delete the product
        console.log("Deleting product:", productToDelete.nombre);
        setIsModalOpen(false);
        setProductToDelete(null);
        // For now, we'll just close the modal as we don't have a backend connected for deletion in this context
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
    };

    const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logica de paginacion
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const iraAgregProd = () => (
        navigate('/admin/productos/agregar')
    )


    return (
        <div >
            <HeaderHome />
            <NavBarHome />
            <h2>Listado de productos</h2>
            <div className="CabeLista">
                <input
                    className="Busca"
                    type="text"
                    placeholder="Buscar un producto..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="Botones-container">
                    <button className="Botones">Categorias</button>
                    <button className="Botones" onClick={iraAgregProd}>+ Agregar producto</button>
                </div>
            </div>
            <div className="ListaProductos">
                <table className="TbProductos">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Presentación</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((v) => {
                            return (
                                <tr key={v.id}>
                                    <td><img src={v.imagen} alt="" /></td>
                                    <td className="ID"><b>#{v.id}</b></td>
                                    <td className="tdAdmin">{v.nombre}</td>
                                    <td className="tdAdmin">{v.presentacion}</td>
                                    <td className="tdAdmin">{v.descripcion}</td>
                                    <td className="tdAdmin"><b>{v.categoria}</b></td>
                                    <td className="tdAdmin">{v.stock}</td>
                                    <td className="tdAdmin">
                                        <button className="Acciones" onClick={() => navigate(`/admin/productos/modificar/${v.id}`)}>✏️</button>
                                        <button className="Acciones" onClick={() => handleDeleteClick(v)}>🗑️</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
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

            <Nav />

            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                productName={productToDelete?.nombre}
            />
        </div>
    )

}

export default Lista_Prod;