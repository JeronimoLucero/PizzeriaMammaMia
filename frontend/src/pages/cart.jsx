import React, { useState } from 'react';
import { pizzaCart } from '../assets/js/pizzas.js';

export default function Cart() {
    // Initialize cart with quantity property
    const [cart, setCart] = useState(
        pizzaCart.map(item => ({ ...item, quantity: 1 })) // Default quantity to 1
    );

    // Remove item from cart
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Increase quantity of an item
    const increaseQuantity = (id) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Decrease quantity of an item
    const decreaseQuantity = (id) => {
        setCart(cart.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Handle quantity change: toggle between increase and remove
    const handleQuantityChange = (id) => {
        const item = cart.find(item => item.id === id);
        if (item.quantity > 1) {
            decreaseQuantity(id);
        } else {
            removeFromCart(id);
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Handle checkout
    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Example redirect: window.location.href = '/checkout';
    };

    return (
        <div className="cart-container">
            <h2>Tu carrito</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
                                <span>{item.name}</span>
                                <span> - ${item.price.toFixed(2)}</span>
                                <span> (Cantidad: {item.quantity})</span>
                                <button 
                                    onClick={() => increaseQuantity(item.id)} 
                                    style={{ marginLeft: '10px' }}
                                >
                                    Añadir Pizza
                                </button>
                                <button 
                                    onClick={() => handleQuantityChange(item.id)} 
                                    style={{ marginLeft: '10px' }}
                                >
                                    {item.quantity > 1 ? 'Quitar Pizza' : 'Remover'}
                                </button>
                               
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total Price: ${calculateTotalPrice()}</h3>
                        <button onClick={handleCheckout} className="checkout-button">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
