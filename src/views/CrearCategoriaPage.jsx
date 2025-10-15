import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";

import CrearCategoria from "../components/CrearCategoria/CrearCategoria";

export default function CrearCategoriaPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main >
        <CrearCategoria /> 
      </main>

    </div>
  );
}
