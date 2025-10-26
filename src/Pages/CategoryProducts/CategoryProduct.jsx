// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Loading from '../../Components/Shared/Loading/Loading';
// import FeatchError from '../../Components/Shared/FeatchError/FeatchError';
// import { GoHeartFill } from 'react-icons/go';
// import { IoCartOutline } from "react-icons/io5";
// import { MdOutlineRemoveRedEye } from 'react-icons/md';
// import { FaStar } from 'react-icons/fa'; 
// import Swal from 'sweetalert2';
// import { CartContext } from '../../Context/CartContext/CartContext';
// import { WishListContext } from '../../Context/WishListContext/WishListContext';


// export default function CategoryProduct() {
//     const [heartStates, setHeartStates] = useState({});
//     const [wishListLoading, setWishListLoading] = useState(false);
//     const [cartLoading, setCartLoading] = useState(false);
//     const { categoryId } = useParams();

    
//     const { addToCart } = useContext(CartContext);
//     const { addToWishlist, deleteWishlistProduct, getWishlist } = useContext(WishListContext);
    


//     function getCategoryProducts() {
//         return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
//     }

//     const { data, isLoading, isError } = useQuery({
//         queryKey: ['getCategoryProducts', categoryId],
//         queryFn: getCategoryProducts,
//     });

//     // Wishlist Toggle
//     const toggleHeart = async (id) => {
//     setWishListLoading(true);
//     try {
//         if (!heartStates[id]) {
//             await addProductToWishlist(id);
//         } else {
//             await removeProductFromWishlist(id);
//         }
//         setHeartStates(prev => ({ ...prev, [id]: !prev[id] }));
//     } catch (error) {
//         console.error(error);
//         await Swal.fire({
//             icon: 'error',
//             title: 'Something went wrong',
//             text: 'Please try again later',
//             confirmButtonText: 'OK'
//         });
//     } finally {
//         setWishListLoading(false);
//     }
// };

// async function addProductToCart(productId) {
//     setCartLoading(true);
//     try {
//         let response = await addToCart(productId);
//         if (response.data.status === "success") {
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Product added to Cart Successfully',
//                 confirmButtonText: 'OK'
//             });
//         } else {
//             await Swal.fire({
//                 icon: 'error',
//                 title: 'Unable to add to Cart',
//                 text: 'Please try again',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         await Swal.fire({
//             icon: 'error',
//             title: 'Something went wrong',
//             text: 'Please try again later',
//             confirmButtonText: 'OK'
//         });
//     } finally {
//         setCartLoading(false);
//     }
// }

// async function addProductToWishlist(productId) {
//     setWishListLoading(true);
//     try {
//         let response = await addToWishlist(productId);
//         if (response.data.status === "success") {
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Product added to wishlist Successfully',
//                 confirmButtonText: 'OK'
//             });
//         } else {
//             await Swal.fire({
//                 icon: 'error',
//                 title: 'Unable to add to Wishlist',
//                 text: 'Please try again',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         await Swal.fire({
//             icon: 'error',
//             title: 'Something went wrong',
//             text: 'Please try again later',
//             confirmButtonText: 'OK'
//         });
//     } finally {
//         setWishListLoading(false);
//     }
// }

// async function removeProductFromWishlist(productId) {
//     setWishListLoading(true);
//     try {
//         let response = await deleteWishlistProduct(productId);
//         if (response.data.status === "success") {
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Product Removed from wishlist Successfully',
//                 confirmButtonText: 'OK'
//             });
//         } else {
//             await Swal.fire({
//                 icon: 'error',
//                 title: 'Unable to remove from Wishlist',
//                 text: 'Please try again',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         await Swal.fire({
//             icon: 'error',
//             title: 'Something went wrong',
//             text: 'Please try again later',
//             confirmButtonText: 'OK'
//         });
//     } finally {
//         setWishListLoading(false);
//     }
// }

// useEffect(() => {
//     async function fetchWishlist() {
//         try {
//             const response = await getWishlist();
//             if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                 const initialHeartStates = {};
//                 response.data.data.forEach(item => {
//                     initialHeartStates[item._id] = true;
//                 });
//                 setHeartStates(initialHeartStates);
//             }
//         } catch (error) {
//             console.error(error);
//             await Swal.fire({
//                 icon: 'error',
//                 title: 'Failed to load wishlist',
//                 text: 'Please try again later',
//                 confirmButtonText: 'OK'
//             });
//         }
//     }
//     fetchWishlist();
// }, []);

    

//     if (isLoading) return <Loading />;
//     if (isError) return <FeatchError />;
    

//     return (
//         <div>


//             {wishListLoading && (
//                 <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-semibold">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
//                     Updating Wishlist...
//                 </div>
//                 )}

//             {cartLoading && (
//                 <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-semibold">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
//                     Adding to Cart...
//                 </div>
//             )}

