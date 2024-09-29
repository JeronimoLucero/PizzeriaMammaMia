import { Link } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import { useUser } from '../context/usercontext';



export default function Navbar() {
    const { calculateTotalPrice } = useCart();
    const { token , logout } = useUser();
    const total = calculateTotalPrice();

    return (
        <nav className="navbar py-0 navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <div className="navbar-nav d-flex flex-row">
                    <Link to="/" className="navbar-brand text-white">🍕 Pizzeria Mamma mia!</Link>
                    <Link to={token ? "/profile" : "/register"} className="nav-link text-white">
                        {token ? "🙍‍♂️ perfil" : "🙍‍♂️ registrarse"}
                    </Link>
                    {token ? (
                        <button onClick={logout} className="nav-link text-white bg-transparent border-0">
                            🔐 Cerrar sesión
                        </button>
                    ) : (
                        <Link to="/login" className="nav-link text-white">
                            🔑 Iniciar sesión
                        </Link>
                    )}
                </div>
                <Link to="/cart" className="nav-link p-1 bg-primary text-white">
                    🛒 Total: {total}
                </Link>
            </div>
        </nav>
    );
}

