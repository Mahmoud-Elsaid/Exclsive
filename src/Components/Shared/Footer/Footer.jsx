

// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import { QRCodeSVG } from "qrcode.react";
// import googlePlay from '../../../assets/images/google play.png'



// export default function Footer() {
//     return (
//         <footer className="bg-black text-white pt-10 pb-6 border-t border-gray-700">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//         {/* Column 1 */}
//         <div className="space-y-6 lg:col-span-2">
//           <h3 className="font-bold text-lg">Exclusive</h3>
//           <p className="text-lg ">Subscribe</p>
//           <p className="text-sm">Get 10% off your first order</p>
//           <form className="flex mt-2">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-3 py-1 rounded-l-md text-white border-solid border-1 border-white focus:border-gray-400 focus:outline-none"
//             />
//             <button className="bg-white text-black px-3 rounded-r-md">
//               <i className="fa-solid fa-paper-plane"></i>
//             </button>
//           </form>
//         </div>

//         {/* Column 2 */}
        
        
//         <div className="space-y-4 text-sm">
//           <h3 className="font-bold text-lg">Support</h3>
//           <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
//           <p>exclusive@gmail.com</p>
//           <p>+88015-88888-9999</p>
//         </div>

//         {/* Column 3 */}
        
        
//         <div className="space-y-4 text-sm">
//           <h3 className="font-bold text-lg">Account</h3>
//           <NavLink to="/profile" className="block hover:text-red-500">My Account</NavLink>
//           <NavLink to="/login" className="block hover:text-red-500">Login / Register</NavLink>
//           <NavLink to="/cart" className="block hover:text-red-500">Cart</NavLink>
//           <NavLink to="/wishlist" className="block hover:text-red-500">Wishlist</NavLink>
//           <NavLink to="/products" className="block hover:text-red-500">Shop</NavLink>
//         </div>

//         {/* Column 4 */}
        
        
//         <div className="space-y-4 text-sm">
//           <h3 className="font-bold text-lg">Quick Link</h3>
//           <NavLink to="/privacy" className="block hover:text-red-500">Privacy Policy</NavLink>
//           <NavLink to="/terms" className="block hover:text-red-500">Terms Of Use</NavLink>
//           <NavLink to="/faq" className="block hover:text-red-500">FAQ</NavLink>
//           <NavLink to="/contact" className="block hover:text-red-500">Contact</NavLink>
//         </div>

//         {/* Column 5 */}
        
        
//         <div className="space-y-4 text-sm lg:col-span-2">
//           <h3 className="font-bold text-lg">Download App</h3>
//           <p>Save $3 with App New User Only</p>
//           <div className="flex justify-between ">
//             <div className="QRCode w-[40%] pr-10">
//                 <QRCodeSVG value="https://www.linkedin.com/in/mahmoud-elsaid-a55a29239/"  />
//             </div>
            
//             <div className=' w-[50%]'>
//                 <a href="#"><img src={googlePlay} alt="Google Play" className="h-[50%]"/></a>
//                 <a href="#"><img src="/images/app-store.png" alt="App Store" className="h-[50%]"/></a>
//             </div>

//           </div>
//           <div className="flex space-x-3 mt-4 text-lg">
//             <a href="#" className="hover:text-red-500"><i className="fa-brands fa-facebook-f"></i></a>
//             <a href="#" className="hover:text-red-500"><i className="fa-brands fa-twitter"></i></a>
//             <a href="#" className="hover:text-red-500"><i className="fa-brands fa-instagram"></i></a>
//             <a href="#" className="hover:text-red-500"><i className="fa-brands fa-linkedin-in"></i></a>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-10 text-center text-sm text-gray-400">
//         © Copyright Rimel 2022. All rights reserved
//       </div>
//     </footer>
//   );

    
// }



import React from 'react';
import { NavLink } from 'react-router-dom';
import { QRCodeSVG } from "qrcode.react";
import googlePlay from '../../../assets/images/google-play-store.png';
import appStore from '../../../assets/images/AppStore.png'
export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-6 border-t border-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
        

        <div className="space-y-6 lg:col-span-2">
          <h3 className="font-bold text-lg">Exclusive</h3>
          <p className="text-lg ">Subscribe</p>
          <p className="text-lg ">Get 10% off your first order</p>
          <form className="flex mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[70%] px-3 py-1 rounded-l-md text-black border border-gray-300 focus:outline-none"
            />
            <button className="bg-white text-black px-3 rounded-r-md">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>


        <div className="space-y-6 text-lg  lg:col-span-1">
          <h3 className="font-bold text-lg">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>


        <div className="space-y-6 text-lg  lg:col-span-1">
          <h3 className="font-bold text-lg">Account</h3>
          <NavLink to="/profile" className="block hover:text-red-500">My Account</NavLink>
          <NavLink to="/login" className="block hover:text-red-500">Login / Register</NavLink>
          <NavLink to="/cart" className="block hover:text-red-500">Cart</NavLink>
          <NavLink to="/wishlist" className="block hover:text-red-500">Wishlist</NavLink>
          <NavLink to="/products" className="block hover:text-red-500">Shop</NavLink>
        </div>


        <div className="space-y-6 text-lg  lg:col-span-1">
          <h3 className="font-bold text-lg">Quick Link</h3>
          <NavLink to="/privacy" className="block hover:text-red-500">Privacy Policy</NavLink>
          <NavLink to="/terms" className="block hover:text-red-500">Terms Of Use</NavLink>
          <NavLink to="/faq" className="block hover:text-red-500">FAQ</NavLink>
          <NavLink to="/contact" className="block hover:text-red-500">Contact</NavLink>
        </div>


        <div className="space-y-6 text-lg  lg:col-span-2">
          <h3 className="font-bold text-lg">Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className="flex flex-wrap justify-between mt-2 w-[72%]">
            <div className="w-[47%] mb-2 lg:mb-0  ">
                <QRCodeSVG value="https://www.linkedin.com/in/mahmoud-elsaid-a55a29239/" className=" w-full h-auto" />
            </div>
            <div className="w-[47%] flex flex-col gap-6">
              <img src={googlePlay} alt=" Google Play" className=" w-[100%] mt-2 " />
              <img src={appStore}   alt=" App Store"   className="  w-[100%] mt-2 " />
            </div>
          </div>
          <div className="flex space-x-3 mt-4 text-lg">
            <a href="#" className="hover:text-red-500"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>

      </div>


      <div className="mt-10 text-center text-lg  text-gray-400">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
}
