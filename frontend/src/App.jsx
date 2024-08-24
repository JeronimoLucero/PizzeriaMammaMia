import { useState } from 'react'
import Navbarpizzeria from './components/navbar.jsx'
// import Home from './components/home.jsx'
// import Cart from './components/cart.jsx'
import Footer from './components/footer.jsx'
import Pizza from './components/pizza.jsx'
// import Registerpage from './components/registerpage.jsx'
// import LoginPage from './components/loginpage.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>

      <Navbarpizzeria></Navbarpizzeria>



      



      

    {/* <Home></Home> */}

    <Pizza></Pizza>


      

      



      <Footer></Footer>




    </>
  )
}

export default App
