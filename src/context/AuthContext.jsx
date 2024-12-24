import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Tạo Context
const AuthContext = createContext();

// Tạo Provider để bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Lấy thông tin người dùng từ localStorage nếu có
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuth, setIsAuth] = useState(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const savedAuth = localStorage.getItem('isAuth');
    return savedAuth === 'true'; // Chuyển đổi giá trị chuỗi sang boolean
  });

  // Hàm login: lưu thông tin người dùng và cập nhật trạng thái đăng nhập
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Lưu thông tin người dùng
    localStorage.setItem('isAuth', 'true'); // Lưu trạng thái đăng nhập
    setUser(userData); // Cập nhật user trong Context
    setIsAuth(true); // Cập nhật trạng thái trong Context
  };

  // Hàm logout: xóa thông tin người dùng và cập nhật trạng thái đăng xuất
  const logout = () => {
    localStorage.removeItem('user'); // Xóa thông tin người dùng
    localStorage.setItem('isAuth', 'false'); // Lưu trạng thái đăng xuất
    setUser(null); // Cập nhật user trong Context
    setIsAuth(false); // Cập nhật trạng thái trong Context
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Định nghĩa kiểu dữ liệu cho children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
