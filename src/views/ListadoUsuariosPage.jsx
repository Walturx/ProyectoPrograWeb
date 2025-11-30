import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import ListadoUsuarios from "../components/DashBoar/Front/Usuarios";

export default function ListadoUsuariosPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main>
        <ListadoUsuarios />
      </main>


    </div>
  );
}
