import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import ListadoCategorias from "../components/ListadoCategorias/ListadoCategorias";

export default function ListadoCategoriasPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main>
        <ListadoCategorias />
      </main>


    </div>
  );
}
