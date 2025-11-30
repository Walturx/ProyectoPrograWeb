import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import TodasOrdenes from "../components/DashBoar/Front/Todas_Ordenes";

export default function TodasOrdenesAdminPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main>
        <TodasOrdenes/>
      </main>


    </div>
  );
}