//Codigo hecho por Walter Melendez 20231805

import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../context/CarritoContexto";
import { getProductoById, getProductos, getCategorias } from "./services/api";

function ProductoDetalle() {
  const { id } = useParams();
  const { agregarProducto } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        // Cargar el producto principal
        const dataProducto = await getProductoById(id);
        setProducto(dataProducto);

        // Cargar categorías
        const dataCategorias = await getCategorias();
        setCategorias(dataCategorias);

        // Cargar todos los productos y filtrar similares
        const todos = await getProductos();

        // Normalizar idCategoria -> idcategoria si es necesario
        const todosNormalizados = todos.map(p => ({
          ...p,
          idcategoria: p.idcategoria || p.idCategoria
        }));

        // Filtrar productos de la misma categoría, excluyendo el actual
        const categoriaProducto = dataProducto.idcategoria || dataProducto.idCategoria;
        const filtrados = todosNormalizados.filter(
          p => (p.idcategoria === categoriaProducto || p.idCategoria === categoriaProducto) &&
            p.id !== parseInt(id)
        );

        setSimilares(filtrados.slice(0, 4)); // Limitar a 4 productos similares
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  // Manejar agregar al carrito en productos similares sin navegar
  const handleAgregarSimilar = (e, productoSimilar) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation();
    agregarProducto(productoSimilar);
  };

  if (loading) return <p className="p-10 text-xl">Cargando producto...</p>;
  if (!producto) return <p className="p-10">Producto no encontrado</p>;

  // Obtener nombre de categoría
  const categoriaProducto = producto.idcategoria || producto.idCategoria;
  const categoriaNombre = categorias.find(c => c.id === categoriaProducto)?.categoria || "";

  return (
    <div className="p-10 justify-center items-center flex flex-col mb-20">
      <h1 className="text-[22px] font-bold mb-4 w-full ml-10">
        {`${categoriaNombre} > ${producto.nombre}`}
      </h1>

      <div className="flex items-center rounded-lg border-blue-500 w-250 h-110 p-6 bg-white shadow-md">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-70 h-90 mb-4"
        />
        <div className="p-10">
          <h2 className="text-[30px] font-bold mb-2">{producto.nombre}</h2>
          <p className="text-gray-600 text-[20px] mt-7">{producto.descripcion}</p>
          <div className="flex items-center space-x-20">
            <p className="mt-20 text-green-500 text-xl font-semibold">
              S/{Number(producto.precio).toFixed(2)}
            </p>
            <button
              onClick={() => agregarProducto(producto)}
              className="mt-20 flex items-center bg-green-600 text-white rounded-md hover:bg-green-700 transition px-4 py-2"
            >
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
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
        <div className="mt-10 w-full">
          <h3 className="text-[22px] font-bold mb-4 text-gray-800 mt-7">
            Productos similares
          </h3>
          <div className="flex flex-wrap gap-6 mt-6 justify-start">
            {similares.map((p) => (
              <Link
                key={p.id}
                to={`/producto/${p.id}`}
                className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer no-underline"
              >
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">
                      {p.nombre}
                    </h4>
                    <p className="text-green-700 font-semibold text-xl">
                      S/{Number(p.precio).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleAgregarSimilar(e, p)}
                    className="mt-4 w-full flex items-center justify-center bg-green-600 text-white rounded-md hover:bg-green-700 transition px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Agregar
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
