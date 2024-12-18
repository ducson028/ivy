import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://67626aab46efb37323747eb2.mockapi.io/auth',
    headers: {
    'Content-Type': 'application/json',
    }
 });

export const register = (userData) => API.post('/register', userData);
// export const login = (userData) => API.post('/login', userData);
