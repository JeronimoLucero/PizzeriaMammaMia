import React from 'react';
import {useCart} from '../context/cartcontext'
import { useUser } from '../context/usercontext';



export default function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice, handleCheckout, handleQuantityChange } = useCart();
    const { isAuthenticated } = useUser();
    
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

   


    return (
        <div className="container card p-1 mt-4">
            <h2>Tu carrito</h2>
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
                                    className= "btn btn-dark mx-2"
                                >
                                    Añadir Pizza
                                </button>
                                <button 
                                    onClick={() => handleQuantityChange(item.id)} 
                                    className= "btn btn-dark mx-2"
                                >
                                    {item.quantity > 1 ? 'Quitar Pizza' : 'Remover'}
                                </button>
                               
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total:{calculateTotalPrice()}</h3>
                        
                        <button onClick={handleCheckout} className={isAuthenticated ? ("btn btn-dark") : ("btn btn-dark disabled")}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
