



import React from 'react'
import HeadeSidebar from './HeadeSidebar'
import HeaderCarousel from './HeaderCarousel'

export default function HeaderParent() {
    return (
        <div className=" mx-auto ">
            <div className='  flex flex-wrap'>
                <HeadeSidebar className="  "/>
                <HeaderCarousel className="  "/>
            </div>
        </div>
    )
}
