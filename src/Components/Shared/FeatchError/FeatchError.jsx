

import ErrorImg from '../../../assets/Animations/404 Error Page.json'
import { Link } from 'react-router-dom';



import React from 'react'
import Lottie from 'lottie-react';

export default function FeatchError() {
    return (
        <div>
            <div className='w-full text-center  h-[800px] flex flex-col justify-center items-center'>
                <Lottie animationData={ErrorImg} className='w-96  h-96' loop={true} />
                <Link to="/"> <button className=' bg-mainColor  px-10 py-5 rounded-sm text-2xl text-white cursor-pointer hover:bg-mainColorHover'> Back Home </button></Link>
            </div>;     
        </div>
    )
}
