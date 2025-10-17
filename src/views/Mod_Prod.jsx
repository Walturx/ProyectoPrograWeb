//HECHO POR ANDRES BEJAR 20230352
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Form from "../components/Form_prod"
import prod from "../data/productos_B"
import categ from '../data/categorias';
import { Navigate, useNavigate, useParams } from "react-router-dom";

function ModProd(){

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/admin/productos');
    };

    const{id}=useParams();

    const resultado = prod[id-1]

    return(
        <>
            <HeaderHome/>
            <NavBarHome/>
            <h3>Editar producto</h3>
            <div className='AgregProd'>
            <form onSubmit={handleSubmit}>
                <div className="Formulario">
                    <div className='Form'>
                        <label for="GETNombre">Nombre del producto:</label> <br />
                        <input id="GETNombre" type="text" placeholder='Nombre del producto' value={resultado.nombre}/><br /><br />
                            
                        <label for="GETPresentacion">Presentación</label><br />
                        <input id="GETPresentacion" type="text" placeholder="Presentación" value={resultado.presentacion}/><br /><br />
                            
                        <label for="GETCategoria">Categoria</label><br />
                        <select name="categorias" id="categorias">
                            <option value={resultado.categoria}>Seleccione la categoria del producto</option>
                            {categ.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <button type="button">+</button><br /><br />
                            
                        <label for="GETDescripcion">Descripción</label><br />
                        <textarea id="GETDescription" placeholder='Descripcion del producto...' value={resultado.descripcion}></textarea>
                    </div>
                    <div className='Form'>
                        <label for="GETImage">Imagen</label> <br />
                        <input type="file" id="GETImage"/><br />
                            <img className="ImagenEdit" src={resultado.imagen} /> <br /> <br />
                            
                        <label for="GETStock">Stock</label><br />
                        <select name="Stock" id="GETStock" defaultValue="">
                            <option value={resultado.stock}>Stock</option>
                            {[...Array(20).keys()].map(i => 
                                <option key={i+1} value={i+1}>{i+1}</option>
                            )}
                         </select>
                          <button type="submit">Editar Producto</button>
                     </div>
                 </div>
             </form>
            </div>
        </>
    )
}

export default ModProd;