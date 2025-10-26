

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBasicData from '../../Hooks/getBasicData';
import Loading from '../Shared/Loading/Loading';
import FeatchError from '../Shared/FeatchError/FeatchError';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { GoHeartFill } from 'react-icons/go';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import Swal from 'sweetalert2';
import { CartContext } from './../../Context/CartContext/CartContext';
import { WishListContext } from '../../Context/WishListContext/WishListContext';
import { FaStar } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { UserAuthContext } from './../../Context/UserContext/UserAuthContext';

export default function HomeProducts() {
  const { data, isLoading, isError } = useBasicData("products");

  const [heartStates, setHeartStates] = useState({});
  const [heartLoadingId, setHeartLoadingId] = useState(null);
  const [cartLoadingId, setCartLoadingId] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, deleteWishlistProduct, getWishlist } = useContext(WishListContext);
  const { UserToken } = useContext(UserAuthContext);

  const toggleHeart = async (id) => {
    if (!UserToken) {
      await Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You must be logged in to use Wishlist",
        confirmButtonText: "OK"
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
      setHeartStates(prev => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: `${error}`,
        text: 'Please try again later',
        confirmButtonText: 'OK'
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
        text: "You must be logged in to use Wishlist",
        confirmButtonText: "OK"
      });
      return;
    }
    setCartLoadingId(productId);
    try {
      const response = await addToCart(productId);
      if (response.data.status === "success") {
        await Swal.fire({
          icon: 'success',
          title: 'Product added to Cart Successfully',
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
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: `${error}`,
        confirmButtonText: 'OK'
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
          icon: 'success',
          title: 'Product added to wishlist Successfully',
          confirmButtonText: 'OK'
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Unable to add to Wishlist',
          text: 'Please try again',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: `${error}`,
        text: 'Please try again later',
        confirmButtonText: 'OK'
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
          icon: 'success',
          title: 'Product Removed from wishlist Successfully',
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
      await Swal.fire({
        icon: 'error',
        title: `${error}`,
        text: 'Please try again later',
        confirmButtonText: 'OK'
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
          response.data.data.forEach(item => {
            initialHeartStates[item._id] = true;
          });
          setHeartStates(initialHeartStates);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchWishlist();
  }, [UserToken]);

  if (isLoading) return <Loading />;
  if (isError) return <FeatchError />;

  const limitedProducts = data?.data.slice(0, 12);

  return (
    <div className="container mx-auto py-10">
      <SectionHeader sectionName={"Our Products"} sectionContent={"Explore Our Products"} />
      <div className="flex flex-wrap justify-center">
        {limitedProducts.map((product) => (
          <div key={product._id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6'>
            <div className="w-full group relative bg-white shadow-md hover:shadow-xl rounded-md h-96 p-4 overflow-hidden product productAfter productBefore">
              <Link to={`/product/${product.category._id}/${product._id}`}>
                <div className="flex justify-center px-8 bg-[#f5f5f5] py-2">
                  <img src={product.imageCover} alt={product.title} className="h-52 object-contain" />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {product.title.split(' ').slice(0, 3).join(' ')}{product.title.split(' ').length > 3 ? '...' : ''}
                  </h2>
                  <div className='flex px-4 justify-center'>
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
                  <GoHeartFill color={heartStates[product._id] ? 'red' : 'black'} />
                </button>
                <Link to={`/product/${product.category._id}/${product._id}`} className="bg-white p-2 rounded-full shadow hover:bg-gray-1=200 dark:bg-gray-400">
                  <MdOutlineRemoveRedEye />
                </Link>
              </div>
              <button
                disabled={cartLoadingId === product._id}
                onClick={() => addProductToCart(product._id)}
                className="flex justify-center items-center cursor-pointer absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full group-hover:bottom-[0%] transition-All duration-500 bg-black text-white px-6 py-2 rounded disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {cartLoadingId === product._id ?<div className="animate-spin rounded-full h-8 w-8  border-t-4 border-black mb-4"></div>: (<><IoCartOutline size={25} className='mx-2' /> "Add To Cart" </> )} 
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/products"
          className="bg-mainColor text-white px-6 py-3 rounded hover:bg-mainColorHover transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
