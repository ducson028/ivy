import {useState, useEffect} from 'react';
import { register } from '../userAxios/auth';
import { getDistricts, getWards, getProvinces} from '../userAxios/auth';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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
  const [error, setError] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    const { firstname, lastname, email, phone, password, gender, province, district, ward, address } = formData;
    if (!firstname || !lastname || !email || !phone || !password || !gender || !province || !district || !ward || !address) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return false;
    }else if(formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return false;
    }
    
    return true;
  };
  
  const handleClearError = () => {
    setError(""); // Xóa lỗi
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleClearError();
    setFormData({ ...formData, [name]: value });
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setIsSubmitting(true);
    try {
      const response = await register(formData);
      if (response.status === 201 || response.status === 200) {
        setMessage('Đăng ký thành công!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Đăng ký không thành công, vui lòng thử lại.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Đã xảy ra lỗi');
    } finally {
      setIsSubmitting(false);
    }
  }
};

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

const handleChangeProvince = (e) => {
  const provinceCode = e.target.value;
  const provinceName = e.target.options[e.target.selectedIndex].text;
  setSelectedProvince(provinceCode);
  setFormData({ ...formData, province: provinceName, district: '', ward: '' });
};

const handleChangeDistrict = (e) => {
  const districtCode = e.target.value;
  const districtName = e.target.options[e.target.selectedIndex].text;
  setSelectedDistrict(districtCode);
  setFormData({ ...formData, district: districtName, ward: '' });
};

const handleChangeWard = (e) => {
  const wardName = e.target.options[e.target.selectedIndex].text;
  setFormData({ ...formData, ward: wardName });
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 md:p-16 shadow-lg w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">ĐĂNG KÝ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thông tin khách hàng */}
          
          <div>
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
                  <option value=''>--Chọn--</option>
                  <option value='Nữ'>Nữ</option>
                  <option value='Nam'>Nam</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <select 
                name="province"
                className="w-1/2 p-3 border border-gray-300 rounded"
                onChange={handleChangeProvince}>
                  <option value=''>Chọn Tỉnh/Tp</option>
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
                  <option value=''>Chọn Quận/Huyện</option>
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
              onChange={handleChangeWard}
              disabled={!wards.length}
              >
                <option value=''>Chọn Phường/Xã</option>
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
              <div className="mt-8 text-center">
          <button 
          className="w-full md:w-1/3 bg-black text-white py-3 rounded-tl-2xl rounded-br-2xl hover:bg-gray-800"
          onClick={handleSubmit}
          disabled={isSubmitting}
          >
            ĐĂNG KÝ
          </button>
          {message && <p className='text-green-500 text-center mt-4'>{message}</p>}
        </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
