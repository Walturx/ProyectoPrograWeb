//HECHO POR ANDRES BEJAR 20230352
import React, { useState, useEffect } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import { getProductoById, updateProducto } from '../components/services/api';
import categ from '../data/categorias';
import { Navigate, useNavigate, useParams } from "react-router-dom";

function ModProd() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Initialize state with product data
    const [formData, setFormData] = useState({
        nombre: '',
        presentacion: '',
        categoria: '',
        descripcion: '',
        imagen: '',
        stock: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const producto = await getProductoById(id);
                setFormData({
                    nombre: producto.nombre || '',
                    presentacion: producto.presentacion || '',
                    categoria: producto.categoria || '',
                    descripcion: producto.descripcion || '',
                    imagen: producto.imagen || '',
                    stock: producto.stock || 0
                });
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar producto:', err);
                setError(err.message || "Error al cargar producto");
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await updateProducto({ id, ...formData });
            console.log("Producto actualizado exitosamente");
            navigate('/admin/productos');
        } catch (err) {
            console.error('Error al actualizar producto:', err);
            setError(err.message || "Error al actualizar producto");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <HeaderHome />
                <NavBarHome />
                <h3>Cargando producto...</h3>
            </>
        );
    }

    if (error) {
        return (
            <>
                <HeaderHome />
                <NavBarHome />
                <h3>Error: {error}</h3>
                <button onClick={() => navigate('/admin/productos')}>Volver</button>
            </>
        );
    }

    return (
        <>
            <HeaderHome />
            <NavBarHome />
            <h3>Editar producto</h3>
            <div className='AgregProd'>
                <form onSubmit={handleSubmit}>
                    <div className="Formulario">
                        <div className='Form-column'>
                            <div className="Form-group">
                                <label htmlFor="GETNombre">Nombre del producto</label>
                                <input
                                    id="GETNombre"
                                    name="nombre"
                                    type="text"
                                    placeholder='Nombre del producto'
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="Form-group">
                                <label htmlFor="GETPresentacion">Presentación</label>
                                <input
                                    id="GETPresentacion"
                                    name="presentacion"
                                    type="text"
                                    placeholder="Presentación"
                                    value={formData.presentacion}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="Form-group">
                                <label htmlFor="GETCategoria">Categoria</label>
                                <div className="Category-group">
                                    <select
                                        name="categoria"
                                        id="categorias"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccione la categoria del producto</option>
                                        {categ.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <button type="button" className="Btn-add" onClick={() => navigate(`/admin/${2}/categorias`)}>+</button>
                                </div>
                            </div>

                            <div className="Form-group">
                                <label htmlFor="GETDescripcion">Descripción</label>
                                <textarea
                                    id="GETDescripcion"
                                    name="descripcion"
                                    placeholder='Descripcion del producto...'
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        <div className='Form-column'>
                            <div className="Status-toggle">
                                <div className="Status-indicator"></div>
                                <span>Activo</span>
                            </div>

                            <div className="Form-group">
                                <label htmlFor="GETImage">Imagen : {formData.imagen ? formData.imagen.split('/').pop() : ''}</label>
                                <div className="Image-preview-container">
                                    {formData.imagen && <img className="ImagenEdit" src={formData.imagen} alt="Producto" />}
                                </div>
                                <input type="file" id="GETImage" />
                            </div>

                            <div className="Form-group">
                                <label htmlFor="GETStock">Stock</label>
                                <select
                                    name="stock"
                                    id="GETStock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                >
                                    <option value="">Stock</option>
                                    {[...Array(20).keys()].map(i =>
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )}
                                </select>
                            </div>

                            <button type="submit" className="Btn-create">Editar producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ModProd;