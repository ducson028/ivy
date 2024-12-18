import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import BestSeller from './BestSeller';
import Collections from './Collections';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import anh1 from '../assets/anh1.webp'; import anh2 from '../assets/anh2.webp';
import anh3 from '../assets/anh3.webp'; import anh4 from '../assets/anh4.webp';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [anh1, anh2, anh3, anh4];

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="pt-[80px] flex justify-center items-center relative">

        <img
          src={images[currentImage]}
          alt="Lỗi"
          className="w-[89%] h-[550px] object-cover rounded-tl-[150px] rounded-br-[150px]"
        />

        <button
          onClick={handlePrev}
          className="absolute text-5xl left-24  top-[60%] transform -translate-y-1/2 text-white p-2 rounded-full opacity-70 hover:opacity-100"
        >
          <span className="text-5xl"><GrLinkPrevious /></span>
        </button>

        <button
          onClick={handleNext}
          className="absolute text-5xl right-24  top-[60%] transform -translate-y-1/2 text-white p-2 rounded-full opacity-70 hover:opacity-100"
        >
          <span className="text-5xl"><GrLinkNext /></span>
        </button>

      </div>
      <div>
          <Routes>
            <Route path="/" element={
              <>
              <ProductList /> 
              <BestSeller /> 
              <Collections />
              </> 
            }/> 
          </Routes>
      </div>
    </div> 
  );
};

export default Home;