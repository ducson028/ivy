import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
            (item) => item.id === product.id && item.sizeWorn === product.sizeWorn
        );
        if (existingItemIndex > -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += product.quantity;
            return updatedItems;
        } else {
            return [...prevItems, product];
        }
    });
};

  const updateQuantity = (id, size, newQuantity) => {
  setCartItems(prevItems => {
      return prevItems.map(item =>
          item.id === id && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
      );
  });
};

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
