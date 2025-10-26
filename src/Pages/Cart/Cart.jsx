import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './../../Context/CartContext/CartContext';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import { FaStar } from 'react-icons/fa';
import SectionHeader from './../../Components/Shared/SectionHeader/SectionHeader';
import Swal from 'sweetalert2';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    delete: null,
    update: null,
    deleteAll: false,
  });

  const { getCart, deleteCartProduct, updateProductsCount, deleteAllProducts } = useContext(CartContext);

  async function getCartProducts() {
    try {
      const response = await getCart();
      if (response?.status === 200) {
        setCart(response);
        setCartProducts(response.data.data.products);
      } else {
        Swal.fire('Error', 'Unable to fetch cart products', 'error');
      }
    } catch {
      Swal.fire('Error', 'Please try again later', 'error');
    }
  }

  async function deleteProduct(productId) {
    setLoadingStates(prev => ({ ...prev, delete: productId }));
    try {
      const response = await deleteCartProduct(productId);
      if (response.status === 200) {
        setCartProducts(response.data.data.products);
      } else {
        Swal.fire('Error', 'Unable to delete product', 'error');
      }
    } catch {
      Swal.fire('Error', 'Please try again later', 'error');
    } finally {
      setLoadingStates(prev => ({ ...prev, delete: null }));
    }
  }

  async function updateProductCount(productId, count) {
    if (count < 1) return;
    setLoadingStates(prev => ({ ...prev, update: productId }));
    try {
      const response = await updateProductsCount(productId, count);
      if (response.status === 200) {
        setCartProducts(response.data.data.products);
      } else {
        Swal.fire('Error', 'Unable to update count', 'error');
      }
    } catch {
      Swal.fire('Error', 'Please try again later', 'error');
    } finally {
      setLoadingStates(prev => ({ ...prev, update: null }));
    }
  }

  async function deleteAllCartProducts() {
    setLoadingStates(prev => ({ ...prev, deleteAll: true }));
    try {
      await deleteAllProducts();
      setCartProducts([]);
      Swal.fire('Deleted', 'All products deleted successfully', 'success');
    } catch {
      Swal.fire('Error', 'Please try again later', 'error');
    } finally {
      setLoadingStates(prev => ({ ...prev, deleteAll: false }));
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  if (!cartProducts) return <Loading />;

  return (
    <section className="ml-20 relative">
      <SectionHeader sectionName="Your Cart" sectionContent="Complete your Shopping" className="ml-20" />
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Shopping Cart
        </h2>

        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map((product) => (
              <div
                key={product.product._id}
                className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
              >
                <div className="col-span-12 lg:col-span-2 img box bg-gray-300 p-4 rounded-xl">
                  <Link to={`/product/${product.product.category._id}/${product.product._id}`}>
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
                    />
                  </Link>
                </div>

                <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                  <div className="flex items-center justify-between w-full mb-4">
                    <h5 className="font-manrope font-bold text-2xl leading-9 mx-8 text-gray-800">
                      {product.product.title}
                    </h5>
                    <button
                      onClick={() => deleteProduct(product.product._id)}
                      disabled={loadingStates.delete === product.product._id}
                      className={`rounded-full group flex items-center justify-center ${
                        loadingStates.delete === product.product._id
                          ? 'cursor-not-allowed opacity-60'
                          : 'cursor-pointer'
                      }`}
                    >
                      {loadingStates.delete === product.product._id ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-red-500"></div>
                      ) : (
                        <svg
                          width="54"
                          height="54"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="font-normal text-lg leading-7 text-gray-700 mb-6 mx-8">
                    Category:{product.product.category.name}
                  </p>
                  <p className="font-normal text-lg leading-7 text-gray-700 mb-6 mx-8">
                    Brands:{product.product.brand.name}
                  </p>
                  <div className="rating flex items-center">
                    <p className="font-normal text-lg leading-7 text-gray-700 mb-6 ml-8 mt-6 mr-2">
                      Rating :{product.product.ratingsAverage}
                    </p>
                    <FaStar size={20} className="text-yellow-400" />
                  </div>
                  <div className="flex justify-between items-center mx-8">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateProductCount(product.product._id, product.count - 1)
                        }
                        disabled={loadingStates.update === product.product._id}
                        className={`w-[35px] h-[35px] rounded-full border border-gray-200 flex items-center justify-center text-white bg-red-500 ${
                          loadingStates.update === product.product._id
                            ? 'cursor-not-allowed opacity-60'
                            : 'cursor-pointer'
                        }`}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={product.count}
                        readOnly
                        className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                      />
                      <button
                        onClick={() =>
                          updateProductCount(product.product._id, product.count + 1)
                        }
                        disabled={loadingStates.update === product.product._id}
                        className={`w-[35px] h-[35px] rounded-full border border-gray-200 flex items-center justify-center text-white bg-green-500 ${
                          loadingStates.update === product.product._id
                            ? 'cursor-not-allowed opacity-60'
                            : 'cursor-pointer'
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <h6 className="text-mainColor font-manrope font-bold text-2xl leading-9 text-right">
                      {product.price * product.count} EGP
                    </h6>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col md:flex-row items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
              <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
                Subtotal
              </h5>
              <div className="flex items-center justify-between gap-5">
                <h6 className="font-manrope font-bold text-3xl leading-10 ">
                  {cart.data.data.totalCartPrice} EGP
                </h6>
              </div>
            </div>

            <div className="text-end mt-5 mb-10">
              <button
                onClick={deleteAllCartProducts}
                disabled={loadingStates.deleteAll}
                className={`rounded-full py-2 px-4 bg-mainColor text-white font-semibold cursor-pointer ${
                  loadingStates.deleteAll
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-mainColorHover'
                }`}
              >
                {loadingStates.deleteAll ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                        Deleting...
                  </div>
                ) : (
                  'Delete All Products'
                )}
              </button>
            </div>

            <div className="max-lg:max-w-lg max-lg:mx-auto mt-6 flex justify-evenly gap-4 my-10 pt-20">
              <Link to="/onlinepayment" className="w-1/4">
                <button className="cursor-pointer rounded-full py-4 px-6 bg-mainColor text-white font-semibold text-lg w-full hover:bg-mainColorHover">
                  Online Payment
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-5 text-center p-15 mb-20 ">
            <h3 className="pt-5 text-2xl">Your cart is empty</h3>
            <Link to="/products" className="btn bg-main text-white mt-3">
              <button className="cursor-pointer bg-mainColor hover:bg-mainColorHover px-10 py-4 rounded-xl my-10">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
