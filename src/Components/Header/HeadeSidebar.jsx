




import React from 'react'
import { Link } from 'react-router-dom'

export default function HeadeSidebar() {
    return (
        <div className=' sideBar  pr-10   hidden  lg:w-1/4 lg:block '>
            <div className='  xl:pr-24'>
                <ul className=' border-r border-[#c1c1c1]  space-x-1 space-y-2 py-15'>
                    <li><Link to={`/categoryProducts/6439d58a0049ad0b52b9003f`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' >Woman's fashion </Link></li>
                    <li><Link to={`/categoryProducts/6439d5b90049ad0b52b90048`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' >men's fashion </Link></li>
                    <li><Link to={`/categoryProducts/6439d2d167d9aa4ca970649f`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > Electronics </Link></li>
                    <li><Link to={`/categoryProducts/6439d3e067d9aa4ca97064c3`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' >HOME&Life style </Link></li>
                    <li><Link to={`/categoryProducts/6439d30b67d9aa4ca97064b1`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > Beauty </Link></li>
                    <li><Link to={`/categoryProducts/6439d41c67d9aa4ca97064d5`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > SuperMarket </Link></li>
                    <li><Link to={`/categoryProducts/6439d40367d9aa4ca97064cc`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > Baby And Toys </Link></li>
                    <li><Link to={`/categoryProducts/6439d61c0049ad0b52b90051`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > Music </Link></li>
                    <li><Link to={`/categoryProducts/6439d3c867d9aa4ca97064ba`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > books </Link></li>
                    <li><Link to={`/categoryProducts/6439d2f467d9aa4ca97064a8`} className=' text-lg inline-block  hover:text-mainColor transform hover:translate-x-3 transition-all duration-300 ' > Mobiles </Link></li>
                </ul>
            </div>
            
        </div>
    )
}
