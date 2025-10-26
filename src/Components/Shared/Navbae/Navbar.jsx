import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { UserAuthContext } from "../../../Context/UserContext/UserAuthContext";
import { CountersContext } from "../../../Context/CountersContext/CountersContext";
import { CartContext } from "../../../Context/CartContext/CartContext";
import { WishListContext } from "../../../Context/WishListContext/WishListContext";
import Swal from "sweetalert2";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";

export default function Navbar() {

    const { theme, toggleTheme } = useTheme();



  const [menuOpen, setMenuOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { UserToken, setUserToken, setUserData } = useContext(UserAuthContext);
  const { numberOfCartItems, setNumberOfCartItems, numberWishlistItems, setNumberWishlistItems } = useContext(CountersContext);
  const { getCart } = useContext(CartContext);
  const { getWishlist } = useContext(WishListContext);

  const logOut = () => {
      localStorage.removeItem("UserToken");
      localStorage.removeItem("userData");
      setUserToken(null);
      setUserData(null);
      navigate("/login");
  };

  const getUserCart = async () => {
    try {
      const response = await getCart();
      if (response.data?.status === "success") {
        setNumberOfCartItems(response.data.numOfCartItems);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Cart didn't load",
          text: "Please try again later",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserWishlist = async () => {
    try {
      const response = await getWishlist();
      if (response.data?.status === "success") {
        setNumberWishlistItems(response.data.count);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Wishlist didn't load",
          text: "Please try again later",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (UserToken) {
      (async () => {
        await getUserCart();
        await getUserWishlist();
      })();
    }
  }, [UserToken]);

  const navLinkClass = ({ isActive }) => `mx-6 text-[18px] LinksAfter ${isActive ? "LinksActive" : "LinksHover"}`;

  return (
    <header className="w-full border-b-[.5px] border-[#d7d7d7] fixed top-0 left-0 z-50">
      <div className="bg-black  text-white text-sm py-2 px-5 flex justify-between items-center">
        <span className="w-[90%] text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <NavLink to="products" className="underline">Shop Now</NavLink>
        </span>
        <select className="bg-black text-white    text-sm focus:outline-none">
          <option>English</option>
          <option>Arabic</option>
        </select>
      </div>

      <nav className="bg-white dark:bg-gray-950 py-2">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <NavLink to="/" className="text-2xl font-bold tracking-wide text-gray-900">Exclusive</NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 font-medium items-center">
            <li><NavLink to="home" className={navLinkClass}>Home</NavLink></li>


            <li className="relative">
              <h2 onClick={() => setStoreDropdownOpen(!storeDropdownOpen)} className="flex cursor-pointer items-center gap-1 LinksAfter text-[18px] LinksHover">
                Store {storeDropdownOpen ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}
              </h2>
              {storeDropdownOpen && (
                <ul className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border rounded shadow-md z-10">
                  {["products", "category", "brands"].map((path) => (
                    <li key={path} className="px-4 py-2 hover:bg-gray-600">
                      <NavLink to={path} onClick={() => setStoreDropdownOpen(false)} className={navLinkClass}>{path.charAt(0).toUpperCase() + path.slice(1)}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><NavLink to="contact" className={navLinkClass}>Contact</NavLink></li>
            <li><NavLink to="about" className={navLinkClass}>About</NavLink></li>
            
            <li>
              {UserToken ? (
                <NavLink onClick={logOut} className="mx-6 text-[18px] LinksAfter LinksHover cursor-pointer">LogOut</NavLink>
              ) : (
                <NavLink to="register" className={navLinkClass}>Sign Up</NavLink>
              )}
            </li>
          </ul>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-3 text-gray-600 text-xl">
              
              <NavLink to="wishlist" className="relative cursor-pointer">
                <i className="fa-solid fa-heart mx-4"></i>
                {UserToken && <p className="absolute -top-2 -right-2 bg-mainColor text-white dark:text-white text-xs me-[16px] rounded-full px-1">{numberWishlistItems}</p>}
              </NavLink>
              
              <NavLink to="cart" className="relative cursor-pointer">
                <i className="fa-solid fa-cart-shopping mx-4"></i>
                {UserToken && <p className="absolute -top-2 -right-2 bg-mainColor  text-white dark:text-white text-xs me-[16px] rounded-full px-1">{numberOfCartItems}</p>}
              </NavLink>
              
              {UserToken && <NavLink to="profile" className={navLinkClass}><i className="fa-solid fa-user"></i></NavLink>}
              
                <h3
                    onClick={toggleTheme}
                    className=" cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    {theme === "light" ? <i className="fa-solid fa-moon"></i> : <MdOutlineLightMode />}
                </h3>
          </div>




          {/* Mobile Button */}
          <h3 className="lg:hidden text-gray-900 text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {!menuOpen ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
          </h3>
        </div>



        {/* Mobile Menu */}
        {menuOpen && (
          
          <ul className="lg:hidden bg-white dark:bg-black px-4 pb-4 space-y-2">
            
                {["home", "contact", "about", "register"].map((link) => (
                  <li key={link}>
                    <NavLink to={link} onClick={() => setMenuOpen(false)} className={({ isActive }) => `my-5 p-5 block dark:hover:bg-gray-700 ${isActive ? "LinksActive" : "LinksAfter"}`}>
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </NavLink>
                  </li>
                ))}

                <li>
                  <h3 onClick={() => setStoreDropdownOpen(!storeDropdownOpen)} className="cursor-pointer mb-10 pl-5 flex items-center gap-1 LinksAfter w-full">Store {storeDropdownOpen ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>} </h3>
                  {storeDropdownOpen && (
                      <ul className="pl-4 mt-1 ">
                        
                          {["products", "category", "brands"].map((path) => (
                                <li key={path}>

                                    <NavLink to={path} onClick={() => setMenuOpen(false)} className={({ isActive }) => `my-5 p-5 block dark:hover:bg-gray-700 ${isActive ? "LinksActive" : "LinksAfter"}`}>
                                        {path.charAt(0).toUpperCase() + path.slice(1)}
                                    </NavLink>

                                </li>
                          ))}

                      </ul>
                  )}
                </li>

            {/* Mobile Icons */}
                  <li className="mt-4 flex items-center space-x-4 text-xl">
                    
                        <NavLink to="wishlist" className="relative cursor-pointer">
                          <i className="fa-solid fa-heart mx-4"></i>
                            {UserToken && <p className="absolute -top-2 -right-2 bg-mainColor  text-white text-xs me-[16px] rounded-full px-1">{numberWishlistItems}</p>}
                        </NavLink>

                        <NavLink to="cart" className="relative cursor-pointer">
                          <i className="fa-solid fa-cart-shopping mx-4"></i>
                            {UserToken && <p className="absolute -top-2 -right-2 bg-mainColor text-white text-xs me-[16px] rounded-full px-1">{numberOfCartItems}</p>}
                        </NavLink>

                        {UserToken && (
                            <NavLink to="profile" className={({ isActive }) => isActive ? "LinksActive" : "LinksAfter"}>
                              <i className="fa-solid fa-user"></i>
                            </NavLink>
                          )}

                          <h3
                    onClick={toggleTheme}
                    className=" cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    {theme === "light" ? <i className="fa-solid fa-moon"></i> : <MdOutlineLightMode />}
                </h3>
                  </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
