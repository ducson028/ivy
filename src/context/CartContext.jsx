import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load dữ liệu giỏ hàng từ localStorage khi ứng dụng được tải
  useEffect(() => {
    try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(Array.isArray(storedCart) ? storedCart : []);
    } catch (error) {
        console.error("Lỗi khi parse dữ liệu từ localStorage:", error);
        setCartItems([]);
    }
}, []);


// Lưu giỏ hàng vào localStorage khi `cartItems` thay đổi
useEffect(() => {
  try {
    console.log("Dữ liệu giỏ hàng trước khi lưu:", cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
      console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
  }
}, [cartItems]);

  
  const addToCart = (product) => {
    setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
            (item) => item.id === product.id && item.sizeWorn === product.sizeWorn
        );
        if (existingItemIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + product.quantity,
            }
            return updatedItems;
        } else {
            return [...prevItems, product];
        }
    });
};

const updateQuantity = (id, sizeWorn, newQuantity) => {
  setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
          item.id === id && item.sizeWorn === sizeWorn
              ? { ...item, quantity: newQuantity }
              : item
      )
  );
};


  const removeFromCart = (id, sizeWorn) => {
    setCartItems((prevItems) => 
      prevItems.filter(
        item => item.id !== id && item.sizeWorn !== sizeWorn));
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
