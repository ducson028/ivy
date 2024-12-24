import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import {getDistricts, getProvinces, getWards} from '../userAxios/auth';

const Order = () => {
  const { isAuth, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  const { totalOriginalPrice, totalPrice} = location.state || {};

  // Lấy danh sách tỉnh/thành phố khi load trang
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
      }
    };
    fetchProvinces();
  }, []);
  
  // Lấy danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const data = await getDistricts(selectedProvince);
          setDistricts(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);
  
  // Lấy danh sách phường/xã khi chọn quận
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const data = await getWards(selectedDistrict);
          setWards(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // Hàm xử lý khi thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Reset lỗi khi người dùng nhập
  };

  // Hàm kiểm tra tính hợp lệ của thông tin
  const validateForm = () => {
    const { name, phone, city, district, ward, address } = formData;
    if (!name || !phone || !city || !district || !ward || !address) {
      setError("Vui lòng nhập đầy đủ thông tin địa chỉ.");
      return false;
    }
    return true;
  };

  const handleClearError = () => {
    setError(""); // Xóa lỗi
  };
  
  // Hàm xử lý khi nhấn nút "Hoàn thành"
  const handleCompleteOrder = () => {
    if (validateForm()) {
      // Tiếp tục xử lý đơn hàng, chẳng hạn điều hướng đến trang xác nhận
      navigate("/order-confirmation");
    }
  };
    return ( 
      <div className="px-6 text-[14px]">
        <div className="mt-[100px]">
                <div className="container mx-auto mb-8 flex justify-between items-center">
                  {[FaShoppingCart, FaLocationDot, FaMoneyCheckAlt].map((Icon, idx) => (
                    <React.Fragment key={idx}>
                      <Icon className="text-2xl text-gray-500 cursor-pointer hover:text-black" />
                      {idx < 2 && <div className="flex-grow h-[1px] bg-gray-300 mx-3" />}
                    </React.Fragment>
                  ))}
                </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section */}
            <div className=" p-4 rounded-lg lg:col-span-1">
            {isAuth ? (  
            <div className="mt-6">
                <h3 className="text-xl font-bold">Phương thức thanh toán</h3>
                <div className="mt-4 space-y-2 border border-gray-300 p-4 rounded-tl-2xl rounded-br-2xl">
                    <div className="flex justify-between items-center ">
                        <div className="flex font-bold">
                          <p>{user.lastname}</p>
                        </div>
                        <div className="flex">
                        <a className="mt-2 text-gray-500">Chọn địa chỉ khác</a>
                        <button className=" px-4 py-2 ml-2 border border-black bg-black text-white hover:bg-white hover:text-black rounded-tl-2xl rounded-br-2xl">
                            Mặc định
                        </button>
                        </div>
                    </div>
                    <p className="text-gray-500">Điện thoại:{user.phone} </p>
                    <p className="text-gray-500">Địa chỉ: {user.address} </p>
                </div>
                <button className="w-[40%] px-4 py-2 border border-black bg-black text-white hover:bg-white hover:text-black rounded-tl-2xl rounded-br-2xl mt-6">
                Thêm địa chỉ
                </button>
              </div>
            ) : (
              <div>
              <h2 className="text-2xl font-bold">Địa chỉ giao hàng</h2>
              <div className="flex gap-4 m-4">
                <button className="w-[30%] px-4 py-2  bg-white text-black border border-black hover:bg-black hover:text-white rounded-tl-2xl rounded-br-2xl">Đăng nhập</button>
                <button className="w-[30%]  px-4 py-2  bg-black text-white border border-black hover:bg-white hover:text-black rounded-tl-2xl rounded-br-2xl">Đăng ký</button>
              </div>
              <p className="text-gray-600 mt-2">
                <span onClick={()=> navigate('/login')}>Đăng nhập</span>
                /
                <span onClick={()=> navigate('/register')}>Đăng ký</span> tài khoản để được tích điểm và nhận thêm ưu đãi từ IVY moda.
              </p>
  
              {error && (
                <div className="flex justify-between mt-4 items-center bg-red-100 text-red-600 p-2 mb-4 rounded-md">
                  <p>{error}</p>
                  <button
                    className="font-bold text-lg text-red-600 hover:text-red-800"
                    onClick={handleClearError}
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full placeholder:text-black"
                  />
                  <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                    className="px-4 py-2 border border-gray-300 rounded-md w-full placeholder:text-black"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select 
                  onChange={(e) => {
                    handleInputChange(e);
                    setSelectedProvince(e.target.value);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full">
                    <option>Tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <select 
                  onChange={(e) => {
                    handleInputChange(e);
                    setSelectedDistrict(e.target.value);
                  }}
                  disabled={!districts.length}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full">
                    <option>Quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                   ))}
                  </select>
                </div>
                <select 
                onChange={handleInputChange}
                disabled={!wards.length}
                className="px-4 py-2 border border-gray-300 rounded-md w-full">
                    <option>Phường/xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                       {ward.name}
                      </option>
                    ))}
                  </select>
                <input
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Địa chỉ"
                  className="px-4 py-2 border border-gray-300 rounded-md w-full placeholder:text-black"
                />
              </div>
            </div>
            )}
  
              {/* Payment Methods */}
              <div className="mt-6">
                <h3 className="text-xl font-bold">Phương thức thanh toán</h3>
                <div className="mt-4 space-y-2 border border-gray-300 p-4 rounded-tl-2xl rounded-br-2xl">
                    <p className="text-gray-400">Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại.</p>
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" />
                    Thanh toán bằng thẻ tín dụng
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" />
                    Thanh toán bằng thẻ ATM
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" />
                    Thanh toán bằng Momo
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="mr-2" defaultChecked />
                    Thanh toán khi giao hàng
                  </label>
                </div>
                <button className="w-[40%] px-4 py-2 border border-black bg-black text-white hover:bg-white hover:text-black rounded-tl-2xl rounded-br-2xl mt-6">
                Hiển thị sản phẩm
              </button>
              </div>
            </div>

            <div className="p-4">
                 {/* Shipping Method */}
              <div className="mt-6">
                <h3 className="text-xl font-bold">Phương thức giao hàng</h3>
                <label className="flex items-center mt-2 p-4 border border-gray-300 rounded-tl-3xl rounded-br-3xl">
                  <input type="radio" name="shipping" className="mr-2" defaultChecked />
                  Chuyển phát nhanh
                </label>
              </div>
  
              {/* VAT Invoice */}
              <div className="mt-6">
                <h3 className="text-xl font-bold">Bạn có muốn nhận hóa đơn VAT không?</h3>
                <label className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" />
                  <span>Nhận hóa đơn VAT</span>
                </label>
              </div>
            </div>
  
            {/* Right Section */}
            <div className="p-4">
              <h3 className="text-xl font-bold">Tóm tắt đơn hàng</h3>
              <div className="mt-4 space-y-2">
                <p className="flex justify-between text-gray-400">
                  <span>Tổng tiền hàng</span>
                  <span>{totalOriginalPrice}</span>
                </p>
                <p className="flex justify-between text-gray-400">
                  <span>Tạm tính</span>
                  <span>{totalPrice}</span>
                </p>
                <p className="flex justify-between text-gray-400">
                  <span>Phí vận chuyển</span>
                  <span>{}0đ</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Tiền thanh toán</span>
                  <span>{totalPrice}</span>
                </p>
              </div>
  
              {/* Discount Code */}
              <div className="flex justify-between mt-6">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  className="w-[82%] px-4 py-2 border border-gray-300 rounded-md mb-2"
                />
                <button className="h-[40px] p-2 font-bold bg-white text-black border border-black hover:bg-black hover:text-white rounded-tl-2xl rounded-br-2xl">
                  Áp dụng
                </button>
              </div>
              <input 
                type="text"
                placeholder="Mã nhân viên hỗ trợ"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                >
              </input>
  
              <button
              onClick={handleCompleteOrder}
              className="w-full px-4 py-2 border border-black bg-black text-white hover:bg-white hover:text-black rounded-tl-2xl rounded-br-2xl mt-2">
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Order;
  