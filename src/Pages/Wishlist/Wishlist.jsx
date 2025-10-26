



import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext/WishListContext'
import { CartContext } from '../../Context/CartContext/CartContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { GoHeartFill } from 'react-icons/go';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoCartOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import Loading from '../../Components/Shared/Loading/Loading';
import SectionHeader from '../../Components/Shared/SectionHeader/SectionHeader';

export default function Wishlist() {

    const [wishlistProducts , setWishlistProducts] = useState([]);
    const [wishListLoading , setWishListLoading] = useState(false);
    const [isLoading , setIsLoading] = useState(false); 
    const [cartLoading , setCartLoading] = useState(false);
    const [heartStates, setHeartStates] = useState({});
    
    let {  getWishlist, deleteWishlistProduct } = useContext(WishListContext);


    const toggleHeart = async (id) => {
    setWishListLoading(true);
    try {
        if (!heartStates[id]) {
            console.log("id", id);
        } else {
            await removeProductFromWishlist(id);
        }
        setHeartStates(prev => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
        console.error(error);
        await Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: 'Please try again later',
            confirmButtonText: 'OK'
        });
    } finally {
        setWishListLoading(false);
    }
};

let { addToCart } = useContext(CartContext);

async function addProductToCart(productId) {
    setCartLoading(true);
    try {
        let response = await addToCart(productId);
        if (response.data.status === "success") {
            await Swal.fire({
                icon: 'success',
                title: 'Product added to Cart Successfully',
                text: 'check your wishlist',
                confirmButtonText: 'OK'
            });
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Unable to add to Cart',
                text: 'Please try again',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error(error);
        await Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: 'Please try again later',
            confirmButtonText: 'OK'
        });
    } finally {
        setCartLoading(false);
    }
}

async function removeProductFromWishlist(productId) {
    setWishListLoading(true);
    try {
        let response = await deleteWishlistProduct(productId);
        if (response.data.status === "success") {
            setWishlistProducts(prev => prev.filter(product => product._id !== productId));
            await Swal.fire({
                icon: 'success',
                title: 'Product Removed from wishlist Successfully',
                text: 'check your wishlist',
                confirmButtonText: 'OK'
            });
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Unable to remove from Wishlist',
                text: 'Please try again',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error(error);
        await Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: 'Please try again later',
            confirmButtonText: 'OK'
        });
    } finally {
        setWishListLoading(false);
    }
}

useEffect(() => {
    async function fetchWishlist() {
        setIsLoading(true);
        try {
            const response = await getWishlist();
            if (response.data.status === "success" && Array.isArray(response.data.data)) {
                setWishlistProducts(response.data.data);
                const initialHeartStates = {};
                response.data.data.forEach(item => {
                    initialHeartStates[item._id] = true;
                });
                setHeartStates(initialHeartStates);
            } else {
                setWishlistProducts([]);
            }
        } catch (error) {
            console.error(error);
            setWishlistProducts([]);
            await Swal.fire({
                icon: 'error',
                title: 'Failed to load wishlist',
                text: 'Please try again later',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    }
    fetchWishlist();
}, []);


        if (isLoading) return <Loading/>

    return (
        <div>
            <div className=' ml-20'>
                                        <SectionHeader sectionName={" Wishlist "} sectionContent={"Check your Wishlist "} />
            </div>
            
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
            <div className=" mx-auto mb-20">
                <h2 className=' text-2xl ml-20 mt-20' >WishList ( <span className=' text-mainColor'> {wishlistProducts.length}  items</span> )</h2>
                <div className="flex flex-wrap lg:px-32  ">
                    {wishlistProducts && wishlistProducts.length > 0 ? wishlistProducts.map((product)=>(
                    <div key={product._id} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-10  '>

                        <div className=" w-full group relative  bg-white shadow-md hover:shadow-xl rounded-md h-96  p-4  overflow-hidden productAfter productBefore">

                                    <Link to={`/product/${product.category._id}/${product._id}`}>
                                    <div className="flex justify-center px-8 bg-[#f5f5f5] py-2">
                                        <img src={product.imageCover} alt="Canon Camera" className="h-52  object-contain" />
                                    </div>

                                    <div className="mt-4 text-center">
                                        <h2 className="font-semibold text-gray-800 text-lg">{product.title.split(' ').length > 2 ? product.title.split(' ').slice(0, 2).join(' ') +"...." : product.title}</h2>
                                        <div className=' flex px-4'>
                                            <div className="mt-1 text-red-500 font-bold text-xl mr-4">{product.price}$</div>
                                            
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
                                                    ({product.ratingsQuantity || 0} Reviews)
                                                </span>                    
                                            </div>
                                        </div>
                                    </div>

                                    </Link>

                                    <div className="absolute top-6 right-2 flex flex-col space-y-2   ">
                                        <button onClick={() => toggleHeart(product._id)} className=" cursor-pointer  bg-white p-2 mb-4 rounded-full shadow hover:bg-gray-100">
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

                </div>
                )):<div className=' text-3xl font-bold text-gray-800 h-screen w-full flex justify-center items-center'>No Products in Wishlist</div>}
                </div>
            </div>
        </div>
    )
}
