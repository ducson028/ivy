import React from "react";
import { FaFacebook, FaTwitter, FaTiktok  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
        <section className="text-center pt-10 px-4">
          <hr className="w-full mb-4" />
          <p className="pt-8 text-1xl font-bold">Tải ứng dụng IVY moda</p>
          <div className="my-8">
            <img
              src="https://pubcdn.ivymoda.com/ivy2/images/appstore.png"
              alt="App Store"
              className="h-12 inline-block mx-2"
            />
            <img
              src="https://pubcdn.ivymoda.com/ivy2/images/googleplay.png"
              alt="Google Play"
              className="h-12 inline-block mx-2"
            />
          </div>
          <p className="text-lg">Nhận bản tin IVY moda</p>
          <input
            type="text"
            placeholder="Nhập email của bạn..."
            className="mt-4 border-b-2 border-black text-center p-2 w-96 outline-none"
          />
        </section>
      

      <footer className="mt-24">
        <div className="footer-top flex justify-center items-center my-8">
          <ul className="flex items-center">
            <li className="px-3 border-r-2 relative">
              <a href="#">
                <img
                  src="https://pubcdn.ivymoda.com/ivy2/images/img-congthuong.png"
                  alt="Cong Thuong"
                  className="h-6"
                />
              </a>
            </li>
            <li className="px-3 border-r-2">
              <a href="#" className="text-sm text-gray-700 hover:text-red-700">
                Liên hệ
              </a>
            </li>
            <li className="px-3 border-r-2">
              <a href="#" className="text-sm text-gray-700 hover:text-red-700">
                Tuyển dụng
              </a>
            </li>
            <li className="px-3 border-r-2">
              <a href="#" className="text-sm text-gray-700 hover:text-red-700">
                Giới thiệu
              </a>
            </li>
            <li className=" flex px-3">
              <a href="#" className=""><FaFacebook /></a>
              <a href="#" className=" ml-2">< FaTwitter/></a>
              <a href="#" className=" ml-2"><FaTiktok  /></a>
            </li>
          </ul>
        </div>

        <div className="footer-center text-center text-sm text-gray-600 pb-8">
          <p>
            Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650
            <br />
            Địa chỉ đăng ký: Tổ dân phố Tháp, P.Đại Mỗ, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam
            <br />
            Số điện thoại: <b>0243 205 2222/ 090 589 8683</b>
            <br />
            Email: <b>cskh@ivy.com.vn</b>
          </p>
        </div>

        <div className="footer-bottom bg-gray-200 py-4 text-center text-sm text-gray-700">
          ©IVYmoda All rights reserved
        </div>
      </footer>
      
    </div>
  );
};

export default Footer;
