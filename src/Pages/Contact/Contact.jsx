


import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import SectionHeader from '../../Components/Shared/SectionHeader/SectionHeader';

export default function Contact() {
    return (

        <div>
                        <div className=' ml-20'>
                                    <SectionHeader sectionName={" Contact Us "} sectionContent={" many Ways To Contact With Us  "} />
                        </div>


            <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10">
        
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-8">
                
                    <div className="flex gap-4">
                            <div className="text-red-600 text-xl">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="font-semibold text-lg  ">Call To Us</p>
                                <p className="text-gray-400 my-6">We are available 24/7, 7 days a week.</p>
                                <p className="text-gray-500 my-6 font-medium mt-2">Phone: 01032578410</p>
                                <button  onClick={() => window.location.href = 'tel:01032578410'} className=" cursor-pointer bg-mainColor text-white px-6 py-3 rounded-full hover:bg-mainColorHover transition flex items-center gap-2"> 
                                    Call Us Now
                                </button>
                            </div>
                    </div>

                <hr />

                <div className="flex gap-4">
                    <div className="text-red-600 text-xl mt-1">
                        <FaEnvelope />
                    </div>
                    <div>
                        <p className="font-semibold text-lg ">Write To US</p>
                        <p className="text-gray-400 my-6">Fill out our form and we will contact you within 24 hours.</p>
                        <div className=' my-10'>
                            <a href='mailto:mahmoudelsaid560@gmail.com' className="  text-gray-800   text-xl mt-2 cursor-pointer"> <p className=' '> Emails: mahmoudelsaid560@gmail.com</p> </a><br/>
                        </div>

                        <div className=' my-10'>
                            <a href='mailto:mahmoudelsaid560@gmail.com' className="  text-gray-800  text-xl mt-2 cursor-pointer"> <p  className=' '>Emails: support@exclusive.com</p>  </a><br/>
                        </div>
                    </div>
                </div>
        </div>

        
        <div className="border border-gray-400 rounded-md p-6 shadow-sm">
            <form className="space-y-4">
                
                <div className="grid md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Your Name *" required className="p-3 border border-gray-200 rounded-md bg-gray-50  dark:bg-gray-800 w-full" />
                    <input type="email" placeholder="Your Email *" required className="p-3 border border-gray-200 rounded-md bg-gray-50  dark:bg-gray-800 w-full"/>
                    <input type="tel"placeholder="Your Phone *" required className="p-3 border border-gray-200 rounded-md bg-gray-50  dark:bg-gray-800 w-full"/>
                </div>

                    <textarea
                        rows="6" placeholder="Your Massage"className="w-full p-3 border border-gray-200 rounded-md bg-gray-50"
                    ></textarea>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-mainColor text-white px-6 py-2 rounded-md hover:bg-mainColorHover cursor-pointer transition">
                                Send Massage
                        </button>
                    </div>
            </form>
        </div>

      </div>
    </div>

        </div>
        
  );
}
