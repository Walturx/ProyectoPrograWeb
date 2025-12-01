import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById, deleteProducto } from '../components/services/api';
import '../components/DeleteConfirmationModal.css'; // Reusing the modal styles

const DeleteProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const producto = await getProductoById(id);
                setProductName(producto.nombre);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar producto:', err);
                setError("No se pudo cargar la información del producto.");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await deleteProducto(id);
            console.log(`Producto ${id} eliminado exitosamente`);
            navigate('/admin/productos');
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            setError(err.message || "Error al eliminar el producto");
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/admin/productos');
    };

    if (loading) return <div className="modal-overlay"><div className="modal-container"><p>Cargando...</p></div></div>;
    if (error) return <div className="modal-overlay"><div className="modal-container"><p>{error}</p><button className="btn-cancel" onClick={handleClose}>Volver</button></div></div>;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Eliminar producto</h3>
                </div>
                <div className="modal-body">
                    <div className="modal-icon">
                        <div className="icon-circle">
                            <span className="icon-x">×</span>
                        </div>
                    </div>
                    <div className="modal-content">
                        <p>¿Estas seguro que deseas eliminar el producto “{productName}” ?</p>
                        <div className="modal-actions">
                            <button className="btn-confirm" onClick={handleConfirm}>Sí, eliminar</button>
                            <button className="btn-cancel" onClick={handleClose}>No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductPage;
