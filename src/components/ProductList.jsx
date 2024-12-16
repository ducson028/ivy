import React, { useState, useEffect } from 'react';
import { CiHeart, CiShoppingBasket } from "react-icons/ci";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import logo from '../assets/bg_news.png';
import badget from '../assets/badget.png'
import { fetchProducts } from '../userAxios/axios';
import Product from './Product';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2,
    },
};

const ProductCard = ({ imageUrl, hoverImageUrl, name, price, originalPrice, isNew, isBadget, id }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-[200px] md:w-[250px] p-2">
            <div className="relative">
                {isBadget && (
                    <span className="absolute top-2 left-[180px]">
                        <div className="relative inline-block">
                            <img src={badget} alt="badget" />
                            <span className="badget">
                                -30%
                            </span>
                        </div>
                    </span>
                )}
                {isNew && (
                    <span className="absolute top-0 left-[-10px]">
                        <div className="relative inline-block">
                            <img src={logo} alt="logo" />
                            <span className="new">
                                NEW
                            </span>
                        </div>
                    </span>
                
                )}
                
                <img
                    src={isHovered ? hoverImageUrl : imageUrl}
                    alt={name}
                    className="w-full h-[300px] object-cover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>

            <div className="mt-3">
                <div className="flex items-center justify-between space-x-4">
                    <ul className="flex space-x-4 mb-0">
                        <li className="w-5 h-5 bg-blue-500 rounded-full"></li>
                        <li className="w-5 h-5 bg-green-500 rounded-full"></li>
                    </ul>
                    <div className="flex items-center">
                        <CiHeart className="text-[25px]" />
                    </div>
                </div>

                
                <Link to={`/product/${id}`}
                 className="text-gray-700 hover:underline">
                    <p>{name}</p>
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="font-bold text-black text-[20px]">{(price)}đ</p>
                        {(originalPrice) && (
                            <p className="text-gray-400 text-[18px] line-through">{(originalPrice)}đ</p>
                        )}
                    </div>
                    <div className="flex items-center text-[30px] hover:text-black bg-black text-white hover:bg-white rounded-tl-[8px] rounded-br-[8px]">
                        <CiShoppingBasket />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('ivyModa');
    console.log('active', activeButton);
    
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(activeButton);
                if (data) {
                    setProducts(data); // Đảm bảo data trả về đúng danh sách sản phẩm
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
    
        loadProducts();
    }, [activeButton]);
    

    return (
        <div>
            <p className="flex text-[40px] pt-4 font-bold font-mono justify-center">NEW ARRIVAL</p>
            <div className="flex justify-center">
                <button
                    className={`text-[20px] m-2 ${activeButton === 'ivyModa' ? 'border-black border-b-2' : 'border-b-0 text-gray-500'}`}
                    onClick={() => setActiveButton('ivyModa')}
                >
                    IVY moda
                </button>
                <button
                    className={`text-[20px] m-2 ${activeButton === 'ivyMen' ? 'border-black border-b-2' : 'border-b-0 text-gray-500'}`}
                    onClick={() => setActiveButton('ivyMen')}
                >
                    IVY men
                </button>
            </div>

            <Carousel responsive={responsive} draggable={true} className="px-10 mr-10">
                {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl[0]}
                        hoverImageUrl={product.hoverImageUrl}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        isNew={product.isNew}
                        isBadget={product.isBadget}
                        id={product.id} 
                    />
                    </Link>
                ))}
            </Carousel>

            <div className="w-full flex justify-center mt-4">
                <button className="border border-black px-6 py-2 rounded-tl-[20px] rounded-br-[20px] hover:bg-black hover:text-white transition">
                    Xem tất cả
                </button>
            </div>
            <Product activeButton={activeButton} />
        </div>
    );
};

export default ProductList;





