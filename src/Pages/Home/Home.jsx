



import React from 'react'
import HeaderParent from '../../Components/Header/headerParent'
import SectionHeader from '../../Components/Shared/SectionHeader/SectionHeader';
import ComingSoon from '../../Components/slidersComponents/CategorySlider';
import CategorySlider from '../../Components/slidersComponents/CategorySlider';
import ComeingSoon from '../../Components/slidersComponents/ComeingSoon';
import NewArrival from '../../Components/slidersComponents/NewArrival';
import HomeProducts from '../../Components/slidersComponents/HomeProducts';
import AdsComponent from '../../Components/slidersComponents/AdsComponent';
import Features from '../../Components/slidersComponents/Featured';

export default function Home() {
    return (
        <>
            <div className=' container mx-auto'>
                <HeaderParent/>
            </div>

            

            <div className="coming">
                <ComeingSoon/>
            </div>


            <div className='category'>
                <CategorySlider/>
            </div>

            <div className="ads">
                <AdsComponent/>
            </div>


            
            <div>
                <HomeProducts/>
            </div>



            <div className=''>
                <NewArrival/>
            </div>



            <div>
                <Features/>
            </div>
            

            



            
        </>
        
    )
}
