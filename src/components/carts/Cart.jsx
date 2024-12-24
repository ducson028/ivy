import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import useCartLogic from "./useCartLogic";
import CartItem from "./CartItems";

const Cart = ({ isOpen, toggleCart }) => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const { quantities, handleQuantityChange, totalPrice } = useCartLogic(
        cartItems,
        updateQuantity,
        removeFromCart
    );

    return (
        <>
            {isOpen && <div onClick={toggleCart} className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>}
            <div className={`fixed right-0 top-0 w-80 bg-white h-full shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-20`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">Giỏ hàng</h2>
                    <button onClick={toggleCart} className="text-2xl">&times;</button>
                </div>

                <div className="p-4 h-[calc(100%-160px)] overflow-y-auto">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                quantity={quantities[item.id] || item.quantity}
                                onQuantityChange={handleQuantityChange}
                                onRemove={removeFromCart}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Giỏ hàng trống.</p>
                    )}
                </div>

                <div className="absolute bottom-0 w-full p-4 bg-white shadow-inner">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">Tổng cộng:</span>
                        <span className="font-bold text-lg">{totalPrice.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <button className="w-full bg-black text-white py-2 font-bold hover:bg-gray-800"
                    onClick={() => navigate('/cart')}
                    >XEM GIỎ HÀNG</button>
                </div>
            </div>
        </>
    );
};

Cart.propTypes = {
    isOpen: PropTypes.bool,
    toggleCart: PropTypes.func,
}
export default Cart;
