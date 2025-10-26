



import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaUsers, FaShoppingCart, FaGift, FaDollarSign   } from 'react-icons/fa';
import aboutImage from '../../assets/images/our story.png';
import { FaSackDollar } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";
import founder from '../../assets/images/founder.png';
import director from '../../assets/images/director.png';
import designer from '../../assets/images/desinger.png';
import Features from '../../Components/slidersComponents/Featured';
import SectionHeader from '../../Components/Shared/SectionHeader/SectionHeader';


export default function About() {
    return (
    

        <div className=' dark:mb-10'>
            <div className=' ml-20'>
                <SectionHeader sectionName={" About Us "} sectionContent={" Read More About Our Story "} />
            </div>


            <div className="container mx-auto px-4 py-16 space-y-20">
    
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-5xl font-bold my-10">Our Story</h2>
                    <p className="text-gray-500 leading-relaxed">
                            Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh.
                            Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands 
                            and serves 3 million customers across the region. <br /><br />
                            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in 
                            categories ranging from consumer.
                    </p>
                </div>

                <div>
                    <img src={aboutImage}  alt="Our Story" className="rounded-md w-full object-cover" />
                </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center ">


            <div className=" flex justify-center items-center border p-6 rounded shadow-sm h-80 group bg-white hover:bg-mainColor transition-all duration-500 cursor-pointer">
                <div>
                    <div className="icon h-20 w-20 rounded-full bg-black text-white mx-auto flex justify-center items-center mb-4 group-hover:bg-white  transition-all duration-500">
                        <FaUsers className="text-5xl mx-auto mb-2   group-hover:text-black" />
                    </div>
                    <span className="text-5xl font-bold group-hover:text-white my-10">10.5k</span>
                    <p className="text-gray-800 text-xl mt-4 group-hover:text-white">Sellers active our site</p>
                </div>
            </div>


            <div className=" flex justify-center items-center border p-6 rounded  shadow-sm h-80 bg-white group hover:bg-mainColor transition-all duration-500 cursor-pointer">

                <div>
                    <div className="icon h-20 w-20 rounded-full bg-black text-white mx-auto flex justify-center items-center mb-4 group-hover:bg-white  transition-all duration-500">
                        <CiDollar className="text-5xl mx-auto mb-2   group-hover:text-black" />
                    </div>
                    <span className="text-5xl font-bold group-hover:text-white my-10">33k</span>
                    <p className="text-gray-800 text-xl mt-4 group-hover:text-white">Monthly Product Sale</p>
                </div>
                
            </div>


            <div className="flex justify-center items-center border p-6 rounded hover:border-none shadow-sm h-80 bg-white group hover:bg-mainColor transition-all duration-500 cursor-pointer">
                <div>
                    <div className="icon h-20 w-20 rounded-full bg-black text-white mx-auto flex justify-center items-center mb-4 group-hover:bg-white  transition-all duration-500">
                        <FaGift className="text-5xl mx-auto mb-2   group-hover:text-black" />
                    </div>
                    <span className="text-5xl font-bold group-hover:text-white my-10">45.5k</span>
                    <p className="text-gray-800 text-xl mt-4 group-hover:text-white">Customer active in our site</p>
                </div>
            </div>


            <div className=" flex justify-center items-center border p-6 rounded hover:border-none shadow-sm h-80  bg-white group hover:bg-mainColor transition-all duration-500 cursor-pointer">
                <div>
                    <div className="icon h-20 w-20 rounded-full bg-black text-white mx-auto flex justify-center items-center mb-4 group-hover:bg-white  transition-all duration-500">
                        <FaSackDollar className="text-5xl mx-auto mb-2   group-hover:text-black" />
                    </div>
                    <span className="text-5xl font-bold group-hover:text-white my-10">25k</span>
                    <p className="text-gray-800 text-xl mt-4 group-hover:text-white">Annual gross sale in our site</p>
                </div>
            </div>


        </div>


        <div className="text-center">
            <div className="grid lg:grid-cols-3 gap-8 mt-10 p-10  ">
                
                <div className=' p-8'>
                    <div className="img bg-[#F5F5F5] p-8">
                            <img src={founder} alt="Team member" className="mx-auto rounded-md w-2/3 h-96 "/>
                    </div>
                    <div className=' '>
                        <h4 className="text-2xl font-semibold mt-4">Tom Cruise</h4>
                        <p className="text-gray-500 text-sm">Founder & Chairman</p>
                        <div className="flex justify-center gap-3 mt-2 text-gray-600">
                            <FaTwitter />
                            <FaInstagram />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>

                <div>
                    <div className=' p-8'>
                        <div className="img bg-[#F5F5F5] p-8">
                            <img src={director} alt="Team member" className="mx-auto rounded-md w-2/3 h-96 "/>
                        </div>
                        <h4 className="text-2xl font-semibold mt-4">Emma Watson</h4>
                        <p className="text-gray-500 text-sm">Managing Director</p>
                        <div className="flex justify-center gap-3 mt-2 text-gray-600">
                            <FaTwitter />
                            <FaInstagram />
                            <FaLinkedin />
                        </div>
                    </div>
                    
                </div>

                <div>
                    <div className=' p-8'>
                        <div className="img bg-[#F5F5F5] p-8">
                            <img src={designer} alt="Team member" className="mx-auto rounded-md w-2/3 h-96 "/>
                        </div>
                        <h4 className="text-2xl font-semibold mt-4">Will Smith</h4>
                        <p className="text-gray-500 text-sm">Product Designer</p>
                        <div className="flex justify-center gap-3 mt-2 text-gray-600">
                            <FaTwitter />
                            <FaInstagram />
                            <FaLinkedin />
                        </div>
                    </div>
                    
                </div>

            </div>
        
        </div>


        <Features/>

            </div>

        </div>
    
);
}

