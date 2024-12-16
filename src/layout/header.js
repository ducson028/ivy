import React, { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Xử lý tìm kiếm
  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/search', { query: searchQuery });
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="header-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Tìm kiếm sản phẩm"
        className="search-input"
      />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>
      <div className="cart-icon">
        <FaShoppingCart />
        <span>{totalQuantity}</span>
      </div>
    </div>
  );
};

export default Header;
