




// import React from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import useBasicData from '../../Hooks/getBasicData';
// import Loading from '../Shared/Loading/Loading';
// import FeatchError from '../Shared/FeatchError/FeatchError';
// import SectionHeader from '../Shared/SectionHeader/SectionHeader';


// import { FaArrowRight, FaArrowLeft, FaHeadphones } from "react-icons/fa";
// import { PiGuitar } from "react-icons/pi";




// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//     style={{
//         ...style,
//         display: "flex",
//         background: "gray",
//         width:35,
//         height:35,
//         borderRadius: "50%",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "8px",
//         right: "10px",
//         zIndex: 10,
//       }}
//       onClick={onClick}
//     >
//       <FaArrowRight color="black" />
//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//         className={className}
//         style={{
//             ...style,
//             display: "flex",
//             background: "gray",
//             width:35,
//             height:35,
//             borderRadius: "50%",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "8px",
//             left: "10px",
//             zIndex: 10,
//         }}
//         onClick={onClick}
//         >
//         <FaArrowLeft color="black" size='25px' />
//         </div>
//     );
// }

// export default function ComingSoon() {



//     let {data , isLoading , isError} = useBasicData("categories");
//     // if (isLoading) return <Loading/>
//     // if (isError) return <FeatchError/>
//     console.log(data?data:"no data")


//     const settings = {
//         dots: false,
//         infinite: true,
//         // autoplay: true,
//         // speed: 3000,
//         // autoplaySpeed: 0,
//         // cssEase: "linear",
//         slidesToShow: 6,
//         slidesToScroll: 1,
//         pauseOnHover: false,
//         nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//         responsive: [
//             {
//             breakpoint: 1536, // 2xl
//             settings: {
//                 slidesToShow: 6,
//             },
//             },
//             {
//             breakpoint: 1280, // xl
//             settings: {
//                 slidesToShow: 5,
//             },
//             },
//             {
//             breakpoint: 1024, // lg
//             settings: {
//                 slidesToShow: 4,
//             },
//             },
//             {
//             breakpoint: 768, // md
//             settings: {
//                 slidesToShow: 3,
//             },
//             },
//             {
//             breakpoint: 640, // sm
//             settings: {
//                 slidesToShow: 2,
//             },
//             },
//             {
//             breakpoint: 480, // xs (موبايل صغير)
//             settings: {
//                 slidesToShow: 1,
//             },
//             },
//         ],
//     };



//     return (
//         <div className='container mx-auto '>
            
//             <SectionHeader  sectionName={"today's"} sectionContent={"Flash Sales"}/>
//             <div className="slider-container px-10 py-5">
//                 <Slider {...settings}>
//                     {data?.data.map((category) => (
//                     <div key={category._id} className="flex justify-center items-center flex-col h-60 border-2 border-white bg-white/60 hover:bg-mainColor pt-10 text-black m-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 group">
                        
//                         <div className=' bg-amber-400 h-35 flex justify-center items-center'>
//                             <i class="fa-solid fa-headphones text-[150px] stroke-[1px]"></i>
//                         </div>
                        
//                         <h3 className=" group-hover:text-white  text-2xl text-center font-bold transition-all duration-300">{category.name}</h3>
                    
//                     </div>
//                     ))}
//                 </Slider>
//             </div>

//         </div>
//     )
// }














import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useBasicData from '../../Hooks/getBasicData';
import Loading from '../Shared/Loading/Loading';
import FeatchError from '../Shared/FeatchError/FeatchError';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FaMusic, FaTshirt, FaFemale, FaShoppingCart, FaBaby, FaHome, FaBook, FaHeartbeat, FaMobileAlt, FaLaptop } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "gray",
        width: 35,
        height: 35,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        right: "10px",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <FaArrowRight color="black" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "gray",
        width: 35,
        height: 35,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        left: "10px",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <FaArrowLeft color="black" size="25px" />
    </div>
  );
}

export default function CategorySlider() {
  const { data, isLoading, isError } = useBasicData("categories");
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>error</div>
  console.log(data ? data : "no data");

  const settings = {
    dots: false,
    
    infinite: true,
    cssEase: "linear" , 
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <SectionHeader sectionName={"Categories"} sectionContent={"Browse By Category"} />
      <div className="slider-container px-10 py-5">
        <Slider {...settings}>
          {data?.data.map((category) => (
            <Link to={`/categoryProducts/${category._id}`}
                key={category._id}
                className=" cursor-pointer flex justify-center items-center flex-col h-52 border-[.5px] border-black bg-white/60 hover:bg-mainColor hover:border-none group p-4 rounded-lg shadow-lg transition-all duration-500"
            >
                <div className="h-20 flex justify-center items-center group-hover:text-white transition-all duration-500">
                {category.name === "Music" && <FaMusic className="text-4xl" />}
                {category.name === "Men's Fashion" && <FaTshirt className="text-4xl" />}
                {category.name === "Women's Fashion" && <FaFemale className="text-4xl" />}
                {category.name === "SuperMarket" && <FaShoppingCart className="text-4xl" />}
                {category.name === "Baby & Toys" && <FaBaby className="text-4xl" />}
                {category.name === "Home" && <FaHome className="text-4xl" />}
                {category.name === "Books" && <FaBook className="text-4xl" />}
                {category.name === "Beauty & Health" && <FaHeartbeat className="text-4xl" />}
                {category.name === "Mobiles" && <FaMobileAlt className="text-4xl" />}
                {category.name === "Electronics" && <FaLaptop className="text-4xl" />}
                </div>
                <h3 className="text-xl text-center font-bold mt-2 group-hover:text-white transition-all duration-500">{category.name}</h3>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}