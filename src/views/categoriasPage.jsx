import React from 'react';
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import CatSearch from '../components/catSearch';
import Footer from '../components/footer';


function CategoriasPage() {
  return (
      <div className="flex flex-col min-h-screen">
      <HeaderHome />
      <NavBarHome />

      <main className="flex-1">
        <CatSearch />
      </main>

      <Footer />
    </div>
     
  );
}

export default CategoriasPage;
