import Usuarios  from "./Usuarios"

function Todos_Usuarios(){
return(    
    <div className="container">
        <header>
            <h1>Listado de usuarios</h1>
            <div className="search-container">
                <button>Buscar</button>
            </div>
        </header>
        <section>
            <Usuarios mostrar='todos'/>
        </section>
        <div className="pagination">
            <button className="prev">◀</button>
            <span>1</span>
            <button className="next">▶</button>
        </div>
    </div>
)}

export default Todos_Usuarios;