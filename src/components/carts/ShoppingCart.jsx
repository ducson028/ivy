import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiWarningCircleLight } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCart } from "../../context/CartContext";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Khởi tạo số lượng từ cartItems
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (id, sizeWorn, newQuantity) => {
    if (newQuantity <= 0) return;
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    updateQuantity(id, sizeWorn, newQuantity);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.originalPrice.replace(/\./g, "")))
                             * (quantities[item.id] || 1), 0).toLocaleString("vi-VN");
    const totalPrice = cartItems.reduce((sum, item) => sum + ((parseFloat(item.originalPrice.replace(/\./g, "")))
                       - (parseFloat(item.price.replace(/\./g, "")))) * (quantities[item.id] || 1), 0).toLocaleString("vi-VN");
    const totalItems = cartItems.reduce((sum, item) => sum + (quantities[item.id] || 1), 0);

  return (
    <section className="cart pt-20">
      <ToastContainer />

      {/* Navigation Progress Bar */}
      <div className="container mx-auto mb-8 flex justify-between items-center">
        {[FaShoppingCart, FaLocationDot, FaMoneyCheckAlt].map((Icon, idx) => (
          <React.Fragment key={idx}>
            <Icon className="text-2xl text-gray-500 cursor-pointer hover:text-black" />
            {idx < 2 && <div className="flex-grow h-[1px] bg-gray-300 mx-3" />}
          </React.Fragment>
        ))}
      </div>

      {/* Cart Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 font-mono text-left">
                  <th className="border-b py-4">Sản phẩm</th>
                  <th className="border-b py-4">Chi tiết</th>
                  <th className="border-b py-4">Chiết khấu</th>
                  <th className="border-b py-4">Số lượng</th>
                  <th className="border-b py-4">Thành tiền</th>
                  <th className="border-b py-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b">
                      <img src={item.imageUrl} alt={item.name}
                       className="w-36 object-cover py-4" />
                    </td>
                    <td className="border-b text-gray-400 italic">
                      <p>{item.name}</p>
                      <p>Màu sắc: {item.color}</p>
                      <p>Size: {item.sizeWorn}</p>
                    </td>
                    <td className="border-b text-red-500">
                      -{" "}
                      {(
                        parseFloat(item.price.replace(/\./g, "")) *
                        (quantities[item.id] || 1)
                      ).toLocaleString("vi-VN")}
                      đ
                    </td>
                    <td className="border-b">
                      <div className="flex items-center">
                        <button onClick={() => handleQuantityChange(item.id, item.sizeWorn, (quantities[item.id] || 1) - 1)} 
                        className="px-4 py-2 bg-gray-200 rounded-tl-xl">
                          -
                        </button>
                        <input type="text" value={quantities[item.id] || 1} readOnly 
                        className="w-10 h-10 text-center border-t border-b" 
                        />

                        <button onClick={() => handleQuantityChange(item.id, item.sizeWorn, (quantities[item.id] || 1) + 1)} 
                        className="px-4 py-2 bg-gray-200 rounded-br-xl">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border-b font-bold">
                      {(
                        (parseFloat(item.originalPrice.replace(/\./g, "")) - parseFloat(item.price.replace(/\./g, ""))) *
                        (quantities[item.id] || 1)
                      ).toLocaleString("vi-VN")}
                      đ
                    </td>
                    <td className="border-b text-black">
                      <MdDelete className="text-2xl cursor-pointer" onClick={() => handleRemoveFromCart(item.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-500">Giỏ hàng của bạn đang trống.</p>
          )}
          <button onClick={() => navigate(-1)} className="mt-6 flex items-center border border-black py-2 px-4 rounded hover:bg-black hover:text-white">
            <IoIosArrowRoundBack className="mr-2 text-2xl" />
            Tiếp tục mua hàng
          </button>
        </div>

        {/* Right Content */}
        <div className="cart-content-right">
                    <table className="w-full  text-sm">
                        <thead>
                            <tr className="">
                                <th className=" text-[22px] px-4 py-2" colSpan={2}>Tổng tiền giỏ hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td className=" px-4 py-2 text-gray-500">Tổng sản phẩm</td>
                                <td className=" px-4 py-2 text-right">{totalItems}</td>
                            </tr>
                            <tr>
                                <td className=" px-4 py-2 text-gray-500">Tổng tiền hàng</td>
                                <td className=" px-4 py-2 text-right text-gray-500">{totalOriginalPrice} <sup>đ</sup></td>
                            </tr>
                            <tr>
                                <td className=" px-4 py-2 text-gray-500">Thành tiền</td>
                                <td className=" px-4 py-2 text-right font-bold">{totalPrice} <sup>đ</sup></td>
                            </tr>
                            <tr>
                                <td className=" px-4 py-2 text-gray-500">Tạm tính</td>
                                <td className=" px-4 py-2 text-right font-bold">{totalPrice} <sup>đ</sup></td>
                            </tr>
                        </tbody>
                    </table>

                    <p className=" flex justify-center text-red-700 text-sm mt-4 mr-2 ">
                        <PiWarningCircleLight className="text-[25px] ml-4 mr-2 " />   Sản phẩm nằm trong chương trình đồng giá, giảm giá trên 50% không hỗ trợ đổi trả.
                    </p>
                    <div className="flex-grow h-[1px] mt-4 bg-gray-300 mx-12"></div>
                    <div className="mt-5 flex justify-center">
                        <button className="w-[90%] bg-black text-white py-2 border border-black rounded-tl-2xl rounded-br-2xl hover:bg-white hover:text-black">
                            Đặt hàng
                        </button>
                    </div>
                </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
