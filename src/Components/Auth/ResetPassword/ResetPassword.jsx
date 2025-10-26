

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import userProfile from '../../../assets/Animations/User Profile.json';

export default function ResetPassword() {

    let navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function submitResetPassword(values){
        try {
            setIsLoading(true);
            let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            if(data.token) {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'success',
                    title: 'Reset password done correctly',
                    confirmButtonText: 'OK'
                });
                navigate('/login');
            } else {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: 'Please try again',
                    confirmButtonText: 'OK',
                    footer: 'Reset password process failed'
                });
            }
        } catch(error) {
            setIsLoading(false);
            await Swal.fire({
                icon: 'error',
                title: `${error.response?.data?.message || error.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer:'Reset password fail'
            });
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email("email is required").required("email is required"),
        newPassword: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/) 
    });

    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema,
        onSubmit: submitResetPassword
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
            <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                <Lottie animationData={userProfile} loop={true} />
            </div>

            <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading">
                        <h2 className="text-4xl font-bold font-serif">Reset Your Password</h2>
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
                        <input type={showPassword ? "text" : "password"} name="newPassword" id="newPassword"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.newPassword}
                            className={`formInput peer ${formik.touched.newPassword && formik.errors.newPassword ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="newPassword" className="formLabel">New Password</label>
                        <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-gray-500`}></i>
                        {formik.touched.newPassword && formik.errors.newPassword && (<p className="mt-2 text-sm text-red-500">{formik.errors.newPassword}</p>)}
                    </div>

                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full my-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    )
    
}
