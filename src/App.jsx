
import React, { Suspense, useContext, useEffect } from 'react';



import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import About from './Pages/About/About';
import Category from './Pages/Category/Category';
import Brands from './Pages/Brands/Brands';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import Wishlist from './Pages/Wishlist/Wishlist';
import Profile from './Pages/Profile/Profile';
import ForgetPassword from './Components/Auth/ForgetPassword/ForgetPassword';
import VerifyResetCode from './Components/Auth/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Components/Auth/ResetPassword/ResetPassword';
import CategoryProduct from './Pages/CategoryProducts/CategoryProduct';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CategorySlider from './Components/slidersComponents/CategorySlider';
import FeatchError from './Components/Shared/FeatchError/FeatchError';
import { UserAuthContext } from './Context/UserContext/UserAuthContext';
import OnlinePayment from './Components/OnlinePayment/OnlinePayment';
import AllOrders from './Pages/Profile/Allordars';
import ProfileDetails from './Pages/Profile/ProfileDetails';
import ProtectedRote from './Components/ProtectedRoutes/ProtectedRoutes';
import UpdateUserData from './Pages/Profile/UpdateUserData';
import ChangePassword from './Pages/Profile/ChangePassword';
const Products = React.lazy(()=>import("./Pages/Products/Products"));



let routes = createBrowserRouter([
        {path:'/' , element:<Layout/> , children:[

          //auth
            {path:"login" , element:<Login/>},
            {path:"register" , element:<Register/>},

            {path:'profile' , element: <ProtectedRote><Profile/></ProtectedRote>  , children:[
              {index:"/" , element:<ProfileDetails/>},
              {path:'profileDetails' , element:<ProfileDetails/>},
              {path:'UpdateProfile' , element:<UpdateUserData/>},
              {path:'changePassword' , element:<ChangePassword/>},
    ]},

            {path:"forgetPassword" , element:<ForgetPassword/>},
            {path:"verificationCode" , element:<VerifyResetCode/>},
            {path:"resetPassword" , element:<ResetPassword/>},


            
            //pages
            {index:true , element: <Home/>},
            {path:"home" , element:<Home/>},
            {path:"about" , element:<About/>},
            {path:"category" , element:<Category/>},
            {path:"brands" , element:<Brands/>},

            {path:"/products" , element: <Suspense  fallback={<h1>Loading...</h1>}><Products/></Suspense> },

            {path:"contact" , element:<Contact/>},
            {path:"cart" , element: <ProtectedRote><Cart/></ProtectedRote> },
            {path:"wishlist" , element: <ProtectedRote><Wishlist/></ProtectedRote> },
            


            {path:"CategorySlider" , element:<CategorySlider/>},
            {path:'categoryProducts/:categoryId' , element:<CategoryProduct/>},
            {path:`product/:productCategory/:productId` , element:<ProductDetails/>},
            {path:"*" , element:<FeatchError/> },
            {path:"onlinePayment" , element:<ProtectedRote><OnlinePayment/></ProtectedRote> },
            {path:"allorders" , element:<ProtectedRote><AllOrders/></ProtectedRote> },

        ]}
    ])



function App() {

  let { setUserToken, setUserData } = useContext(UserAuthContext);
    useEffect(()=>{
          setUserToken(localStorage.getItem("UserToken"));
          setUserData(JSON.parse(localStorage.getItem("userData")) );
      } , [])




      

    

  return <RouterProvider router={routes} ></RouterProvider>
}

export default App
