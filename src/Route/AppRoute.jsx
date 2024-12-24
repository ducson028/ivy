
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import Product from '../components/Product';
import ShoppingCart from '../components/carts/ShoppingCart';
import Order from '../components/Order';
import UserProfile from '../components/info/UserProfile';



const AppRoute = () => {
  return (
    <Routes>
        <Route  path='/login' element={<Login />}/>
        <Route  path='/register' element={<Register />}/>
      
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart/" element={<ShoppingCart />} />
        <Route path="/dathang/" element={<Order />} />
        <Route path="/userprofile" element={<UserProfile />} />
    </Routes>

  )
}

export default AppRoute