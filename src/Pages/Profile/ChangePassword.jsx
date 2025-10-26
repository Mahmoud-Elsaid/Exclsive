









import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserAuthContext } from '../../Context/UserContext/UserAuthContext';

export default function ChangePassword() {
    const [IsLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setshowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showrePassword, setShowrePassword] = useState(false);

    let { setUserData } = useContext(UserAuthContext);
    

    function getAuthHeaders() {
        const token = localStorage.getItem("UserToken");
        return token ? { headers: { token } } : null;
    }

        async function UpdateData(values) {
        const config = getAuthHeaders();
        if (!config) return;

        try {
            setIsLoading(true);
            let { data } = await axios.put(
            'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
            values,
            config
            );

            if (data.message === "success") {
            const user = data.user;
            localStorage.setItem('userData', JSON.stringify(user));
            setUserData(user);

            await Swal.fire({
                icon: 'success',
                title: 'Your Data Updated correctly',
                confirmButtonText: 'OK'
            });
            } else {
            await Swal.fire({
                icon: 'error',
                title: `${data.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer: 'Updating Your Data process failed'
            });
            }
        } catch (error) {
            await Swal.fire({
            icon: 'error',
            title: `${error.response?.data?.message || error.message}`,
            text: 'Please try again',
            confirmButtonText: 'OK',
            footer: 'Updating Your Data fail'
            });
        } finally {
            setIsLoading(false);
        }
        }


    let validationSchema = yup.object({
            currentPassword: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
            password: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
            rePassword: yup.string().required("rePassword is required").oneOf([yup.ref("password") ] , "password and repassword isn't matching")
    });

    let formik = useFormik({
        initialValues:{
            currentPassword:'',
            password:'',
            rePassword:''
        },
        validationSchema,
        onSubmit: UpdateData
    });

    return (
        <div className="w-full  bg-white  rounded-2xl p-8 mx-auto">            

            <div className="myForm w-full    p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading">
                        <h2 className="text-4xl font-bold font-serif">Edit Your Password</h2>
                        <h4 className="text-xl">Enter your details below</h4>
                    </div>


                    <div className="relative z-0 w-full my-10 group">
                        <input type={showCurrentPassword ? "text" : "password"} name="currentPassword" id="currentPassword"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.currentPassword}
                            className={`formInput peer ${formik.touched.currentPassword && formik.errors.currentPassword ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="currentPassword" className="formLabel"> Current Password</label>
                        <i onClick={() => setshowCurrentPassword(!showCurrentPassword)} className={`fa-solid ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-gray-500`}></i>
                        {formik.touched.currentPassword && formik.errors.currentPassword && (<p className="mt-2 text-sm text-red-500">{formik.errors.currentPassword}</p>)}
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



                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full my-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}
