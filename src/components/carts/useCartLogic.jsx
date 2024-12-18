// useCartLogic.js
import { useState, useEffect } from "react";

const useCartLogic = (cartItems, updateQuantity, removeFromCart) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (cartItems) {
            const initialQuantities = cartItems.reduce((acc, item) => {
                acc[item.id] = item.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartItems]);

    const handleQuantityChange = (id, sizeWorn, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id, sizeWorn);
            return;
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: newQuantity,
        }));
        updateQuantity(id, sizeWorn, newQuantity);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) =>
            sum +
            ((parseFloat(item.originalPrice.replace(/\./g, "")) -
                parseFloat(item.price.replace(/\./g, ""))) *
                (quantities[item.id] || 1)),
        0
    );

    return { quantities, handleQuantityChange, totalPrice };
};

export default useCartLogic;
