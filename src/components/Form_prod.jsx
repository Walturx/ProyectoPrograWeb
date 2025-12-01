//HECHO POR ANDRES BEJAR 20230352
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto, getCategorias } from './services/api';
import './Form_prod.css';

function Productos() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        presentacion: '',
        categoria: '',
        descripcion: '',
        precio: '',
        imagen: '',
        stock: ''
    });

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (err) {
                console.error("Error al cargar categorías:", err);
            }
        };
        fetchCategorias();
    }, []);

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
        if (!formData.nombre || !formData.presentacion || !formData.categoria || !formData.stock || !formData.precio) {
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
                precio: parseFloat(formData.precio),
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
                                    {categorias.map((cat, index) => {
                                        // Manejar si cat es objeto o string
                                        const nombreCategoria = typeof cat === 'object' ? cat.categoria : cat;
                                        const idCategoria = typeof cat === 'object' ? cat.id : index; // O usar el nombre como valor
                                        return (
                                            <option key={idCategoria} value={idCategoria}>
                                                {nombreCategoria}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button type="button" className="Btn-add" onClick={() => navigate('/admin/categorias/agregar')}>+</button>
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
                            <label htmlFor="GETPrecio">Precio *</label>
                            <input
                                type="number"
                                id="GETPrecio"
                                name="precio"
                                placeholder="Precio...."
                                value={formData.precio}
                                onChange={handleChange}
                                required
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