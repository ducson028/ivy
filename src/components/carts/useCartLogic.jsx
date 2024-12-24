import { useState, useEffect } from "react";

const useCartLogic = (cartItems, updateQuantity, removeFromCart) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (cartItems) {
            const initialQuantities = cartItems.reduce((acc, item) => {
                acc[`${item.id}-${item.sizeWorn}`] = item.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartItems]);

    const handleQuantityChange = (id, sizeWorn, newQuantity) => {
        const key = `${id}-${sizeWorn}`;
        if (newQuantity <= 0) {
            removeFromCart(id, sizeWorn);
            return;
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [key]: newQuantity,
        }));
        updateQuantity(id, sizeWorn, newQuantity);
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const key = `${item.id}-${item.sizeWorn}`;
        const quantity = quantities[key] || item.quantity;
        return (
            sum +
            parseFloat(item.price.replace(/\./g, "")) * quantity
        );
    }, 0).toLocaleString("vi-VN");

    const totalOriginalPrice = cartItems.reduce((sum, item) => {
        const key = `${item.id}-${item.sizeWorn}`;
        const quantity = quantities[key] || item.quantity;
        return (
            sum +
            parseFloat(item.originalPrice.replace(/\./g, "")) * quantity
        );
    }, 0).toLocaleString("vi-VN");

    const totalItems = cartItems.reduce((sum, item) => {
        const key = `${item.id}-${item.sizeWorn}`;
        return sum + (quantities[key] || item.quantity);
    }, 0);

    return { quantities, handleQuantityChange, totalPrice, totalOriginalPrice, totalItems };
};

export default useCartLogic;
