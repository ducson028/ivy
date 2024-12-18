import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { GrLinkUp, GrLinkDown } from "react-icons/gr";
import { useCart } from "../context/CartContext";
import { fetchProductDetails } from "../userAxios/axios";



const Product = () => {
    const { id } = useParams();   
    const navigate = useNavigate();

    const [product, setProduct] = useState(null); // Khởi tạo product là null   
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [activeTabs, setActiveTabs] = useState('gioithieu');
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [error, setError] = useState(""); 
    const { addToCart } = useCart();

    const tabs = {
        INTRODUCTION: 'gioithieu',
        DETAILS: 'chitiet',
        CARE: 'baoquan',
    };
   // Fetch product details
   useEffect(() => {
    const loadProductDetails = async () => {
        setLoading(true);
        try {
            // Kiểm tra nếu `id` không tồn tại
            if (!id) {
                throw new Error("ID sản phẩm không hợp lệ!");
            }

            const type = id.includes('ivyModa') ? 'ivyModa' : 'ivyMen';
            const data = await fetchProductDetails(type, id);
            console.log('data', data)
            if (data) {
                setProduct(data);
                if (data.imageUrl && data.imageUrl.length > 0) {
                    setImages(data.imageUrl);
                    setSelectedImage(data.imageUrl[0]);
                }
            } else {
                throw new Error("Không tìm thấy thông tin sản phẩm!");
            }
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            setProduct(null); // Đặt product về null nếu gặp lỗi
        } finally {
            setLoading(false);
        }
    };

    loadProductDetails();
}, [id]);



useEffect(() => {
    setQuantity(1);
    setStartIndex(0);
    setActiveTabs(tabs.INTRODUCTION);
    setIsContentVisible(false);
}, [id]);


   useEffect(() => {
    setSelectedSize(""); // Reset size khi id thay đổi
    setError("");        // Reset lỗi size nếu có
}, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return ;

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setError(''); // Ẩn lỗi khi chọn size
    };
    
    // Xử lý thay đổi số lượng, chỉ thay đổi state `quantity`
const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
        type === "increment"
            ? prevQuantity + 1
            : Math.max(1, prevQuantity - 1)
    );
};

// Hàm thêm vào giỏ hàng (gọi duy nhất khi nhấn nút thêm vào giỏ)
const handleAddToCart = () => {
    if (!selectedSize) {
        setError('Vui lòng chọn size!');
        return;
    }

    // Xử lý thêm vào giỏ hàng
    addToCart({
        id: product.id,
        name: product.name,
        sizeWorn: selectedSize,
        color: product.color,
        imageUrl: selectedImage,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity, // Số lượng hiện tại
    });

    // Đặt lại số lượng
    setQuantity(1);
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
};


