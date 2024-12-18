import {useState, useEffect} from 'react';
import axios from 'axios';
import { register } from '../userAxios/auth';

const Register = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    birthDate: '',
    address: '',
    province: '',
    district: '',
     ward: ''   
  })
  const [message, setMessage] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
        const [key, subKey] = name.split('.');
        setFormData({
            ...formData,
            [key]: { ...formData[key], [subKey]: value }
        });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await register(formData);
        setMessage('Đăng ký thành công!');
        console.log(response.data);
    } catch (error) {
        setMessage(error.response.data.message || 'Đã xảy ra lỗi');
    }
};

// Lấy danh sách tỉnh/thành phố khi load trang
useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const { data } = await axios.get('https://provinces.open-api.vn/api/p/');
      setProvinces(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
    }
  };
  fetchProvinces();
}, []);

// Lấy danh sách quận/huyện khi chọn tỉnh
useEffect(() => {
  if (selectedProvince) {
    const fetchDistricts = async () => {
      try {
        const { data } = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
        setDistricts(data.districts || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      }
    };
    fetchDistricts();
  } else {
    setDistricts([]);
    setWards([]);
  }
}, [selectedProvince]);

// Lấy danh sách phường/xã khi chọn quận
useEffect(() => {
  if (selectedDistrict) {
    const fetchWards = async () => {
      try {
        const { data } = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
        setWards(data.wards || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
      }
    };
    fetchWards();
  } else {
    setWards([]);
  }
}, [selectedDistrict]);

const handleChangeProvince = (e) => {
  setSelectedProvince(e.target.value);
};

const handleChangeDistrict = (e) => {
  setSelectedDistrict(e.target.value);
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 md:p-16 shadow-lg w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">ĐĂNG KÝ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thông tin khách hàng */}
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Thông tin khách hàng</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Họ..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Tên..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Điện thoại..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="date"
                  name="birthDate"
                  className="w-1/2 p-3 border border-gray-300 rounded"
                  onChange={handleChange}
                />
                <select 
                name="gender"
                className="w-1/2 p-3 border border-gray-300 rounded"
                onChange={handleChange}>
                  <option>Nữ</option>
                  <option>Nam</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <select 
                name="province"
                className="w-1/2 p-3 border border-gray-300 rounded"
                onChange={handleChangeProvince}>
                  <option>Chọn Tỉnh/Tp</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                </select>
                <select 
                name="district"
                className="w-1/2 p-3 border border-gray-300 rounded"
                onChange={handleChangeDistrict}
                disabled={!districts.length}
                >
                  <option>Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                   ))}
                </select>
              </div>
              <select 
              name="ward"
              className="w-full p-3 border border-gray-300 rounded"
              onChange={handleChange}
              disabled={!wards.length}
              >
                <option>Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                      {ward.name}
                  </option>
                  ))}
              </select>
              <textarea
                placeholder="Địa chỉ..."
                name="address"
                className="w-full p-3 border border-gray-300 rounded"
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Thông tin mật khẩu */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Thông tin mật khẩu</h3>
            <div className="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu..."
                className="w-full p-3 border border-gray-300 rounded"
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu..."
                className="w-full p-3 border border-gray-300 rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Mời nhập các ký tự trong hình vào ô sau..."
                className="w-full p-3 border border-gray-300 rounded"
              />
              <div className="flex items-center justify-start">
                <img src="" alt="captcha" className="h-12 mr-4" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                  Đồng ý với các <a href="#" className="text-red-500">điều khoản</a> của IVY
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">Đăng ký nhận bản tin</label>
              </div>
              
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button 
          className="w-full md:w-1/3 bg-black text-white py-3 rounded-tl-2xl rounded-br-2xl hover:bg-gray-800"
          onClick={handleSubmit}
          >
            ĐĂNG KÝ
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
