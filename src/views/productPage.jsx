//Codigo hecho por Walter Melendez 20231805

import React from 'react';
import HeaderHome from '../components/HeaderHome';
import { productos } from "../data/productos";

import NavBarHome from '../components/navBarHome';
import ProductoDetalle from '../components/detalleProducto';
import Footer from '../components/footer';


function ProductPage() {
    return (
        <div>
            <HeaderHome />
            <NavBarHome />
            <ProductoDetalle />
            <Footer />
        </div>

    );
}

export default ProductPage;