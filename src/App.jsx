
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoute from "./Route/AppRoute";
import { CartProvider } from "./context/CartContext";

function App() {
  
  return (
    <>
      <Router>
        <CartProvider>
        <AppWithHeaderFooter />
        </CartProvider>
      </Router>
    </>
  );
}

function AppWithHeaderFooter() {
  const location = useLocation();
  const isLogin = location.pathname === '/login'; // Kiểm tra xem có phải trang đăng nhập không
  const isRegister = location.pathname === '/register';

  return (
    <div>
      {/* Chỉ render Header và Footer nếu không phải trang đăng nhập */}
      {!isLogin && !isRegister && <Header />}
      <AppRoute />
      {!isLogin && !isRegister && <Footer />}
    </div>
  );
}

export default App;