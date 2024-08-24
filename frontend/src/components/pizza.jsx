import { useEffect, useState } from 'react';

export default function Pizza() {
    const [pizza, setPizza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pizzas/p001`);
                if (!response.ok) {
                    throw new Error('Error al buscar pizza');
                }
                const data = await response.json();
                setPizza(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    },["p001"],);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <div className="mt-1 d-flex flex-direction-column text-center justify-content-center">
                <div className="col-md-6 mb-4">
                    <div className="p-2">
                    <h2>Pizza {pizza.name}</h2>
                        <img src={pizza.img} alt={pizza.name} className="card-img-top" />
                        <div>
                                <h6 className="text-center m-1 fs-2">
                                    {pizza.ingredients.join(' , ')}
                                    
                                </h6>
                               <p>{pizza.desc}</p> 
                                
                                <h6><strong>Precio: ${pizza.price}</strong></h6>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}