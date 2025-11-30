import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productos from '../data/productos_B';
import '../components/DeleteConfirmationModal.css'; // Reusing the modal styles

const DeleteProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Synchronous lookup
        const product = productos.find(p => p.id === parseInt(id));

        if (product) {
            setProductName(product.nombre);
            setLoading(false);
        } else {
            setError("No se pudo cargar la información del producto.");
            setLoading(false);
        }
    }, [id]);

    const handleConfirm = () => {
        // Mock deletion - just log and navigate
        console.log(`Eliminando producto ${id}`);
        navigate('/admin/productos');
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
