import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import DetallesOrdenes from "../components/DashBoar/Front/Detalles_Ordenes";

export default function DetallesOrdenesAdminPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main>
        <DetallesOrdenes/>
      </main>


    </div>
  );
}