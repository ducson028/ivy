import { authApi, provinceAPI } from "./authApi";


// Các API authentication
export const register = async (formData) => {
  try {
    const response = await authApi.post('/register', formData);
    return response; // No need for extra checks
  } catch (error) {
    console.error('Lỗi khi đăng ký: ', error.response?.data || error.message);
    throw error.response?.data || error; // Provide more useful error information
  }
};


// export const login = (userData) => API.post('/login', userData);

export const updateUser = async (id, user) => {
  try {
    const response = await authApi.put(`/register/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng: ', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const verifyPassword = async ({ id, password }) => {
  try {
    const response = await authApi.post('/verifyPassword', { id, password });
    return response.data; // Return true/false from the API
  } catch (error) {
    console.error('Lỗi xác nhận mật khẩu: ', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};



// API liên quan đến danh sách địa chỉ

// Hàm lấy danh sách tỉnh/thành phố
export const getProvinces = async () => {
  try {
    const { data } = await provinceAPI.get('/p/');
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
    throw error;
  }
};

// Hàm lấy danh sách quận/huyện theo tỉnh
export const getDistricts = async (provinceCode) => {
  try {
    const { data } = await provinceAPI.get(`/p/${provinceCode}?depth=2`);
    return data.districts || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
    throw error;
  }
};

// Hàm lấy danh sách phường/xã theo quận
export const getWards = async (districtCode) => {
  try {
    const { data } = await provinceAPI.get(`/d/${districtCode}?depth=2`);
    return data.wards || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phường/xã:', error);
    throw error;
  }
};
