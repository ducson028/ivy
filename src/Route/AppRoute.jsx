import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import Product from '../components/Product';
import ShoppingCart from '../components/carts/ShoppingCart';



const AppRoute = () => {
  return (
    <Routes>
        <Route  path='/login' element={<Login />}/>
        <Route  path='/register' element={<Register />}/>
      
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart/" element={<ShoppingCart />} />
        
    </Routes>

  )
}

export default AppRoute