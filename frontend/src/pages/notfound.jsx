import React from 'react'
import { Link } from 'react-router-dom' 
import errorimg from '/404img.png'

export default function NotFound() {
  return (
    <div className="m-2">
        <div className="d-flex p-4 flex-column align-middle">
            <div>
            <img src={errorimg} alt="error 404"></img>
            </div>
        
        <h2>404 - No encontrado</h2>
        <p>Pagina no encontrada</p>

        <Link to="/" className="text-dark"> Volver a Pagina Principal </Link>

        </div>
       


    </div>
  )
}
