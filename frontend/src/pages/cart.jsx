import React from 'react';
import {useCart} from '../context/cartcontext'


export default function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice, handleCheckout } = useCart();


   
    const handleQuantityChange = (id) => {
        const item = cart.find(item => item.id === id);
        if (item.quantity > 1) {
            decreaseQuantity(id);
        } else {
            removeFromCart(id);
        }
    };

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
                                <span className='text-dark'> - ${item.price.toFixed(2)}</span>
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
                        <button onClick={handleCheckout} className="btn btn-dark">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
