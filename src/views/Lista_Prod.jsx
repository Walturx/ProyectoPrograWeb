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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
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
                        {filteredProductos.map((v) => {
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
                <span className="Page-btn">&lt;</span>
                <span className="Page-btn active">1</span>
                <span className="Page-btn">2</span>
                <span className="Page-btn">3</span>
                <span className="Page-btn">...</span>
                <span className="Page-btn">10</span>
                <span className="Page-btn">&gt;</span>
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