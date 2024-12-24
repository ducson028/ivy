// CartItem.jsx

import PropTypes from "prop-types";

const CartItem = ({ item, quantity, onQuantityChange }) => {
    return (
        <div className="flex items-center border-b pb-4 mb-4">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-28 rounded" />
            <div className="ml-4 flex-1 text-[12px]">
                <div className="text-gray-400 italic">
                    <p className="pb-2">{item.name}</p>
                    <span>Màu sắc: {item.color}</span>
                    <span className="pl-7">Size: {item.sizeWorn}</span>
                </div>
                <div className="my-4 flex">
                    <button
                        onClick={() => onQuantityChange(item.id, item.sizeWorn, quantity - 1)}
                        className="w-5 h-5 bg-gray-200 rounded-tl-lg"
                    >
                        -
                    </button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-5 h-5 text-center border-t border-b"
                    />
                    <button
                        onClick={() => onQuantityChange(item.id, item.sizeWorn, quantity + 1)}
                        className="w-5 h-5 bg-gray-200 rounded-br-lg"
                    >
                        +
                    </button>
                    <span className="text-red-500 font-bold pl-6">{item.originalPrice}đ</span>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        sizeWorn: PropTypes.string.isRequired,
        originalPrice: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
};

export default CartItem;
