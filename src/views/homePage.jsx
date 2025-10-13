import React from 'react';
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Carrusel from '../components/Carrusel';
import Categorias from '../components/Categorias';
import Productos from '../components/productos';
import Footer from '../components/footer';


function HomePage() {
  return (
    <div>
       <HeaderHome />
      <NavBarHome />
      <Carrusel />
      <Categorias />
      <Productos/>
      <Footer />
    </div>
     
  );
}

export default HomePage;
