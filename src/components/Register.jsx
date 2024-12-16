import React from 'react';

const Register = () => {
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
                  placeholder="Họ..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Tên..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Email..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Điện thoại..."
                  className="w-1/2 p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="date"
                  className="w-1/2 p-3 border border-gray-300 rounded"
                />
                <select className="w-1/2 p-3 border border-gray-300 rounded">
                  <option>Nữ</option>
                  <option>Nam</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <select className="w-1/2 p-3 border border-gray-300 rounded">
                  <option>Chọn Tỉnh/Tp</option>
                </select>
                <select className="w-1/2 p-3 border border-gray-300 rounded">
                  <option>Chọn Quận/Huyện</option>
                </select>
              </div>
              <select className="w-full p-3 border border-gray-300 rounded">
                <option>Chọn Phường/Xã</option>
              </select>
              <textarea
                placeholder="Địa chỉ..."
                className="w-full p-3 border border-gray-300 rounded"
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
                placeholder="Mật khẩu..."
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu..."
                className="w-full p-3 border border-gray-300 rounded"
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
          <button className="w-full md:w-1/3 bg-black text-white py-3 rounded hover:bg-gray-800">
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
