


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Shared/Loading/Loading';
import FeatchError from '../Shared/FeatchError/FeatchError';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

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

    export default function ComeingSoon() {

    function getComingProducts() {
        return axios.get(`https://fakestoreapi.com/products`);
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allProducts'],
        queryFn: getComingProducts,
    });

    if (isLoading) return <Loading />;
    if (isError) return <FeatchError />;

    console.log("coming", data ? data : "no coming");

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        pauseOnHover: true,
        infinite: true,
        cssEase: "linear",
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1536,
                settings: { slidesToShow: 5 },
            },
            {
                breakpoint: 1280,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
            // {
            //     breakpoint: 480,
            //     settings: { slidesToShow: 5 },
            // },
            ],
    };

    return (
        <div className="container mx-auto">
        <SectionHeader sectionName={"Coming soon"} sectionContent={"Some of our waiting products"} />
        <div className="slider-container px-10 py-5  border-b-1 mb-10">
            <Slider {...settings}>
            {data?.data.map((product) => (
                <div
                key={product.id}
                className="  group relative shadow-md hover:shadow-xl rounded-md h-72 lg:h-80 bg-white dark:bg-gray-950 p-4 overflow-hidden productAfter  productBefore"
                >
                <div  className="">
                    <div className="flex justify-center bg-[#f5f5f5] py-2">
                    <img src={product.image} alt={product.title} className=" h-36 lg:h-40 object-contain" />
                    </div>

                    <div className="mt-4 text-center">
                    <h2 className="font-semibold text-gray-800 text-lg">
                        {product.title.split(' ').length > 2 ? product.title.split(' ').slice(0, 2).join(' ') +"...." : product.title}
                    </h2>
                    <div className="flex justify-center items-center">
                        <div className="mt-1 text-red-500 font-bold text-xl mr-1">{product.price}$</div>
                        <div className="flex justify-center items-center text-yellow-500 text-xl mt-1">
                        ⭐⭐⭐⭐
                        <span className="text-gray-600 ml-2 text-lg">{product.rating.count}</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                </div>
            ))}
            </Slider>
        </div>
        </div>
    );
    }
