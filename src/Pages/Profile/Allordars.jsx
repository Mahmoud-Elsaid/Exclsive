




import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";
import SectionHeader from "../../Components/Shared/SectionHeader/SectionHeader";
import { FaStar } from "react-icons/fa";
import Loading from "../../Components/Shared/Loading/Loading";

export default function AllOrders() {
    
    const undecodedToken = localStorage.getItem("UserToken");
    const decodedToken = jwtDecode(undecodedToken);
    console.log("decodedToken", decodedToken);

    function getAllOrders() {
        return axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
        );
    }

    const { data, isLoading } = useQuery({
        queryKey: ["getAllOrders"],
        queryFn: getAllOrders,
    });

    const orders = data?.data;

    if(isLoading) return<Loading/>

return (
    <div className="container mx-auto px-6 py-10">
        <div className="mb-10">
            <SectionHeader sectionName={" Orders "} sectionContent={" Check your Orders  "}/>
        </div>

        {orders && orders.length > 0 ? (
            orders.map((order, index) => (
            <div key={index} className="mb-16 border border-gray-600 rounded-2xl shadow-xl p-6">
                <h3 className="text-mainColor text-xl font-bold mb-4">
                Order Number {index + 1}
                </h3>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3 ml-4">
                <h5 className="text-gray-700">
                    Date:{" "}
                    <span className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                </h5>
                <h5 className="text-gray-700">
                    Is Delivered:{" "}
                    <span className="font-semibold">
                    {order.isDelivered ? "Yes" : "Not delivered yet"}
                    </span>
                </h5>
                </div>

                <hr className="border-mainColor border-2 my-6" />

                {order.cartItems.map((product, idx) => (
                <div key={idx} className="mb-6">
                    <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 sm:col-span-2">
                        <img
                        src={product.product.imageCover}
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                        alt={product.product.title}
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-8">
                        <div className="p-4">
                        <h3 className="text-lg font-bold">
                            {product.product.title}
                        </h3>
                        <h4 className="text-gray-600">
                            Quantity:{" "}
                            <span className="font-semibold">{product.count}</span>
                        </h4>
                        <h4 className="text-gray-600">
                            Price:{" "}
                            <span className="font-semibold">{product.price}</span>
                        </h4>
                        <div className="rating flex items-center">
                            <p className="font-normal text-lg leading-7 text-gray-700 mb-6  mr-2   "> Rating :{product.product.ratingsAverage} </p> <FaStar size={20} className=' text-yellow-400 mt-[-30px]'/>
                        </div>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-2 text-right">
                        <h3 className="text-lg font-bold">
                        {product.count * product.price} EGP
                        </h3>
                    </div>
                    </div>

                    <hr className="border-mainColor border my-5" />
                </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div>
                    <h3 className="text-lg font-bold">Payment</h3>
                    <h4 className="text-gray-700 mt-3">
                    Paid at:{" "}
                    <span className="font-semibold">
                        {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                    </h4>
                </div>

                <div>
                    <h3 className="text-lg font-bold">Delivery</h3>
                    <p className="text-gray-600">
                    Address:{" "}
                    <span className="font-semibold">
                        {order.shippingAddress.city}
                    </span>
                    </p>
                    <p className="text-gray-600">
                    Phone:{" "}
                    <span className="font-semibold">
                        {order.shippingAddress.phone}
                    </span>
                    </p>
                    <p className="text-gray-600">
                    Name:{" "}
                    <span className="font-semibold">
                        {order.shippingAddress.details}
                    </span>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold">
                    Total Order Price:{" "}
                    <span className="font-semibold">
                        {order.totalOrderPrice} EGP
                    </span>
                    </h3>
                </div>
                </div>
            </div>
            ))
        ) : (
            <div className="h-screen flex justify-center items-center">
                <h2 className="text-mainColor text-2xl font-bold">
                    There are no orders yet
                </h2>
            </div>
        )}
        </div>
    );
}