//             <div className="flex flex-wrap p-20">
//         {data?.data?.data && data?.data?.data.length > 0 ? (
//             data.data.data.map((product) => (
//             <div key={product._id} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-10  '>
            
//                                     <div className=" w-full group relative  bg-white shadow-md hover:shadow-xl rounded-md h-96  p-4  overflow-hidden productAfter productBefore">
            
//                                                 <Link to={`/product/${product.category._id}/${product._id}`}>
//                                                 <div className="flex justify-center px-8 bg-[#f5f5f5] py-2">
//                                                     <img src={product.imageCover} alt="Canon Camera" className="h-52  object-contain" />
//                                                 </div>
            
//                                                 <div className="mt-4 text-center">
//                                                     <h2 className="font-semibold text-gray-800 text-lg">{product.title.split(' ').length > 2 ? product.title.split(' ').slice(0, 2).join(' ') +"...." : product.title}</h2>
//                                                     <div className=' flex px-4'>
//                                                         <div className="mt-1 text-red-500 font-bold text-xl mr-4">{product.price}$</div>
                                                        
//                                                         <div className="flex items-center gap-2 text-yellow-400">
//                                                             {[...Array(5)].map((_, i) => {
//                                                                 const index = i + 1;
//                                                                 if (product.ratingsAverage >= index) 
//                                                                 {
//                                                                     return <FaStar key={i} />; 
//                                                                 } 
//                                                                 else if (product.ratingsAverage >= index - 0.5) 
//                                                                 {
//                                                                     return <FaStar className="text-yellow-300" key={i} />; 
//                                                                 } 
//                                                                 else 
//                                                                 {
//                                                                     return <FaStar key={i} className="text-gray-300" />;
//                                                                 }
//                                                             })}
//                                                             <span className="text-gray-500 ml-2 text-sm">
//                                                                 ({product.ratingsQuantity || 0} Reviews)
//                                                             </span>                    
//                                                         </div>
//                                                     </div>
//                                                 </div>
            
//                                                 </Link>
            
//                                                 <div className="absolute top-6 right-2 flex flex-col space-y-2   ">
//                                                     <button onClick={() => toggleHeart(product._id)} className=" cursor-pointer  bg-white p-2 mb-4 rounded-full shadow hover:bg-gray-100">
//                                                         <GoHeartFill color={heartStates[product._id] ? "red" : "black"} />
//                                                     </button>
            
//                                                     <Link to={`/product/${product.category._id}/${product._id}`} className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
//                                                         <MdOutlineRemoveRedEye />
//                                                     </Link>
//                                                 </div>
            
//                                                 <button disabled={cartLoading} onClick={()=> addProductToCart(product._id)} className=" flex justify-center items-center cursor-pointer absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full group-hover:bottom-[0%] transition-All duration-500  bg-black text-white px-6 py-2 rounded ">
//                                                     <IoCartOutline size={25} className='mx-2' /> Add To Cart
//                                                 </button>
            
//                                     </div>
            
//                             </div>
//             ))
//         ) : (
//             <h1 className="text-3xl font-bold text-center m-auto">No Products In This Category</h1>
//         )}
//         </div>
//         </div>
        
//     );
//     }








import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Components/Shared/Loading/Loading";
import FeatchError from "../../Components/Shared/FeatchError/FeatchError";
import { GoHeartFill } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext/CartContext";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { UserAuthContext } from "../../Context/UserContext/UserAuthContext";
import SectionHeader from "../../Components/Shared/SectionHeader/SectionHeader";

