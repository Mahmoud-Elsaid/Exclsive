





import React from 'react';
import { FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';

export default function Features() {
  return (
    <div className="container mx-auto py-10 my-20">
      <div className="flex justify-around items-center flex-wrap gap-6">

        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTruck className="text-2xl text-black" />
          </div>
          <h3 className="text-lg font-semibold">FREE AND FAST DELIVERY</h3>
          <p className="text-sm text-gray-600">Free delivery for all orders over $40</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeadset className="text-2xl text-black" />
          </div>
          <h3 className="text-lg font-semibold">24/7 CUSTOMER SERVICE</h3>
          <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShieldAlt className="text-2xl text-black" />
          </div>
          <h3 className="text-lg font-semibold">MONEY BACK GUARANTEE</h3>
          <p className="text-sm text-gray-600">We refund money within 30 days</p>
        </div>
      </div>
    </div>
  );
}