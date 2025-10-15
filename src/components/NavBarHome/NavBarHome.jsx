import './NavbarHome.css';

function Navbar() {
  return (
    <nav className="navegacion">
      <ul className="menu">
        <li><a href="#">Categorías</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Nosotros</a></li>
        <li className="ofertas"><a href="#">OFERTAS</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;