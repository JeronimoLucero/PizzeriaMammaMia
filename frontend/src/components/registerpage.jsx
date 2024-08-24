import React from 'react';
import {useState} from 'react'


const Formulario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email.toLowerCase())
  };

  const handleSubmit = (e)=> {
    e.preventDefault()

    if (!validateEmail(email)) {
      alert('Por favor, Ingrese un email valido')
      return
    }
    if(password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if(password !== confirmPassword){
      alert('Las contraseñas no coinciden')
      return
    }
    
    alert('Formulario llenado con exito')
  }


  return(

    <>

    <h2>Register</h2>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
        type="email"
        id="email"
         value ={email}
        onChange={(e)=>setEmail(e.target.value)}
        required>
        </input>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
        type="password"
        id="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        required>
        </input>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
        type="password"
        id="confirmPassword"
         value={confirmPassword}
         onChange={(e)=>setConfirmPassword(e.target.value)}
        required>
        </input>
      </div>
      <button type="submit">Enviar</button>


      
    </form>






    </>


  )
  
};

export default Formulario
