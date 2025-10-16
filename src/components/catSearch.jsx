


import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";
import { categorias } from "../data/categoria";
function CatSearch() {
    const { categoria } = useParams();
    const CatProd = productos.filter((p) => p.categoria === categoria);

    const cadList = categorias;


    return (
        <div className="flex-row items-left space-y-5 m-10">

            {CatProd.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-[22px] font-bold mb-4 text-gray-800 mt-7">
                        Categorías
                    </h3>

                    <div className="flex flex-row items-left space-y-5"
                    >
                        <div className="shadow-md h-[500]">


                            {cadList.map((c) => (
                                <section
                                    key={c.categoria}
                                    className={`px-3 py-1  whitespace-nowrap cursor-pointer w-70 mb-5 text-[22px] mt-5 ${c.categoria === categoria
                                        ? "bg-green-600 text-white"
                                        : "bg-white-200 text-gray-700"
                                        }`}
                                >
                                    <Link to={`/categorias/${c.categoria}`}>
                                        {c.categoria}</Link>
                                </section>
                            ))}

                        </div>


                        <div className="flex flex-wrap gap-20 mt-10  ml-15 ">
                            {CatProd.map((p) => (

                                <Link
                                    key={p.id}
                                    to={`/producto/${p.id}`}
                                    className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer no-underline h-80"
                                >

                                    <img src={p.imagen} alt={p.nombre} className="w-40 h-40 mx-auto object-cover " />
                                    <div className="p-3">
                                        <h4 className="font-bold text-gray-800">{p.nombre}</h4>
                                        <p className="text-green-700 font-semibold">S/{p.precio.toFixed(2)}</p>

                                        <button className=" mt-5  flex items-center bg-green-600 text-white rounded-md hover:bg-blue-100 transition px-4 py-2">
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
                </div>
            )

            }
        </div>

    )
}
export default CatSearch;