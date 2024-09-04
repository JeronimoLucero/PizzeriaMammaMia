import React from 'react';
import {usePizza} from '../context/pizzacontext'

export default function pizza() {
    const { pizzas, loading, error } = usePizza();
    const pizza = pizzas.find(pizza => pizza.id === pizzaId);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar menú, intente nuevamente más tarde.</div>;


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