


import loadingImg from '../../../assets/Animations/loading.json';
import Lottie from 'lottie-react';


import React from 'react'

export default function Loading() {
    return (
        <div>
            <div className='w-full text-center h-[800px] flex justify-center items-center'>
                <Lottie animationData={loadingImg} className='w-96  h-96' loop={true} />
        </div>;
        </div>
    )
}
