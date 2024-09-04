import React from 'react';
import Header from '../components/header';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { usePizza } from '../context/pizzacontext';
import { useCart } from '../context/cartcontext';

const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export default function Home() {
    const { pizzas, loading, error } = usePizza();
    const { addToCart } = useCart();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar menú, intente nuevamente más tarde.</div>;

    return (
        <div>
            <Header />
            <div className='d-flex bg-tertiary flex-wrap justify-content-center pizzacard'>
                {pizzas.map(pizza => (
                    <Card key={pizza.id} className='bg-white col-12 col-md-4 col-lg-3 m-2 pb-1'>
                        <Card.Img className='p-1' variant="top" src={pizza.img} />
                        <Card.Body>
                            <Card.Title><h3 className='text-nowrap text-center'>Pizza {capitalizeFirstLetter(pizza.name)}</h3></Card.Title>
                            <Card.Text>
                                <h5 className='text-secondary mb-2 text-center'>Ingredientes:</h5>
                                <ul className='text-center'>
                                    {pizza.ingredients.map((ingredient, index) => (
                                        <li key={index}>🍕{ingredient}🍕</li>
                                    ))}
                                </ul>
                                <p><strong>Precio: ${pizza.price}</strong></p>
                            </Card.Text>
                            <div className='d-flex justify-content-evenly'>
                                <Button variant="light">Ver más 👀</Button>
                                <Button variant="dark" onClick={() => addToCart(pizza)}  >Añadir 🛒</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
