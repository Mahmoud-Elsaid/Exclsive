




import React from 'react'
import Navbar from '../Components/Shared/Navbae/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Shared/Footer/Footer'

export default function Layout() {
    return (
        <div>
            <Navbar/>
                <div className="outlet mt-48">
                    <Outlet/>
                </div> 
            <Footer/>
            
        </div>
    )
}
