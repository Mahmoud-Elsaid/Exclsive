




import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserAuthContext } from '../../Context/UserContext/UserAuthContext';

export default function UpdateUserData() {
    const [IsLoading, setIsLoading] = useState(false);


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
            'https://ecommerce.routemisr.com/api/v1/users/updateMe',
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
            name: yup.string('name should be string').required("name is required").min(2 , "min length is 2 characters").max(20 , 'max length is 17 characters'),
            phone: yup.string().required('Phone number is required').matches(/^(\+20|0)(10|11|12|15)\d{8}$/,'Invalid Egyptian phone number format'),
            email: yup.string().email("email is required").required("email is required"),
    });

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
        },
        validationSchema,
        onSubmit: UpdateData
    });

    return (
        <div className="w-full  bg-white  rounded-2xl p-8 mx-auto">            

            <div className="myForm w-full    p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading">
                        <h2 className="text-4xl font-bold font-serif">Edit Your Profile</h2>
                        <h4 className="text-xl">Enter your details below</h4>
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

                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full my-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}
