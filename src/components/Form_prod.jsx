//HECHO POR ANDRES BEJAR 20230352
import { useNavigate } from 'react-router-dom';
import categ from '../data/categorias';
import './Form_prod.css';

function Productos() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/admin/productos');
    };

    return (
        <div className='AgregProd'>
            <form onSubmit={handleSubmit}>
                <div className="Formulario">
                    <div className='Form-column'>
                        <div className="Form-group">
                            <label htmlFor="GETNombre">Nombre del producto:</label>
                            <input id="GETNombre" type="text" placeholder='Nombre del producto' />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETPresentacion">Presentación</label>
                            <input id="GETPresentacion" type="text" placeholder="Presentación" />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETCategoria">Categoria</label>
                            <div className="Category-group">
                                <select name="categorias" id="categorias" defaultValue="">
                                    <option value="" disabled>Seleccione la categoria del producto</option>
                                    {categ.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <button type="button" className="Btn-add">+</button>
                            </div>
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETDescription">Descripción</label>
                            <textarea id="GETDescription" placeholder='Descripcion del producto...'></textarea>
                        </div>
                    </div>

                    <div className='Form-column'>
                        <div className="Form-group">
                            <label htmlFor="GETImage">Imagen</label>
                            <input type="file" id="GETImage" />
                        </div>

                        <div className="Form-group">
                            <label htmlFor="GETStock">Stock</label>
                            <select name="Stock" id="GETStock" defaultValue="">
                                <option value="" disabled>Stock</option>
                                {[...Array(20).keys()].map(i =>
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )}
                            </select>
                        </div>

                        <button type="submit" className="Btn-create">Crear Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Productos;