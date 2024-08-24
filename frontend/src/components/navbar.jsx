import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faLock, faLockOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const total = 25000;
const Token = false;

export default function navbar() {
    return (
        <Navbar bg="dark" className='p-1' >

            <Nav className='d-flex'>
                <div className="d-flex justify-content-between">

                    <div>
                    <Navbar.Brand href="#home">
                        <Button variant="outline-light">Pizzería Mamma mia!🍕</Button>
                    </Navbar.Brand>
                    
                    <Button variant="outline-light" className='me-1'>
                        <FontAwesomeIcon icon={faPizzaSlice} /> Home
                    </Button>
                    
                    <Button variant="outline-light" className='me-1'>
                        <FontAwesomeIcon icon={Token ? faLockOpen : faLock} />
                        {Token ? " logout" : " login"}
                    </Button>
                    
                    <Button variant="outline-light" className='me-1'>
                        <FontAwesomeIcon icon={Token ? faLockOpen : faLock} />
                        {Token ? " profile" : " register"}
                    </Button>
                    </div>
            
                    <div>
                    <Button variant="primary" className=''>
                        <FontAwesomeIcon icon={faShoppingCart} /> Total: {total.toLocaleString()}
                    </Button>

                    </div>


                    






                </div>

            </Nav>

        </Navbar>
    );
}