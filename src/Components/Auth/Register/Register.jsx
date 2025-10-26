

import React, {  useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import userProfile from '../../../assets/Animations/User Profile.json';

export default function Register() {
    let navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showrePassword, setShowrePassword] = useState(false);


    async function submitRegister(values){
        try {
            setIsLoading(true);
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
            if(data.message === 'success'){
                setIsLoading(false);
                
                await Swal.fire({
                    icon: 'success',
                    title: 'Registration done correctly',
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
                    footer: 'Registration process failed'
                });
            }
        } catch(error) {
            setIsLoading(false);
            await Swal.fire({
                icon: 'error',
                title: `${error.response?.data?.message || error.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer: 'Registration failed'
            });
        }
    }

    let validationSchema = yup.object({
        name: yup.string('name should be string').required("name is required").min(2 , "min length is 2 characters").max(10 , 'max length is 10 characters'),
        phone: yup.string().required('Phone number is required').matches(/^(\+20|0)(10|11|12|15)\d{8}$/,'Invalid Egyptian phone number format'),
        email: yup.string().email("email is required").required("email is required"),
        password: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
        rePassword: yup.string().required("rePassword is required").oneOf([yup.ref("password") ] , "password and repassword isn't matching")
    });

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
        },
        validationSchema,
        onSubmit: submitRegister
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
            <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                <Lottie animationData={userProfile} loop={true} />
            </div>

            <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading">
                        <h2 className="text-4xl font-bold font-serif">Create an account</h2>
                        <h4 className="text-xl py-5">Enter your details below</h4>
                    </div>

                    <div className="relative z-0 w-full my-10 group">
                        <input type="text" name="name" id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`formInput peer ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="name" className="formLabel">First name</label>
                        {formik.touched.name && formik.errors.name && (<p className="mt-2 text-sm text-red-500">{formik.errors.name}</p>)}
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

                    <div className="relative z-0 w-full mb-10 group">
                        <input type="tel" name="phone" id="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className={`formInput peer ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="phone" className="formLabel">Phone number (01032578410)</label>
                        {formik.touched.phone && formik.errors.phone && (<p className="mt-2 text-sm text-red-500">{formik.errors.phone}</p>)}
                    </div>

                    <div className="relative z-0 w-full my-10 group">
                        <input type={showPassword ? "text" : "password"} name="password" id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`formInput peer ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="password" className="formLabel">Password</label>
                        <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-gray-500`}></i>
                        {formik.touched.password && formik.errors.password && (<p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>)}
                    </div>

                    <div className="relative z-0 w-full my-10 group">
                        <input type={showrePassword ? "text" : "password"} name="rePassword" id="rePassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rePassword}
                            className={`formInput peer ${formik.touched.rePassword && formik.errors.rePassword ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="rePassword" className="formLabel">Confirm password</label>
                        <i onClick={() => setShowrePassword(!showrePassword)} className={`fa-solid ${showrePassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-gray-500`}></i>
                        {formik.touched.rePassword && formik.errors.rePassword && (<p className="mt-2 text-sm text-red-500">{formik.errors.rePassword}</p>)}
                    </div>

                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full mt-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Register"}
                    </button>

                    <div className="haveAcount mt-10 text-center">
                        <h3 className='text-xl'>Already Have An Account? <Link className='text-2xl text-mainColor hover:underline' to="/login">Login</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
}
