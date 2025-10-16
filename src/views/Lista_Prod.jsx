//HECHO POR ANDRES BEJAR 20230352

import React from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import productos from "../data/productos_B";
import "./tablas.css"
import Nav from "../components/Barra_nav";
import { Navigate, useNavigate } from "react-router-dom";
 

function Lista_Prod() {

    const navigate = useNavigate();

    const iraAgregProd = () => (
        navigate('/agregprod')
    )


    return(
        <div >
            <HeaderHome/>
            <NavBarHome/>
            <h2>Listado de productos</h2>
            <div class="CabeLista">
                <input  class="Busca" type="text" placeholder="Buscar un producto..."/>
                <div >
                    <button class="Botones">Buscar</button>
                    <button class="Botones">Categorias</button>
                    <button class="Botones" onClick={iraAgregProd}>Agregar producto</button>
                </div>
            </div>
            <div className="ListaProductos">
                <table class="TbProductos">
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
                        {productos.map((v)=>{
                            return(
                                <tr key={v.id}>
                                    <td><img src={v.imagen} alt="" /></td>
                                    <td class="ID"><b>#{v.id}</b></td>
                                    <td class="tdAdmin">{v.nombre}</td>
                                    <td class="tdAdmin">{v.presentacion}</td>
                                    <td class="tdAdmin">{v.descripcion}</td>
                                    <td class="tdAdmin"><b>{v.categoria}</b></td>
                                    <td class="tdAdmin">{v.stock}</td>
                                    <td class="tdAdmin"><button class="Acciones" onClick={()=> navigate(`/modprod/${v.id}`)}>✏️</button><button class="Acciones">🗑️</button></td>
                                    <hr />
                                </tr> 
                            )
                        })}
                    </tbody>
                </table>
            </div>
           
            <Nav/>
        </div>
    )
    
}

export default Lista_Prod;