const handleAddToCartAndGoToCart = () => {
    if (!selectedSize) {
        setError('Vui lòng chọn size!')
        return ;
    } 
    setError("");
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 100);
    
};

    // Image navigation
    const visibleThumbnails = 4;
    const handleUp = () => {
        setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleDown = () => {
        setStartIndex((prevIndex) =>
            Math.min(images.length - visibleThumbnails, prevIndex + 1)
        );
    };

    // Toggle content visibility
    const toggleContentVisibility = () => {
        setIsContentVisible(prevState => !prevState);
    };

    // Tab navigation
    const tabTabs = [
        { id: tabs.INTRODUCTION, label: 'Giới thiệu' },
        { id: tabs.DETAILS, label: 'Chi tiết sản phẩm' },
        { id: tabs.CARE, label: 'Bảo quản' }
    ];
   

    return (
        <div className="container mx-auto px-4 pt-20">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-4 cursor-pointer">
                <span>Trang chủ</span> <span className="mx-2">&gt;</span>
                <span>Nữ</span> <span className="mx-2">&gt;</span>
                <span>{product.name}</span>
            </nav>

            {/* Main Section */}
            <div className="flex flex-col lg:flex-row">
                <div className="flex">
                    {/* Ảnh lớn hiển thị */}
                    <div className="w-[80%]">
                        <img
                            src={selectedImage}
                            alt="Main"
                            className="w-full h-[550px] object-cover rounded-md"
                        />
                    </div>

                    {/* Thanh điều hướng ảnh nhỏ (Thumbnails) */}
                    <div className="w-[20%] flex flex-col ml-4 relative">
                        {/* Nút điều hướng lên */}
                        <button
                            onClick={handleUp}
                            className="p-2 flex items-center justify-center z-10 mb-5"
                            aria-label="Scroll up"
                        >
                            <GrLinkUp />
                        </button>

                        <div className="flex flex-col space-y-4 overflow-hidden">
                            {images.slice(startIndex, startIndex + visibleThumbnails).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-full h-[100px] object-cover cursor-pointer rounded-md ${selectedImage === image ? 'border-2 border-black' : ''}`}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>

                        {/* Nút điều hướng xuống */}
                        <button
                            onClick={handleDown}
                            className="p-2 flex items-center justify-center z-10 mt-5"
                            aria-label="Scroll down"
                        >
                            <GrLinkDown />
                        </button>
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="lg:w-1/2 lg:pl-8">
                    <h1 className="text-4xl font-mono font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-1">SKU: {product.horse}</p>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="text-yellow-400">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                        <span className="text-gray-500">(0 đánh giá)</span>
                    </div>

                    <p className="text-xl font-bold text-red-500 mb-4">{product.originalPrice}<sup>đ</sup></p>
                    <p className="mb-2">
                        <span className="font-semibold">Màu sắc:</span> {product.color}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-4">

                        <div className="">
                            <select onChange={(e) => handleSizeSelect(e.target.value)} value={selectedSize}>
                                <option value="" >Chọn size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-4 flex">
                        <p className="flex mr-3 justify-center items-center font-semibold mb-2">Số lượng</p>
                        <div className="flex ">
                            <button
                                onClick={() => handleQuantityChange("decrement")}
                                className="px-4 py-2 bg-gray-200 rounded-tl-xl rounded-br-xl"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-10 h-10 text-center border-t border-b"
                            />
                            <button
                                onClick={() => handleQuantityChange("increment")}
                                className="px-4 py-2 bg-gray-200 rounded-tl-xl rounded-br-xl"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={handleAddToCart}
                            className="py-3 w-[30%] h-full justify-center border border-black bg-black text-white hover:bg-white hover:text-black font-bold rounded-tl-2xl rounded-br-2xl">
                            THÊM VÀO GIỎ
                        </button>
                        <button className="py-3 w-[20%] h-full justify-center border border-black bg-white hover:bg-black hover:text-white text-black font-bold rounded-tl-2xl rounded-br-2xl"
                            onClick={handleAddToCartAndGoToCart}
                        >
                            MUA HÀNG
                        </button>
                        <button className="flex py-3 w-[10%] h-full justify-center border border-black bg-white hover:bg-black hover:text-white text-black font-bold rounded-tl-2xl rounded-br-2xl">
                            <CiHeart className="text-[25px]" />
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-t">
                        <ul className="flex space-x-4 mt-4 text-gray-400 font-bold font-mono">
                            {tabTabs.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        className={`m-2 ${activeTabs === id ? 'border-black border-b-2 text-black' : 'border-b-0 text-gray-500'}`}
                                        onClick={() => setActiveTabs(id)}>
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Content based on active tab */}
                    <div className="mt-2 text-gray-600 text-[14px] font-thin">
                        {activeTabs === tabs.INTRODUCTION && (
                            <div>
                                <div className={`scrollable-content ${isContentVisible ? 'max-h-none' : 'max-h-[70px]'}`}>
                                    <p className="mb-2">{product?.description}</p>
                                    {product?.features?.map((feature, index) => (
                                        <p key={index} className="mb-2">- {feature}</p>
                                    ))}
                                    <p className="font-bold mb-2">Thông tin mẫu:</p>
                                    <div className="mb-2">
                                        <span className="font-bold">Chiều cao: </span><span>{product?.modelInfo?.height}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-bold">Cân nặng: </span><span>{product?.modelInfo?.weight}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-bold">Số đo 3 vòng: </span><span>{product?.modelInfo?.measurements}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-bold">Mẫu mặc size </span><span>{product?.modelInfo?.sizeWorn}</span>
                                    </div>
                                    <p>{product?.notes}</p>
                                </div>
                                <button onClick={toggleContentVisibility} className="text-blue-500 mt-2">
                                    {isContentVisible ? 'Ẩn bớt' : 'Xem thêm'}
                                </button>
                            </div>
                        )}
                        {activeTabs === tabs.DETAILS && (
                            <div>
                                <div className={`scrollable-content ${isContentVisible ? 'max-h-none' : 'max-h-[70px]'}`}>
                                    <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
                                        <div className="font-semibold">Dòng sản phẩm</div>
                                            <div className="text-gray-600">{product?.details?.productLine}</div>
                                        <div className="font-semibold">Nhóm sản phẩm</div>
                                            <div className="text-gray-600">{product?.details?.productGroup}</div>
                                        <div className="font-semibold">Kiểu dáng</div>
                                            <div className="text-gray-600">{product?.details?.style}</div>
                                        <div className="font-semibold">Cổ Áo</div>
                                            <div className="text-gray-600">{product?.details?.collar}</div>
                                        <div className="font-semibold">Tay Áo</div>
                                            <div className="text-gray-600">{product?.details?.sleeve}</div>
                                        <div className="font-semibold">Độ dài</div>
                                            <div className="text-gray-600">{product?.details?.length}</div>
                                        <div className="font-semibold">Họa tiết</div>
                                            <div className="text-gray-600">{product?.details?.textures}</div>
                                        <div className="font-semibold">Chất liệu</div>
                                            <div className="text-gray-600">{product?.details?.material}</div>
                                    </div>
                                </div>
                                <button onClick={toggleContentVisibility} className="text-blue-500 mt-2">
                                    {isContentVisible ? 'Ẩn bớt' : 'Xem thêm'}
                                </button>
                            </div>
                        )}
                        {activeTabs === tabs.CARE && (
                            <div>
                                <div className={`scrollable-content ${isContentVisible ? 'max-h-none' : 'max-h-[70px]'}`}>
                                    <p className="mb-2">Chi tiết bảo quản sản phẩm</p>
                                    <p className="mb-2 font-bold">* {product?.first}</p>
                                    {product?.lates?.map((late, index) => (
                                        <p key={index} className="mb-2">* {late}</p>
                                    ))}

                                </div>
                                <button onClick={toggleContentVisibility} className="text-blue-500 mt-2">
                                    {isContentVisible ? 'Ẩn bớt' : 'Xem thêm'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
