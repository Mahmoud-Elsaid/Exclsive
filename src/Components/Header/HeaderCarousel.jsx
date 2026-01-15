


import { useState } from "react";
import img1 from "../../assets/images/hero_endframe__cvklg0xk3w6e_large 2.png";
import img2 from "../../assets/images/perfume.png";
import img3 from "../../assets/images/speaker.png";
import img4 from "../../assets/images/woman.png";
import img5 from "../../assets/images/perfume.png";
import appleLogo from '../../assets/images/1200px-Apple_gray_logo 1.svg'
import { Link } from "react-router-dom";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5
];

export default function HeaderCarousel() {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  

  return (
    <div className="w-full lg:w-3/4 mx-auto relative flex p-6 bg-black my-15">

      <div className="carouselContent h-56 md:h-96 w-1/2  pr-10  overflow-hidden text-white">
          <div className="contentTitle flex">
                <img src={appleLogo} className=" mr-3" alt="apple logo" /> 
                <p className=" my-8 ms-4">iPhone 14 Series</p>
          </div>
          <div className="contentTitle  lg:mr-20 ">
              <h3 className="leading-relaxed font-bold text-xl md:text-2xl lg:text-3xl xl:text-5xl  ">Up to 10% off Voucher</h3>
          </div>

          <div className="carouselLink">
              <Link to="/products" className=" underline underline-offset-6 text-lg group ">Shop Now <span className=" ml-3 text-lg "><i className="fa-solid fa-arrow-right   group-hover:translate-x-2 transition-all duration-300"></i></span> </Link>
          </div>
      </div>

      <div className=" h-56 md:h-96 w-1/2  overflow-hidden  ">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className=" block w-full h-full   "
        />
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-3 md:bottom-5 left-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={` cursor-pointer w-3 h-3 rounded-full transition ${
              i === current ? "bg-mainColor" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
