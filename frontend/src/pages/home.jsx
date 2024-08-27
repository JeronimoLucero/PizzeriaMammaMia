import { useState, useEffect } from 'react';
import Header from '../components/header';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Home() {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pizzas");
                if (!response.ok) {
                    throw new Error('Error en API');
                }
                const data = await response.json();
                setPizzas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <div className='d-flex bg-tertiary flex-wrap justify-content-center pizzacard'>
                {pizzas.map(pizza => (
                    <Card key={pizza.id} className='bg-white col-12 col-md-4 col-lg-3 m-2'>
                        <Card.Img className='p-1' variant="top" src={pizza.img} />
                        <Card.Body>
                            <Card.Title><h3>Pizza {pizza.name}</h3></Card.Title>
                            <Card.Text>
                                <h5 className='text-secondary mb-2'>Ingredientes:</h5>
                                <ul className='text-center'>
                                    {pizza.ingredients.map((ingredient, index) => (
                                        <li key={index}>🍕{ingredient}🍕</li>
                                    ))}
                                </ul>
                                <p><strong>Precio: ${pizza.price}</strong></p>
                            </Card.Text>
                            <div className='d-flex justify-content-evenly'>
                                <Button variant="light">Ver más 👀</Button>
                                <Button variant="dark">Añadir 🛒</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
