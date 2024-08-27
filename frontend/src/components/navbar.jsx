import React from 'react';
import { Link } from 'react-router-dom';


const total = 25000;
const Token = false;

export default function navbar() {
    return (
        <div>
            <nav class="navbar py-0 navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <div class="navbar-nav d-flex flex-row ">
                    <Link to="/" className="navbar-brand text-white">🍕Pizzeria Mamma mia!</Link>
                        <Link to={Token ? "/registerpage" : "/profile"} className="nav-link text-white">{Token ? "🙍‍♂️ Registrarse" : " 🙍‍♂️ Perfil"}</Link>
                        <Link to={Token ? "/loginpage" : "/logout"} className="nav-link text-white">{Token ? "🔑 Iniciar sesion" : "🔐 Cerrar sesion"}</Link>
                    </div>

                    <Link to="/cart" className="nav-link p-1 bg-primary text-white">🛒Total: {total.toLocaleString()}</Link>

                </div>
            </nav>
        </div>

    )
};