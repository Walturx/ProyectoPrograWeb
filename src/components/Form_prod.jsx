//HECHO POR ANDRES BEJAR 20230352
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from './services/api';
import categ from '../data/categorias';
import './Form_prod.css';

function Productos() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        presentacion: '',
        categoria: '',
        descripcion: '',
        imagen: '',
        stock: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.presentacion || !formData.categoria || !formData.stock) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await createProducto({
                nombre: formData.nombre,
                presentacion: formData.presentacion,
                categoria: formData.categoria,
                descripcion: formData.descripcion,
                imagen: formData.imagen,
                stock: parseInt(formData.stock)
            });

            console.log('Producto creado exitosamente');
            navigate('/admin/productos');
        } catch (err) {
            console.error('Error al crear producto:', err);
            setError(err.message || 'Error al crear el producto');
            setLoading(false);
        }
    };

    return (
        <div className='AgregProd'>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{
                        color: 'red',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid red',
                        borderRadius: '5px',
                        backgroundColor: '#ffe6e6'
                    }}>
                        {error}
                    </div>
                )}

                <div className="Formulario">
                    <div className='Form-column'>
                        <div className="Form-group">
                            <label htmlFor="GETNombre">Nombre del producto: *</label>
                            <input
                                id="GETNombre"
                                name="nombre"
                                type="text"
                                placeholder='Nombre del producto'
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETPresentacion">Presentación *</label>
                            <input
                                id="GETPresentacion"
                                name="presentacion"
                                type="text"
                                placeholder="Presentación"
                                value={formData.presentacion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETCategoria">Categoria *</label>
                            <div className="Category-group">
                                <select
                                    name="categoria"
                                    id="categorias"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione la categoria del producto</option>
                                    {categ.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <button type="button" className="Btn-add">+</button>
                            </div>
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETDescription">Descripción</label>
                            <textarea
                                id="GETDescription"
                                name="descripcion"
                                placeholder='Descripcion del producto...'
                                value={formData.descripcion}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className='Form-column'>
                        <div className="Form-group">
                            <label htmlFor="GETImage">Imagen (URL)</label>
                            <input
                                type="text"
                                id="GETImage"
                                name="imagen"
                                placeholder="URL de la imagen"
                                value={formData.imagen}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETStock">Stock *</label>
                            <select
                                name="stock"
                                id="GETStock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Stock</option>
                                {[...Array(20).keys()].map(i =>
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="Btn-create"
                            disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear Producto'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Productos;