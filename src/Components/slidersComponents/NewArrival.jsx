

import React from 'react'
import playstation from '../../assets/images/playstation.png';
import women from '../../assets/images/woman.png';
import perfume from '../../assets/images/perfume.png';
import speaker from '../../assets/images/speaker.png';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';

export default function NewArrival() {
  return (
    <div className="container mx-auto px-4 py-10 my-10">

        <SectionHeader sectionName={" Featured "} sectionContent={"New Arrival"}/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
        
        {/* PlayStation */}
            <div className="relative bg-black group rounded-xl overflow-hidden lg:h-[600px] p-10">
                <img src={playstation} alt="PlayStation 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-5 left-5 text-white">
                    <h2 className="text-xl font-semibold">PlayStation 5</h2>
                    <p className="text-sm text-gray-300">Black and White version of the PS5 coming out on sale.</p>
                    <button className="mt-2 underline font-medium hover:text-gray-200">Shop Now</button>
                </div>
            </div>

        {/* Right Group */}
            <div className="grid grid-rows-2 gap-6 lg:h-[600px] ">

                {/* Women */}
                <div className="relative group rounded-xl overflow-hidden ">
                    <img src={women} alt="Women’s Collections" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute bottom-5 left-5 text-white">
                    <h2 className="text-xl font-semibold">Women’s Collections</h2>
                    <p className="text-sm text-gray-300">Featured woman collections that give you another vibe.</p>
                    <button className="mt-2 underline font-medium hover:text-gray-200">Shop Now</button>
                    </div>
                </div>

            {/* Bottom (Speakers + Perfume) */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Speakers */}
                    <div className="relative group rounded-xl overflow-hidden bg-black p-10">
                        <img src={speaker} alt="Speakers" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute bottom-5 left-5 text-white">
                            <h2 className="text-lg font-semibold">Speakers</h2>
                            <p className="text-sm text-gray-300">Amazon wireless speakers</p>
                            <button className="mt-2 underline font-medium hover:text-gray-200">Shop Now</button>
                        </div>
                    </div>

                    {/* Perfume */}
                    <div className="relative group rounded-xl overflow-hidden bg-black p-10">
                        <img src={perfume} alt="Perfume" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute bottom-5 left-5 text-white">
                            <h2 className="text-lg font-semibold">Perfume</h2>
                            <p className="text-sm text-gray-300">GUCCI INTENSE OUD EDP</p>
                            <button className="mt-2 underline font-medium hover:text-gray-200">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

      </div>
    </div>
  )
}
