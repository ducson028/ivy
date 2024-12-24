import {useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUser, verifyPassword } from "../../userAxios/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineUser } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { MdOutlinePlace } from "react-icons/md";
import { FaGlasses } from "react-icons/fa";
import { CiHeart, CiHeadphones  } from "react-icons/ci";
import { BsHandThumbsUp } from "react-icons/bs";

const UserProfile = () => {
    const {user} = useAuth();
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    });
    const [formData, setFormData] = useState({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      birthDate: user.birthDate
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleUpdate = async () => {
  try {
      const data = await updateUser(user.id, formData);
      console.log(data);
      
      setMessage("Cập nhật thông tin thành công!");
  } catch (error) {
      setMessage("Cập nhật thông tin thất bại. Vui lòng thử lại!");
      console.error(error);
  }
  setTimeout(() => setMessage(""), 3000);
};

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData({ ...passwordData, [name]: value });
};

const handlePasswordSubmit = async () => {
  const { currentPassword, newPassword, confirmPassword } = passwordData;

  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("Vui lòng nhập đầy đủ thông tin!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Mật khẩu mới và xác nhận không khớp!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    return;
  }

  try {
    const isPasswordValid = await verifyPassword({
      id: user.id,
      password: currentPassword,
    });
    console.log('a', isPasswordValid);
    
    if (!isPasswordValid) {
      toast.warning("Mật khẩu hiện tại không đúng!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    await updateUser(user.id, { password: newPassword });
    toast.success("Đổi mật khẩu thành công!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    setShowModal(false);
  } catch (error) {
    toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    console.error(error);
  }
};

  

  return (
    <div className="flex flex-col font-light items-center pt-14">
      <ToastContainer />
      <div className="w-full max-w-7xl pt-6">
        <nav className="text-sm text-gray-500 mb-8 cursor-pointer">
          <span className="hover:underline">Trang chủ</span>{" "}
          <span className="mx-2">&#8594;</span>
          <span className="text-gray-700 font-medium">Tài khoản của tôi</span>
        </nav>
        <div className="grid grid-cols-12 gap-[100px]">
          {/* Sidebar */}
          <div className="col-span-3 p-6 h-[460px]  border border-gray-300 rounded-tl-3xl rounded-br-3xl">
            <div className="flex items-center mb-10">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <span className="ml-4 text-lg font-medium text-gray-700">
                {user.firstname} {user.lastname}
              </span>
            </div>
            <ul className="space-y-4">
              
              <li className= " flex text-gray-700 font-semibold cursor-pointer items-center ">
              <AiOutlineUser className="mr-2" /> Thông tin tài khoản
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <GiPadlock className="mr-2"/> Lịch sử đăng nhập
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <TfiReload className="mr-2" /> Quản lý đơn hàng
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <MdOutlinePlace className="mr-2"/> Sổ địa chỉ
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <FaGlasses className="mr-2"/> Sản phẩm đã xem
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <CiHeart className="mr-2" /> Sản phẩm yêu thích
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <CiHeadphones className="mr-2" /> Hỏi đáp sản phẩm
              </li>
              <li className="text-gray-600 flex cursor-pointer items-center ">
               <BsHandThumbsUp className="mr-2"/> Hỗ trợ - IVY
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div>
              <div>
                <h1 className="text-2xl font-medium text-gray-800 mb-6">
                  TÀI KHOẢN CỦA TÔI
                </h1>
                
                <div className="bg-blue-100 w-[83%] text-blue-600 p-4 rounded-lg mb-6 text-sm">
                  Vì chính sách an toàn thẻ, bạn không thể thay đổi SĐT, Ngày
                  sinh, Họ tên. Vui lòng liên hệ CSKH{" "}
                  <strong>0905898683</strong> để được hỗ trợ.
                </div>
                {message && (
                  <div className="bg-green-100 w-[83%] text-green-700 p-4 rounded-lg mb-6 text-sm">
                    {message}
                  </div>
                )}
                <div className="grid grid-cols-2">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Họ
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          value= {formData.firstname}
                          onChange = { handleChange }
                          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Tên
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value= {formData.lastname}
                          onChange = { handleChange }
                          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value= {formData.phone}
                          onChange = { handleChange }
                          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value= {formData.email}
                          onChange = { handleChange }
                          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Giới tính
                        </label>
                        <div className="flex items-center space-x-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name= "gender"
                              value="Name"
                              checked = {formData.gender === 'Nam'}
                              onChange = { handleChange }
                              
                            />
                            <span className="ml-2">Nam</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name= "gender"
                              value="Nữ"
                              checked = {formData.gender === 'Nữ'}
                              onChange = { handleChange }
                            
                            />
                            <span className="ml-2">Nữ</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name= "gender"
                              value="Khác"
                              checked = {formData.gender === 'Khác'}
                              onChange = { handleChange }
                              
                            />
                            <span className="ml-2">Khác</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label className="w-1/3 font-medium text-gray-700">
                          Ngày sinh
                        </label>
                        <input
                          type="text"
                          name="birthDate"
                          value= {formData.birthDate}
                          onChange = { handleChange }
                          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          
                        />
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                      <button 
                      onClick={handleUpdate}
                      className="px-6 py-2 border border-black rounded-tl-2xl rounded-br-2xl bg-black text-white hover:bg-white hover:text-black">
                        CẬP NHẬT
                      </button>
                      <button 
                      onClick={()=> setShowModal(true)}
                      className="px-6 py-2 border border-black rounded-tl-2xl rounded-br-2xl bg-white text-black hover:bg-black hover:text-white">
                        ĐỔI MẬT KHẨU
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mb-[255px] ml-[50px]">
                    <table className="border border-gray-300 text-sm text-left">
                      <tbody>
                        <tr className="border-b">
                          <td className="px-6 py-3">Điểm chiết khấu</td>
                          <td className="px-6 py-3 border-l font-bold">0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-3">Chiết khấu</td>
                          <td className="px-6 py-3 border-l font-bold">0%</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3">Hạn thẻ</td>
                          <td className="px-6 py-3 border-l font-bold text-black">
                            17/12/2025
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-xl font-semibold mb-4">ĐỔI MẬT KHẨU</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-6 py-2 bg-black text-white rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
