import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useCart } from "../context/CartContext";
import Cart from "../components/carts/Cart";

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    // Kiểm tra xem người dùng có đăng nhập không (kiểm tra localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  
  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');

    setIsLoggedIn(false);
    setIsOpen(false); // Đóng menu sau khi logout
    navigate('/login'); // Chuyển hướng về trang đăng nhập
    window.confirm('Bạn có chắn chắn đăng xuất không ?')
  };
 
  const handleLoginRedirect = () => {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu) => {
    // Nếu menu đã mở, đóng lại. Nếu không, mở menu tương ứng
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const menuItems = [
    {
      title: "NAM",
      subItems: [
        { category: "ÁO", items: ["Áo sơ mi", "Áo phông", "Áo khoác"] },
        { category: "QUẦN", items: ["Quần jeans", "Quần tây", "Quần short"] },
      ],
    },
    {
      title: "NỮ",
      subItems: [
        { category: "ÁO", items: ["Áo sơ mi", "Áo kiểu", "Áo khoác"] },
        { category: "CHÂN VÁY", items: ["Váy xòe", "Váy ôm", "Váy midi"] },
        { category: "ĐẦM", items: ["Đầm maxi", "Đầm công sở", "Đầm dự tiệc"] },
      ],
    },
    {
      title: "TRẺ EM",
      subItems: [
        { category: "ÁO", items: ["Áo thun", "Áo sơ mi", "Áo khoác"] },
        { category: "QUẦN", items: ["Quần short", "Quần dài", "Quần yếm"] },
      ],
    },
    {
      title: "SALE",
      subItems: [{ category: "Tất cả sản phẩm", items: ["Giảm giá 50%", "Giảm giá 30%"] }],
    },
    {
      title: "BỘ SƯU TẬP",
      subItems: [{ category: "Mùa xuân", items: ["BST Xuân 2024", "BST Xuân 2023"] }],
    },
    {
      title: "VỀ CHÚNG TÔI",
      subItems: [{ category: "Thông tin", items: ["Lịch sử", "Đội ngũ"] }],
    },
  ];
  

  return (
    <div className="p-2 pl-[100px] pr-[75px] flex justify-between items-center fixed top-0 left-0 w-full z-[9999] bg-white border-b-[1px]">
      <div className="flex items-center gap-[20px]">
      {menuItems.map((item) => (
  <div key={item.title} className=" relative font-bold">
    <button onClick={() => handleMenuClick(item.title)}>
      {item.title}
    </button>
    {activeMenu === item.title && (
      <ul className="absolute left-0 mt-[17px] w-[180px] bg-white border-[1px]">
        {item.subItems.map((sub, subIndex) => (
          <li key={subIndex} className="p-2">
            <span className="font-semibold block">{sub.category}</span>
            <ul className="ml-4 mt-1">
              {sub.items.map((subItem, index) => (
                <li key={index} className="p-1 hover:bg-gray-200 cursor-pointer">
                  {subItem}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )}
  </div>
))}


      </div>
      <button onClick={() => {
          navigate('/')
        }}>
          <img
            src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
            alt="Ivy Moda Logo"
            className="h-10"
          />
        </button>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="TÌM KIẾM SẢN PHẨM"
          className="border rounded-lg w-[250px] p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#ddd]"
        />
        <button className="px-2 "
        >
          <FaSearch />
        </button>
        <div className="relative">
        <button className="px-2"
        onClick={toggleMenu}
        >
          <FaUser />
        </button>
        {isOpen && (
        <ul className="absolute top-10 left-0 w-40 bg-white shadow-md rounded-lg z-10">
          {isLoggedIn ? (
            <>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Tài khoản của tôi
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <li
              onClick={handleLoginRedirect}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Đăng nhập
            </li>
          )}
        </ul>
      )}
          </div>
        <button 
        onClick={toggleCart}
        className="px-2">
          <FaShoppingCart />   
          <span className="absolute top-[10px] right-[67px] bg-gray-800 text-white text-xs rounded-full px-1">
            {totalQuantity}           
          </span>
        </button>
        {isCartOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
      </div>
    </div>
  );
};

export default Header;
