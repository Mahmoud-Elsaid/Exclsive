



import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import forgetPassword from '../../../assets/Animations/Forgot Password.json';

export default function ForgetPassword() {

    let navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);

    async function submitForgetPassword(values){
        try {
            setIsLoading(true);
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
            if(data.statusMsg === "success") {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'success',
                    title: 'Verification Code Sent to Your mail',
                    text: 'Please check your mail',
                    confirmButtonText: 'OK'
                });
                navigate('/verificationCode');
            } else {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: 'Please try again',
                    confirmButtonText: 'OK',
                    footer:'Send verification code fail'
                });
            }
        } catch(error) {
            setIsLoading(false);
            await Swal.fire({
                icon: 'error',
                title: `${error.response?.data?.message || error.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer:'Send verification code fail'
            });
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email("email is required").required("email is required")
    });

    let formik = useFormik({
        initialValues: { email: '' },
        validationSchema,
        onSubmit: submitForgetPassword
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
            <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                <Lottie animationData={forgetPassword} loop={true} />
            </div>

            <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading my-10">
                        <h2 className="text-4xl font-bold font-serif my-5">Forget Password</h2>
                        <h4 className="text-md text-gray-400">No worries, we will send you instructions for reset</h4>
                    </div>

                    <div className="relative z-0 w-full my-5 group">
                        <input type="email" name="email" id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`formInput peer ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="email" className="formLabel">Email address</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
                        )}
                    </div>

                    <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={`formBtn w-full mt-10 py-2 ${(!formik.isValid || formik.isSubmitting) ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Send me code"}
                    </button>

                    <button className="w-full mt-5 py-2 text-black border border-solid border-black rounded-lg cursor-pointer hover:bg-black hover:border-none hover:text-white">
                        <Link to="/login">Back to Login</Link>
                    </button>
                </form>
            </div>
        </div>
    )
}
