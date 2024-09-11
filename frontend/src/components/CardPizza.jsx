import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { usePizza } from '../context/pizzacontext';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const CardPizza = () => {
    const { pizzas, loading, error } = usePizza();
    const { addToCart } = useCart();

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/pizza/${id}`)
    }

    
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar menú, intente nuevamente más tarde.</div>;
  return (
    
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
                                <Button variant="light" onClick={() => handleNavigate(pizza.id)}>Ver más 👀</Button>
                                <Button variant="dark" onClick={() => addToCart(pizza)}  >Añadir 🛒</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
    
  )
};
