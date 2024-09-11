import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useCart } from '../context/cartcontext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';



export default function Pizza() {
    const { id } = useParams();

    const [pizza, setPizza] = useState()
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleFetch = (id) => {
        fetch(`http://localhost:5000/api/pizzas/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error en API');
                }
                return res.json();
            })
            .then((json) => setPizza(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoaded(true))


    };

    useEffect(() => {
        handleFetch(id);
    }, [id]);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!loaded) {
        return <h2>Loading...</h2>;
    }

    if (!pizza) {
        return <h2>Pizza not found</h2>;
    }


    return (
        <>
        <Container fluid className='d-flex justify-content-center'>
        <Card className='bg-white col-12 col-md-4 col-lg-3 m-2 pb-1'>
                <Card.Img className='p-1' variant="top" src={pizza.img} />
                <Card.Body>
                    <Card.Title><h3 className='text-nowrap text-center'>Pizza {capitalizeFirstLetter(pizza.name)}</h3></Card.Title>
                    <Card.Text>
                        <h5 className='text-secondary mb-2 text-center'>Ingredientes:</h5>
                        <p>{pizza.ingredients.join(', ')}</p>
    
                       
                        <p><strong>Precio: ${pizza.price}</strong></p>
                    </Card.Text>
                    <Card.Text><p>{pizza.desc}</p></Card.Text>
                    <div className='d-flex justify-content-evenly'>

                        <Button variant="dark" onClick={() => addToCart(pizza)}  >Añadir 🛒</Button>
                    </div>
                    <p className='mt-3'><Link to='/'>home 🍕</Link></p>
                    
                </Card.Body>
            </Card>

        </Container>
      



        </>

    );
}