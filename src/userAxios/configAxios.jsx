import axios from 'axios';

// Cấu hình cơ bản của axios
export const axiosInstance = axios.create({
  baseURL: 'https://6758fae260576a194d12a2c3.mockapi.io/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor - Xử lý request trước khi gửi đi
axiosInstance.interceptors.request.use(
    (config) => {
      // Thêm token hoặc làm gì đó trước khi gửi request
      // Ví dụ: config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Interceptor - Xử lý response trước khi trả về
  axiosInstance.interceptors.response.use(
    (response) => {
      // Xử lý response nếu cần
      return response;
    },
    (error) => {
      // Xử lý lỗi (ví dụ: logout khi token hết hạn)
      if (error.response && error.response.status === 401) {
        // Xử lý khi không có quyền truy cập
        // Ví dụ: Redirect tới trang login
      }
      return Promise.reject(error);
    }
  );