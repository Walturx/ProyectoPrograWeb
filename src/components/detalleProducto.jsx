import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";
import { useContext } from "react";
import { PriceContext } from "../data/priceState";
import { CarritoContext } from "../context/CarritoContexto";
function ProductoDetalle() {
  const { addPrice } = useContext(PriceContext);
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
    const { agregarProducto } = useContext(CarritoContext);

  if (!producto) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/" className="text-green-600 underline">
          Volver a productos
        </Link>
      </div>
    );
  }
  const similares = productos.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id
  );


  return (
    <div className=" p-10 justify-center items-center flex flex-col mb-20">
      <h1 className="text-[22px] font-bold mb-4 w-full ml-10  ">{`${producto.categoria} > ${producto.nombre}`}</h1>
      <div className="flex items-center rounded-lg border-blue-500 w-250 h-110 p-6  bg-white shadow-md">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-90 h-90 mb-4"
        />
        <div className="p-10 ">
          <h2 className="text-[30px] font-bold mb-2">{producto.nombre}</h2>
          <p className="text-gray-600 text-[20px] mt-7">{producto.descripcion}</p>
          <div className="flex items-center space-x-20">
            <p className="mt-20 text-green-500 text-xl font-semibold">S/{producto.precio}</p>
            <button
              onClick={() => {;
                agregarProducto(producto); 
              }}
              className=" mt-20  flex items-center bg-green-600 text-white rounded-md hover:bg-blue-100 transition px-4 py-2">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
                c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25
                5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Agregar al carrito
            </button>

          </div>

        </div>

      </div>
      <Link
        to="/"
        className="mt-10 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg shadow-md"
      >
        ← Volver al inicio
      </Link>
      {similares.length > 0 && (
        <div className="mt-10">
          <h3 className="text-[22px] font-bold mb-4 text-gray-800 mt-7">
            Productos similares
          </h3>
          <div className="flex flex-wrap gap-20 mt-6 h-70 ">
            {similares.map((p) => (

              <Link
                key={p.id}
                to={`/producto/${p.id}`}
                className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer no-underline "
              >
                <img src={p.imagen} alt={p.nombre} className="w-40 h-40 mx-auto object-cover " />
                <div className="p-3">
                  <h4 className="font-bold text-gray-800">{p.nombre}</h4>
                  <p className="text-green-700 font-semibold">S/{p.precio.toFixed(2)}</p>

                  <button
                    onClick={() => addPrice(producto.precio)}

                    className=" mt-5  flex items-center bg-green-600 text-white rounded-md hover:bg-blue-100 transition px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
                c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25
                5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Agregar al carrito
                  </button>
                </div>

              </Link>

            ))}
          </div>
        </div>
      )}
    </div>

  );
}

export default ProductoDetalle;
