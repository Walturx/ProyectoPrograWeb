import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

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
                            <button className="btn-confirm" onClick={onConfirm}>Sí, eliminar</button>
                            <button className="btn-cancel" onClick={onClose}>No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
