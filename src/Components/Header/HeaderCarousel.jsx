

// import img1 from "../../assets/images/app store.svg"

// export default function HeaderCarousel() {
//   return (
    

//     <div className=" w-full md:w-3/4 bg-blue-700 ">
      
// <div id="indicators-carousel" className="relative w-full" data-carousel="static">
//     <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//         <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
//             <img src={img1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
//         </div>
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
//         </div>
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
//         </div>
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
//         </div>
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
//         </div>
//     </div>
//     <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
//     </div>
//     <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
//             </svg>
//             <span className="sr-only">Previous</span>
//         </span>
//     </button>
//     <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//             </svg>
//             <span className="sr-only">Next</span>
//         </span>
//     </button>
// </div>
//     </div>

//   );
// }





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
