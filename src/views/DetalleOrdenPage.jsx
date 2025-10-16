

import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import Footer from "../components/footer";
import DetalleOrden from "../components/DetalleOrden/DetalleOrden";

export default function DetalleOrdenPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderHome />
      <NavBarHome />

      <main className="flex-grow">
        <DetalleOrden />
      </main>

      <Footer />
    </div>
  );
}