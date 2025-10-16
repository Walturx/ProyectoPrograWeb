//HECHO POR ANDRES BEJAR 20230352
import { useNavigate } from 'react-router-dom';
import categ from '../data/categorias';
function Productos() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/productos');
    };

    return (
            <div className='AgregProd'>
                <form onSubmit={handleSubmit}>
                    <div className="Formulario">
                        <div className='Form'>
                            <label htmlFor="GETNombre">Nombre del producto:</label> <br />
                            <input id="GETNombre" type="text" placeholder='Nombre del producto' /><br /><br />
                            
                            <label htmlFor="GETPresentacion">Presentación</label><br />
                            <input id="GETPresentacion" type="text" placeholder="Presentación" /><br /><br />
                            
                            <label htmlFor="GETCategoria">Categoria</label><br />
                            <select name="categorias" id="categorias" defaultValue="">
                                <option value="" disabled>Seleccione la categoria del producto</option>
                                {categ.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button type="button">+</button><br /><br />
                            
                            <label htmlFor="GETDescripcion">Descripción</label><br />
                            <textarea id="GETDescription" placeholder='Descripcion del producto...'></textarea>
                        </div>
                        <div className='Form'>
                            <label htmlFor="GETImage">Imagen</label> <br />
                            <input className="Archivo" type="file" id="GETImage" /><br />
                            
                            <label htmlFor="GETStock">Stock</label><br />
                            <select name="Stock" id="GETStock" defaultValue="">
                                <option value="" disabled>Stock</option>
                                {[...Array(20).keys()].map(i => 
                                    <option key={i+1} value={i+1}>{i+1}</option>
                                )}
                            </select>
                            <button type="submit">Crear Producto</button>
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default Productos;