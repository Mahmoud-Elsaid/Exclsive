







import React from 'react';
import speaker from '../../assets/images/BOOMBOX.png';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import { Link } from 'react-router-dom';

export default function AdsComponent() {
    return (
            <div className="w-full container rounded-xl  mx-auto relative lg:flex p-10 bg-black my-15">


                <div className=' text-white '>
                    <h2 className="text-6xl font-bold mb-4">Enhance Your Music Experience</h2>
                    <div className="flex space-x-4 mb-6 my-10">
                        <div className="flex flex-col justify-center items-center w-[100px] h-[100px] rounded-full text-black bg-white border-[1px] ">
                            <span className="text-2xl font-semibold">23</span>
                            <span className="text-sm"> Days</span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100px] h-[100px] rounded-full text-black bg-white border-[1px]">
                            <span className="text-2xl font-semibold">05</span>
                            <span className="text-sm">Hours</span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100px] h-[100px] rounded-full text-black bg-white border-[1px]">
                            <span className="text-2xl font-semibold">59</span>
                            <span className="text-sm">Minutes</span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100px] h-[100px] rounded-full text-black bg-white border-[1px]">
                            <span className="text-2xl font-semibold">35</span>
                            <span className="text-sm">Seconds</span>
                        </div>
                    </div>
                    <button className="bg-green-500 text-white px-14 cursor-pointer text-center my-16 py-6 rounded-lg hover:bg-green-600">
                        <Link to="/products">Buy Now!</Link>
                    </button>
                </div>

                <div className=" h-56 md:h-96 w-1/2  overflow-hidden  ">
                    <img
                    src={speaker}
                    alt="speaker image"
                    className=" block w-full h-full   "
                    />
                </div>
        </div>
    )
}
