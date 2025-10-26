
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaTruck, FaSyncAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { GoHeartFill } from 'react-icons/go';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import { CartContext } from '../../Context/CartContext/CartContext';
import { WishListContext } from '../../Context/WishListContext/WishListContext';
import Loading from '../../Components/Shared/Loading/Loading';
import FeatchError from '../../Components/Shared/FeatchError/FeatchError';
import Swal from 'sweetalert2';
import { IoCartOutline } from 'react-icons/io5';

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

export default function ProductDetails() {

        const { productId, productCategory } = useParams();
        const [selectedImage, setSelectedImage] = useState(null);
        const [selectedSize, setSelectedSize] = useState("M");
        const sizes = ["XS", "S", "M", "L", "XL"];
        const [heartStates, setHeartStates] = useState({});
        const [wishListLoading , setWishListLoading] = useState(false);
        const [cartLoading , setCartLoading] = useState(false);


        // wishlist heart toggle
        const toggleHeart = async (id) => {
            if(localStorage.getItem("token") === null)
                {
                    await Swal.fire({
                            icon: 'error',
                            title: ' please login first Login ',
                            text: 'Unable to add to Wishlist',
                            confirmButtonText: 'OK'
                    });
                }
            else
                {
                    setHeartStates(prev => ({ ...prev, [id]: !prev[id] }));
                        if (!heartStates[id]) {
                            await addProductToWishlist(id);
                        }
                        else 
                        {
                            await removeProductFromWishlist(id);
                        }
                }

        };



        // get product details
        const { data, isLoading, isError } = useQuery({
            queryKey: ['productDetails', productId],
            queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`),
        });

        // get related products
        const { data: productCategoryData, isLoading: isCategoryLoading } = useQuery({
            queryKey: ['productCategory', productCategory],
            queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${productCategory}`),
        });


        // contexts
        let {addToCart} = useContext(CartContext);
        let {addToWishlist , deleteWishlistProduct , getWishlist} = useContext(WishListContext);



        // Add product to cart
        async function addProductToCart(productId) {
            setCartLoading(true);
            try {
                const response = await addToCart(productId);
                console.log("ksks", response);

                if (response.data.status === "success") {
                await Swal.fire({
                    icon: "success",
                    title: "Product added to Cart Successfully",
                    text: "Check your wishlist",
                    confirmButtonText: "OK",
                });
                } else {
                await Swal.fire({
                    icon: "error",
                    title: "Unable to add to Cart",
                    text: "Please try again",
                    confirmButtonText: "OK",
                });
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
                await Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Please try again later",
                confirmButtonText: "OK",
                });
            } finally {
                setCartLoading(false);
            }
        }

        // Add product to wishlist
        async function addProductToWishlist(productId) {
            setWishListLoading(true);
            try {
                const response = await addToWishlist(productId);
                if (response.data.status === "success") {
                await Swal.fire({
                    icon: "success",
                    title: "Product added to wishlist Successfully",
                    text: "Check your wishlist",
                    confirmButtonText: "OK",
                });
                } else {
                await Swal.fire({
                    icon: "error",
                    title: "Unable to add to Wishlist",
                    text: "Please try again",
                    confirmButtonText: "OK",
                });
                }
            } catch (error) {
                console.error("Error adding product to wishlist:", error);
                await Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Please try again later",
                confirmButtonText: "OK",
                });
            } finally {
                setWishListLoading(false);
            }
        }

        // Remove product from wishlist
        async function removeProductFromWishlist(productId) {
                setWishListLoading(true);
                try {
                    const response = await deleteWishlistProduct(productId);
                    if (response.data.status === "success") {
                    await Swal.fire({
                        icon: "success",
                        title: "Product removed from wishlist Successfully",
                        text: "Check your wishlist",
                        confirmButtonText: "OK",
                    });
                    } else {
                    await Swal.fire({
                        icon: "error",
                        title: "Unable to remove from Wishlist",
                        text: "Please try again",
                        confirmButtonText: "OK",
                    });
                    }
                } catch (error) {
                    console.error("Error removing product from wishlist:", error);
                    await Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Please try again later",
                    confirmButtonText: "OK",
                    });
                } finally {
                    setWishListLoading(false);
                }
            }

        // Fetch wishlist on component mount
        useEffect(() => {
            async function fetchWishlist() {
                try {
                    const response = await getWishlist();
                    if (response.data.status === "success" && Array.isArray(response.data.data)) {
                        const initialHeartStates = {};
                        response.data.data.forEach(item => {
                        initialHeartStates[item._id] = true;
                        });
                        setHeartStates(initialHeartStates);
                    }
                } 
                catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            }

            fetchWishlist();
        }, []);




        if (isLoading) return <Loading/>
        if (isError) return <FeatchError/>


        const product = data?.data?.data;
        const images = [product.imageCover, ...product.images];


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
                { breakpoint: 1536, settings: { slidesToShow: 4 } },
                { breakpoint: 1280, settings: { slidesToShow: 3 } },
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 1 } },
            ],
        };


        

    return (
        
        <div>

            {wishListLoading && (
                <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-semibold">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
                        Updating Wishlist...
                </div>
            )}

            {cartLoading && (
                <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-semibold">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
                    Adding to Cart...
                </div>
            )}

            <div className="container mx-auto px-4 py-10">
            
            <div className="flex flex-col lg:flex-row gap-10">

                    {/* images */}
                    <div className="flex lg:flex-col gap-4">
                        {images?.slice(0, 4).map((img, i) => (
                            <div
                                key={i}
                                className={`w-24 h-24 overflow-hidden bg-white shadow cursor-pointer transition hover:scale-105 ${selectedImage === img ? 'ring-2 ring-mainColor rounded-lg' : ''}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain p-2" />
                            </div>
                        ))}
                    </div>


                    {/* main image */}
                    <div className="flex-1 bg-gray-300 rounded-md flex justify-center items-center p-6">
                        <img src={selectedImage || product.imageCover} alt={product.title} className="h-96 object-contain w-full" />
                    </div>


                    {/* product details */}
                    <div className="lg:w-1/3 space-y-6">

                            <h2 className="text-2xl font-semibold">{product.title}</h2>

                            <div className="flex items-center gap-2 text-yellow-400">
                                {[...Array(5)].map((_, i) => {
                                    const index = i + 1;
                                    if (product.ratingsAverage >= index) 
                                    {
                                        return <FaStar key={i} />; 
                                    } 
                                    else if (product.ratingsAverage >= index - 0.5) 
                                    {
                                        return <FaStar className="text-yellow-300" key={i} />; 
                                    } 
                                    else 
                                    {
                                        return <FaStar key={i} className="text-gray-300" />;
                                    }
                                })}
                                <span className="text-gray-500 ml-2 text-sm">
                                    ({product.ratingsQuantity || 0} Reviews) |{" "}
                                    <span className="text-green-500">In Stock</span>
                                </span>                    
                            </div>

                            <h3 className="text-2xl font-bold text-red-600">${product.price}</h3>
                            <p className="text-gray-700">{product.description}</p>


                            {/* sizes */}
                            <div>
                                <span className="font-medium mr-2">Size:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-1 cursor-pointer border rounded-md font-medium transition-all duration-200 ${selectedSize === size ? "bg-red-600 text-white border-none" : "hover:bg-gray-100"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>


                            <div className="flex flex-wrap gap-4 items-center">
                                <button onClick={()=> addProductToCart(product._id)} className="bg-mainColor text-white px-6 py-2 w-[80%] cursor-pointer rounded hover:bg-mainColorHover transition flex justify-center items-center"> <IoCartOutline size={25} className='mx-2' /> Add To Cart</button>
                                <button onClick={() => toggleHeart(product._id)} className="cursor-pointer bg-white border-[1px] border-gray-600 mb-4 p-4 shadow hover:bg-gray-100">
                                    <GoHeartFill color={heartStates[product._id] ? "red" : "black"} />
                                </button>
                            </div>

                            <div className="border rounded p-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaTruck className="text-xl text-gray-700 mt-1" />
                                    <div>
                                        <p className="font-medium">Free Delivery</p>
                                        <p className="text-gray-600 hover:underline text-sm">Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaSyncAlt className="text-xl text-gray-700 mt-1" />
                                    <div>
                                        <p className="font-medium">Return Delivery</p>
                                        <p className="text-gray-600 text-sm">Free 30 Days Delivery Returns. <span className="text-black hover:underline">Details</span></p>
                                    </div>
                                </div>
                            </div>

                    </div>
            </div>




            {/* related products */}
            <div className=' my-20'>
                <SectionHeader sectionName={"Related Products"} sectionContent={"Some of related products"} />
                {isCategoryLoading ? (
                    <div className="flex justify-center items-center xl:h-screen text-lg font-semibold">Loading...</div>
                ) : (
                    <div className="slider-container px-10 py-5 border-b-1 mb-10">
                        <Slider {...settings}>
                            {productCategoryData?.data?.data.map((product) => (
                                <div key={product._id} className="group relative shadow-md hover:shadow-xl rounded-md h-96 bg-white p-4 overflow-hidden productAfter productBefore">
                                    
                                    <Link to={`/product/${product.category._id}/${product._id}`}>
                                        <div className="flex justify-center px-8 bg-[#f5f5f5] py-2">
                                            <img src={product.imageCover} alt={product.title} className="h-52 object-contain" />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h2 className="font-semibold text-gray-800 text-lg">{product.title.split(' ').length > 2 ? product.title.split(' ').slice(0, 2).join(' ') +"...." : product.title}</h2>
                                            <div className="mt-1 text-red-500 font-bold text-xl mr-4">{product.price}$</div>
                                            <div className="flex items-center justify-around gap-2 text-yellow-400">
                                                <div className=' flex '>
                                                    {[...Array(5)].map((_, i) => {
                                                        const index = i + 1;
                                                        if (product.ratingsAverage >= index) 
                                                        {
                                                            return <FaStar key={i} />; 
                                                        } 
                                                        else if (product.ratingsAverage >= index - 0.5) 
                                                        {
                                                            return <FaStar className="text-yellow-300" key={i} />; 
                                                        } 
                                                        else 
                                                        {
                                                            return <FaStar key={i} className="text-gray-300" />;
                                                        }
                                                    })}
                                                </div>
                                                <span className="text-gray-500 ml-2 text-sm">
                                                    ({product.ratingsQuantity || 0} Reviews ) 
                                                </span>                    
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="absolute top-6 right-2 flex flex-col space-y-2">
                                        <button onClick={() => toggleHeart(product._id)} className="cursor-pointer bg-white p-2 mb-4 rounded-full shadow hover:bg-gray-100">
                                            <GoHeartFill color={heartStates[product._id] ? "red" : "black"} />
                                        </button>
                                        <Link to={`/product/${product.category._id}/${product._id}`} className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                                            <MdOutlineRemoveRedEye />
                                        </Link>
                                    </div>

                                    <button disabled={cartLoading} onClick={()=> addProductToCart(product._id)} className=" flex justify-center items-center cursor-pointer absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full group-hover:bottom-[0%] transition-All duration-500  bg-black text-white px-6 py-2 rounded ">
                                        <IoCartOutline size={25} className='mx-2' /> Add To Cart
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>

        </div>
        </div>
        
    );
}
