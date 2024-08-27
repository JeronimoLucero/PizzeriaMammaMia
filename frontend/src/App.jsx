import { useState } from 'react'
import NavbarP from './components/navbar'
import Footer from './components/footer'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import RegisterPage from './pages/registerpage'
import LoginPage from './pages/loginpage'
import Cart from './pages/cart'
import Pizza from './pages/pizza'
import Profile from './pages/Profile'
import NotFound from './pages/notfound'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <NavbarP />


    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/pizza/p001" element={<Pizza />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="*" element={<NotFound />}></Route>




    </Routes>

    <Footer />

    </>
  )
};

export default App
