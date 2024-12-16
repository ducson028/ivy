import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Lấy giỏ hàng từ backend
  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      dispatch({ type: "SET_CART", payload: response.data });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    try {
      const response = await axios.post('/api/cart', product);
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
