import { useState } from 'react';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import bst1 from '../assets/bst1.webp';
import bst2 from '../assets/bst2.webp';
import bst3 from '../assets/bst3.webp';
import bst4 from '../assets/bst4.webp';
import bst5 from '../assets/bst5.webp';
import bst6 from '../assets/bst6.webp';
import bst7 from '../assets/bst7.webp';

const Collections = () => {
  const images = [bst6, bst7];
  const [currentIndex, setCurrentIndex] = useState(0);

  const Next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const Prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
  
      <p className="flex text-[40px] pt-6 font-bold pb-2 font-mono justify-center">
        Fall/ Winter New Collection 2024
      </p>

     
      <div className="flex justify-around px-16">
        <img
          src={bst1}
          alt="Collection 1"
          className="w-[300px] h-[300px] rounded-tl-[50px] rounded-br-[50px]"
        />
        <img
          src={bst2}
          alt="Collection 2"
          className="w-[300px] h-[300px] rounded-tl-[50px] rounded-br-[50px]"
        />
        <img
          src={bst3}
          alt="Collection 3"
          className="w-[300px] h-[300px] rounded-tl-[50px] rounded-br-[50px]"
        />
        <img
          src={bst4}
          alt="Collection 4"
          className="w-[300px] h-[300px] rounded-tl-[50px] rounded-br-[50px]"
        />
      </div>

 
      <img
        src={bst5}
        className="rounded-tl-[150px] rounded-br-[150px] pt-12 px-20"
        alt="Highlighted"
      />

      <div className="relative flex justify-center items-center mt-10 gap-6">
      
        <img
          src={images[currentIndex]}
          alt="Current"
          className="w-[44%] h-[250px] rounded-tl-[60px] rounded-br-[60px] transition-transform duration-500"
        />
        
        <img
          src={images[(currentIndex + 1) % images.length]}
          alt="Next"
          className="w-[44%] h-[250px] rounded-tl-[60px] rounded-br-[60px] transition-transform duration-500"
        />
        
      </div>

    
      <div className="flex items-center justify-between w-full  mt-8">
      
        <button
          onClick={Prev}
          className="flex px-20 items-center justify-center text-gray-400 hover:text-gray-600"
        >
          <span className="text-5xl"><GrLinkPrevious /></span>
        </button>

       
        <div className="flex-grow h-[1px] bg-gray-300 mx-12"></div>

       
        <button
          onClick={Next}
          className="flex px-20 items-center justify-center text-gray-400 hover:text-gray-600"
        >
          <span className="text-5xl"><GrLinkNext /></span>
        </button>
      </div>
    </div>
  );
};

export default Collections;
