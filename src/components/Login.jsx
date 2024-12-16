import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-8 md:p-16 shadow-lg w-full max-w-7xl">
        {/* Phần Đăng Nhập */}
        <div className="md:w-1/2 border-b md:border-b-0 md:border-r md:pr-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Bạn đã có tài khoản IVY</h2>
          <p className="text-gray-600 mb-6">
            Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
          </p>
          <input
            type="text"
            placeholder="Email/SĐT"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-black-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <div className="flex space-x-6 mb-6 justify-between" >
            <a href="#" className="text-black-500 hover:underline">
              Đăng nhập bằng mã QR
            </a>
            <a href="#" className="text-black-500 hover:underline">
              Đăng nhập bằng OTP
            </a>
          </div>
          <button className="w-full rounded-tl-xl rounded-br-xl bg-black text-white py-3 hover:bg-gray-800">
            ĐĂNG NHẬP
          </button>
        </div>

        {/* Phần Đăng Ký */}
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-4">Khách hàng mới của IVY moda</h2>
          <p className="text-gray-600 mb-6">
            Nếu bạn chưa có tài khoản trên ivymoda.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
          </p>
          <p className="text-gray-600 mb-6">
            Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên ivymoda.com sẽ là một trải nghiệm thú vị và nhanh chóng hơn!
          </p>
          <button className="w-full rounded-tl-xl rounded-br-xl bg-black text-white py-3 hover:bg-gray-800"
            onClick={() => navigate('/register')}
          >
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
