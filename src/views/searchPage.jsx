import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Footer from '../components/footer';
import Results from '../components/Results'
import { useParams } from "react-router-dom";

function SearchPage() {
    const { busqueda } = useParams();
    console.log({ busqueda })
    return (
        <div>
            <HeaderHome />
            <NavBarHome />
            <Results busqueda={busqueda} />
            <Footer />
        </div>

    );
}
export default SearchPage;