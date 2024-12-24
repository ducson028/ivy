import axios from 'axios';

// Khởi tạo axios với URL cơ bản
export const authApi = axios.create({
  baseURL: 'https://67626aab46efb37323747eb2.mockapi.io/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const provinceAPI = axios.create({
  baseURL: 'https://provinces.open-api.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});