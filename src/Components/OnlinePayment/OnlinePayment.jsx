




import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { CartContext } from "../../Context/CartContext/CartContext";
import Lottie from "lottie-react";
import userProfile from '../../assets/Animations/User Profile.json';
import FeatchError from "../Shared/FeatchError/FeatchError";





export default function OnlinePayment() {


  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log(baseUrl)


    const { onlinePayment, getCart } = useContext(CartContext);
    const [cartId, setCartId] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function getCartId() {
        let cart = await getCart();
        const idForCart = cart.data.cartId;
        setCartId(idForCart);
    }

    useEffect(() => {
        getCartId();
    }, []);

    async function submitDetails(values) {
        setIsLoading(true);
        try {
            const response = await onlinePayment(cartId, values, baseUrl);
            window.location.href = response.data.session.url;
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    let validationSchema = yup.object({
        details: yup.string().required("Name is required").min(2).max(12),
        phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^(\+20|0)(10|11|12|15)\d{8}$/, "Invalid Egyptian phone number format"),
        city: yup.string().required("City name is required").min(2).max(20),
    });

    let formik = useFormik({
        initialValues: { details: "", phone: "", city: "" },
        validationSchema,
        onSubmit: submitDetails,
    });

    return (
            <>
            {cartId ? (
                    <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-32 container mx-auto">
                        <div className="formImg w-full md:w-[55%] mb-10 md:mb-0">
                            <Lottie animationData={userProfile} loop={true} />
                        </div>

                        <div className="myForm w-full md:w-[35%] shadow-2xl shadow-gray-400 p-10 md:pr-[50px]">
  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
    <div className="formHeading mb-10">
      <h2 className="text-4xl font-bold font-serif text-center">Pay Online</h2>
      <h4 className="text-xl text-center">Enter your information below</h4>
    </div>


    <div className="relative z-0 w-full my-10 group">
      <input
        type="text"
        name="details"
        id="details"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.details}
        className={`formInput peer ${
          formik.touched.details && formik.errors.details
            ? "border-red-500"
            : "border-green-500"
        }`}
        placeholder=" "
      />
      <label htmlFor="details" className="formLabel">Name</label>
      {formik.touched.details && formik.errors.details && (
        <p className="mt-2 text-sm text-red-500">{formik.errors.details}</p>
      )}
    </div>


    <div className="relative z-0 w-full my-10 group">
      <input
        type="tel"
        name="phone"
        id="phone"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        className={`formInput peer ${
          formik.touched.phone && formik.errors.phone
            ? "border-red-500"
            : "border-green-500"
        }`}
        placeholder=" "
      />
      <label htmlFor="phone" className="formLabel">Phone</label>
      {formik.touched.phone && formik.errors.phone && (
        <p className="mt-2 text-sm text-red-500">{formik.errors.phone}</p>
      )}
    </div>


    <div className="relative z-0 w-full my-10 group">
      <input
        type="text"
        name="city"
        id="city"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
        className={`formInput peer ${
          formik.touched.city && formik.errors.city
            ? "border-red-500"
            : "border-green-500"
        }`}
        placeholder=" "
      />
      <label htmlFor="city" className="formLabel">City</label>
      {formik.touched.city && formik.errors.city && (
        <p className="mt-2 text-sm text-red-500">{formik.errors.city}</p>
      )}
    </div>

    <button
      type="submit"
      disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
      className={`formBtn w-full my-10 py-2 ${
        !(formik.isValid && formik.dirty) || formik.isSubmitting
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      {formik.isSubmitting ? "Processing..." : "Submit"}
    </button>
  </form>
</div>

                    </div>
                
            ) : (
                        <div className="flex justify-center items-center h-[60vh]">
                            <FeatchError/>
                        </div>
            )}
            </>
    );
}
