import React from 'react'

export default function Profile() {
    return (
        <div>

            <div className="m-4">

                <h2>Tu perfil</h2>

                <form>
                    <label for="usermail">Mail usuario: </label>
                    <input type="text" name="usermail" value="pizzeriamammamia@pizzamail.pizza" />

                </form>

                
            <button className="btn btn-primary my-3"> Cerrar sesion </button>

            </div>



        </div>
    )
}
