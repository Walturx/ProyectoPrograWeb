import React, { useState, useEffect } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import { AllProductos } from '../components/services/api';
import "./tablas.css"
import { Navigate, useNavigate } from "react-router-dom";


function Lista_Prod() {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Cargar productos desde el backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const data = await AllProductos();
                setProductos(data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError(err.message || "Error al cargar productos");
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleDeleteClick = (id) => {
        navigate(`/admin/productos/eliminar/${id}`);
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

    const iraAgregProd = () => {
        navigate('/admin/productos/agregar');
    };

    if (loading) {
        return (
            <div>
                <HeaderHome />
                <NavBarHome />
                <h2>Cargando productos...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <HeaderHome />
                <NavBarHome />
                <h2>Error: {error}</h2>
            </div>
        );
    }

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
                                        <button className="Acciones" onClick={() => handleDeleteClick(v.id)}>🗑️</button>
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
        </div>
    )

}

export default Lista_Prod;