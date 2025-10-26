







// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// import axios from 'axios';
// import {  Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react';
// import verifyCode from '../../../assets/Animations/verify code.json';

// import Lottie from 'lottie-react';
// import Swal from 'sweetalert2';



// export default function VerifyResetCode() {


//     let navigate = useNavigate();
//     const [IsLoading, setIsLoading] = useState(false);

//         async function submitVerifyResetCode(values){
//             try
//             {
//                 setIsLoading(true)
                
//                 let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values);
//                 console.log(data.status)
                
//                 if(data.status.toLowerCase() === 'success')
//                     {
//                         setIsLoading(false);
//                         await Swal.fire({
//                                 icon: 'success',
//                                 title: 'Verification Code is correct',
//                                 confirmButtonText: 'OK'
//                             });
//                         navigate('/resetPassword');
//                     }
//                 else if(data.statusMsg === "fail")
//                     {
//                         setIsLoading(false);
//                         await Swal.fire({
//                                 icon: 'error',
//                                 title: `${data.message}` ,
//                                 text: 'Please try again'  ,
//                                 confirmButtonText: 'OK',
//                                 footer: 'verification process failed'
                                            
//                             });
//                         // setErrorMessage(data.message);
//                     }
//             }
            
//             catch(error)
//             {
//                 setIsLoading(false)
//                 await Swal.fire({
//                         icon: 'error',
//                         title: `${error.response.data.message}` ,
//                         text: 'Please try again'  ,
//                         confirmButtonText: 'OK',
//                         footer: 'verification process failed'
//                     });
//                 // setErrorMessage(error.response.data.message);
//             }
//         }

//         let validationSchema = yup.object({
//             resetCode:yup.string().required("resetCode is required")
//         })

//     let formik = useFormik({
//         initialValues:{
//         resetCode:'',
//         }
//         ,validationSchema
//         , onSubmit:submitVerifyResetCode
//     })






//     return (
//         <div className=" flex justify-between items-center mt-10 mb-32 container mx-auto">
//             <div className="formImg w-[55%] hidden:md:w-full ">
//                 <div className="formImg">
//                     <Lottie animationData={verifyCode} loop={true} />
//                 </div>
//             </div>
            
//             <div className="myForm pr-[50px]  w-[35%] h-full  shadow-2xl shadow-gray-400 p-20" >
//                     <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
//                             <div className="formHeading my-10 text-center">
//                                 <h2 className=" text-4xl  font-bold my-5"> Verification Code</h2>
//                                 <h4 className="text-md text-gray-400 ">Check your mail , We sent a code to you </h4>
//                             </div>

//                             <div className="relative z-0 w-full my-5 group ">
//                                 <input type="text" name="resetCode" id="resetCode"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.resetCode}
//                                 className={`formInput peer ${formik.touched.resetCode && formik.errors.resetCode ? "border-red-500" : "border-green-500"}`}
//                                 placeholder=" " />
//                                 <label htmlFor="resetCode" className="formLabel"> code </label>
//                                 {formik.touched.resetCode && formik.errors.resetCode ? (
//                                     <p className="mt-2 text-sm text-red-500">{formik.errors.resetCode}</p>
//                                 ) : null}
//                             </div>

                        
                                
//                                 <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}className={`formBtn w-full mt-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
//                                     Submit
//                                 </button>

//                                 <button type="submit"   className={` w-full mt-10 py-2  text-black border border-solid border-black rounded-lg cursor-pointer hover:bg-black hover:border-none hover:text-white`}>
//                                     <Link to="/login">Back to Login</Link>
//                                 </button>
                                
//                     </form>

//             </div>
            
//         </div>
//     )
// }






import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import verifyCode from '../../../assets/Animations/verify code.json';

export default function VerifyResetCode() {

    let navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);

    async function submitVerifyResetCode(values){
        try {
            setIsLoading(true);
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
            if(data.status?.toLowerCase() === 'success') {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'success',
                    title: 'Verification Code is correct',
                    confirmButtonText: 'OK'
                });
                navigate('/resetPassword');
            } else {
                setIsLoading(false);
                await Swal.fire({
                    icon: 'error',
                    title: `${data.message}`,
                    text: 'Please try again',
                    confirmButtonText: 'OK',
                    footer: 'Verification process failed'
                });
            }
        } catch(error) {
            setIsLoading(false);
            await Swal.fire({
                icon: 'error',
                title: `${error.response?.data?.message || error.message}`,
                text: 'Please try again',
                confirmButtonText: 'OK',
                footer: 'Verification process failed'
            });
        }
    }

    let validationSchema = yup.object({
        resetCode: yup.string().required("resetCode is required")
    });

    let formik = useFormik({
        initialValues: { resetCode: '' },
        validationSchema,
        onSubmit: submitVerifyResetCode
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
            <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                <Lottie animationData={verifyCode} loop={true} />
            </div>

            <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
                <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="formHeading my-10 text-center">
                        <h2 className="text-4xl font-bold my-5">Verification Code</h2>
                        <h4 className="text-md text-gray-400">Check your mail, we sent a code to you</h4>
                    </div>

                    <div className="relative z-0 w-full my-5 group">
                        <input type="text" name="resetCode" id="resetCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.resetCode}
                            className={`formInput peer ${formik.touched.resetCode && formik.errors.resetCode ? "border-red-500" : "border-green-500"}`}
                            placeholder=" " />
                        <label htmlFor="resetCode" className="formLabel">Code</label>
                        {formik.touched.resetCode && formik.errors.resetCode && (
                            <p className="mt-2 text-sm text-red-500">{formik.errors.resetCode}</p>
                        )}
                    </div>

                    <button type="submit" disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} className={`formBtn w-full mt-10 py-2 ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {IsLoading ? "Loading..." : "Submit"}
                    </button>

                    <button className="w-full mt-5 py-2 text-black border border-solid border-black rounded-lg cursor-pointer hover:bg-black hover:border-none hover:text-white">
                        <Link to="/login">Back to Login</Link>
                    </button>
                </form>
            </div>
        </div>
    )
}

