//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";

function Nav() {

    const[pagina, setPagina] = useState(1);
    const total = 10;

    const primera =() =>{
        if(pagina>1){
            setPagina(pagina-1);
        }
    }

    const sgte = () => {
        if(pagina<total){
            setPagina(pagina+1)
        }
    }

    return(
        <nav>
            <button onClick={primera} disabled={pagina === 1 }> &lt; </button>
            <button onClick={sgte} disabled={pagina===total} > &gt; </button>
        </nav>
    )
}

export default Nav;