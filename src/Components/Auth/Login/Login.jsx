


import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import userProfile from '../../../assets/Animations/User Profile.json';
import { UserAuthContext } from '../../../Context/UserContext/UserAuthContext';

export default function Login() {
    let navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    let { setUserToken, setUserData } = useContext(UserAuthContext);

    async function submitLogin(values){
        try {
            setIsLoading(true);
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
            if(data.message === 'success'){
                setIsLoading(false);
                
                const user = data.user;
                localStorage.setItem("UserToken", data.token);
                localStorage.setItem('userData', JSON.stringify(user));
                setUserToken(data.token);
                setUserData(data.user);
                
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                });
            
                navigate('/home');
            } else {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: 'Please try again',
                    confirmButtonText: 'OK',
                    footer: 'Login fail'
                });
            }
        } catch(error) {
            setIsLoading(false);
            await Swal.fire({
                icon: 'error',
                title:`${error.response?.data?.message || error.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer: 'Login fail'
            });
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email("email is required").required("email is required"),
        password: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
    });

    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit: submitLogin
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
            <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                <Lottie animationData={userProfile} loop={true} />
            </div>

            <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading">
                        <h2 className="text-4xl font-bold font-serif">Log in to Exclusive</h2>
                        <h4 className="text-xl">Enter your details below</h4>
                    </div>

                    <div className="relative z-0 w-full my-10 group">
                        <input type="email" name="email" id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`formInput peer ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="email" className="formLabel">Email address</label>
                        {formik.touched.email && formik.errors.email && (<p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>)}
                    </div>

                    <div className="relative z-0 w-full my-10 group">
                        <input type={showPassword ? "text" : "password"} name="password" id="password"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.password}
                            className={`formInput peer ${formik.touched.password && formik.errors.password ? "border-red-500 dark:border-red-500" : "border-green-500 dark:border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="password" className="formLabel">Password</label>
                        <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-gray-500`}></i>
                        {formik.touched.password && formik.errors.password && (<p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>)}
                    </div>

                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full my-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Login"}
                    </button>

                    <div className='text-center'>
                        <Link className='text-mainColor text-xl hover:underline' to="/forgetPassword">Forget password?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
