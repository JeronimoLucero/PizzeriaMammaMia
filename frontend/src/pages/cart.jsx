import React, { useState } from 'react';
import { useCart } from '../context/cartcontext';
import { useUser } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, increaseQuantity, decreaseQuantity, calculateTotalPrice, handleQuantityChange, clearCart, } = useCart();
    const { token } = useUser();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const handleCheckout = async () => {
        if (!token) return;

        setLoading(true);
        setMessage(""); 

        try {
            const response = await fetch("http://localhost:5000/api/checkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cart }),
            });

            if (!response.ok) {
                throw new Error('Error en el checkout. Intente nuevamente.');
            }

            const data = await response.json();
            alert('Checkout exitoso. ¡Gracias por tu compra!');
            navigate('/');
            clearCart();

        } catch (error) {
            console.error(error.message);
            setMessage(error.message); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container card p-1 mt-4">
            <h2>Tu carrito</h2>
            {message && <p>{message}</p>}
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li className="text-dark my-1" key={item.id}>
                                <img className='mx-2' src={item.img} alt={item.name} style={{ width: '10%' }} />
                                <span className='text-dark'>{item.name}</span>
                                <span className='text-dark'> - {formatter.format(item.price)}</span>
                                <span className='text-dark'> (Cantidad: {item.quantity})</span>
                                <button 
                                    onClick={() => increaseQuantity(item.id)} 
                                    className="btn btn-dark mx-2"
                                >
                                    Añadir Pizza
                                </button>
                                <button 
                                    onClick={() => handleQuantityChange(item.id)} 
                                    className="btn btn-dark mx-2"
                                >
                                    {item.quantity > 1 ? 'Quitar Pizza' : 'Remover'}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: {formatter.format(calculateTotalPrice())}</h3>
                        <button 
                            onClick={handleCheckout} 
                            className={`btn btn-dark ${loading || !token ? 'disabled' : ''}`}
                            disabled={loading || !token} 
                        >
                            {loading ? 'Procesando...' : 'Checkout'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
