//HECHO POR ANDRES BEJAR 20230352

import React from "react";
import Form from "../components/Form_prod"
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';

function AgregProd() {
    
    return(
        <>
            <HeaderHome/>
            <NavBarHome/>
            <h2>Agregar Producto</h2>
            <Form/>
        </>
    )
}

export default AgregProd;