export default function CategoryProduct() {


    


    const { categoryId } = useParams();

    const [heartStates, setHeartStates] = useState({});
    const [heartLoadingId, setHeartLoadingId] = useState(null);
    const [cartLoadingId, setCartLoadingId] = useState(null);

    const { addToCart } = useContext(CartContext);
    const { addToWishlist, deleteWishlistProduct, getWishlist } = useContext(WishListContext);
    const { UserToken } = useContext(UserAuthContext);

  // fetch category products
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getCategoryProducts", categoryId],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`),
    });

    const toggleHeart = async (id) => {
        if (!UserToken) {
        await Swal.fire({
            icon: "warning",
            title: "Please login first",
            text: "You must be logged in to use Wishlist",
            confirmButtonText: "OK",
        });
        return;
        }
        setHeartLoadingId(id);
        try {
        if (!heartStates[id]) {
            await addProductToWishlist(id);
        } else {
            await removeProductFromWishlist(id);
        }
        setHeartStates((prev) => ({ ...prev, [id]: !prev[id] }));
        } catch (error) {
        await Swal.fire({
            icon: "error",
            title: `${error}`,
            text: "Please try again later",
            confirmButtonText: "OK",
        });
        } finally {
        setHeartLoadingId(null);
        }
    };

    async function addProductToCart(productId) {
        if (!UserToken) {
        await Swal.fire({
            icon: "warning",
            title: "Please login first",
            text: "You must be logged in to add products to Cart",
            confirmButtonText: "OK",
        });
        return;
        }
        setCartLoadingId(productId);
        try {
        const response = await addToCart(productId);
        if (response.data.status === "success") {
            await Swal.fire({
            icon: "success",
            title: "Product added to Cart Successfully",
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
        await Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: `${error}`,
            confirmButtonText: "OK",
        });
        } finally {
        setCartLoadingId(null);
        }
    }

    async function addProductToWishlist(productId) {
        setHeartLoadingId(productId);
        try {
        const response = await addToWishlist(productId);
        if (response.data.status === "success") {
            await Swal.fire({
            icon: "success",
            title: "Product added to wishlist Successfully",
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
        await Swal.fire({
            icon: "error",
            title: `${error}`,
            text: "Please try again later",
            confirmButtonText: "OK",
        });
        } finally {
        setHeartLoadingId(null);
        }
    }

    async function removeProductFromWishlist(productId) {
        setHeartLoadingId(productId);
        try {
        const response = await deleteWishlistProduct(productId);
        if (response.data.status === "success") {
            await Swal.fire({
            icon: "success",
            title: "Product Removed from wishlist Successfully",
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
        await Swal.fire({
            icon: "error",
            title: `${error}`,
            text: "Please try again later",
            confirmButtonText: "OK",
        });
        } finally {
        setHeartLoadingId(null);
        }
    }

    useEffect(() => {
        if (!UserToken) return;
        async function fetchWishlist() {
        try {
            const response = await getWishlist();
            if (response.data.status === "success" && Array.isArray(response.data.data)) {
            const initialHeartStates = {};
            response.data.data.forEach((item) => {
                initialHeartStates[item._id] = true;
            });
            setHeartStates(initialHeartStates);
            }
        } catch (error) {
            console.log(error);
        }
        }
        fetchWishlist();
    }, [UserToken]);



    const [categoryName, setCategoryName] = useState()
    async function getCategoryName(id){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        setCategoryName(data?.data?.name)
    }

    useEffect(()=>{
        getCategoryName(categoryId)
    },[categoryId])



    if (isLoading) return <Loading />;
    if (isError) return <FeatchError />;

    const categoryProducts = data?.data?.data || [];

    return (
        <div className="container mx-auto py-10">
        <SectionHeader sectionName={categoryName} sectionContent={`Explore Our ${categoryName} Products`} />
        <div className="flex flex-wrap justify-center">
            {categoryProducts.length > 0 ? (
            categoryProducts.map((product) => (
                <div key={product._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6">
                <div className="w-full group relative bg-white shadow-md hover:shadow-xl rounded-md h-96 p-4 overflow-hidden product productAfter productBefore">
                    <Link to={`/product/${product.category._id}/${product._id}`}>
                    <div className="flex justify-center px-8 bg-[#f5f5f5] py-2">
                        <img src={product.imageCover} alt={product.title} className="h-52 object-contain" />
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="font-semibold text-gray-800 text-lg">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                        {product.title.split(" ").length > 3 ? "..." : ""}
                        </h2>
                        <div className="flex px-4 justify-center">
                        <div className="mt-1 text-red-500 font-bold text-xl mr-4">{product.price}$</div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => {
                            const index = i + 1;
                            if (product.ratingsAverage >= index) {
                                return <FaStar key={i} className="text-yellow-400" />;
                            } else if (product.ratingsAverage >= index - 0.5) {
                                return <FaStar key={i} className="text-yellow-300" />;
                            } else {
                                return <FaStar key={i} className="text-gray-300" />;
                            }
                            })}
                            <span className="text-gray-500 ml-2 text-sm">
                            ({product.ratingsQuantity || 0} Reviews)
                            </span>
                        </div>
                        </div>
                    </div>
                    </Link>
                    <div className="absolute top-6 right-6 flex flex-col space-y-2">
                    <button
                        onClick={() => toggleHeart(product._id)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={heartLoadingId === product._id}
                    >
                        <GoHeartFill color={heartStates[product._id] ? "red" : "black"} />
                    </button>
                    <Link
                        to={`/product/${product.category._id}/${product._id}`}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
                    >
                        <MdOutlineRemoveRedEye />
                    </Link>
                    </div>
                    <button
                    disabled={cartLoadingId === product._id}
                    onClick={() => addProductToCart(product._id)}
                    className="flex justify-center items-center cursor-pointer absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full group-hover:bottom-[0%] transition-all duration-500 bg-black text-white px-6 py-2 rounded disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                    {cartLoadingId === product._id ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white"></div>
                    ) : (
                        <>
                        <IoCartOutline size={25} className="mx-2" /> Add To Cart
                        </>
                    )}
                    </button>
                </div>
                </div>
            ))
            ) : (
            <h1 className="text-3xl h-72 my-20 mt-40 font-bold text-center m-auto bg-gradient-to-r from-[#d53369] to-[#daae51] text-transparent bg-clip-text"> Products In This Category Coming Soon</h1>
            )}
        </div>
        </div>
    );
}
