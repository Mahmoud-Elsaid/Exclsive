import { NavLink, Outlet } from 'react-router-dom';




export default function Profile() {

    
    return (
            <div className="min-h-screen py-12 bg-gray-200  dark:bg-gray-600">
                <div className="container mx-auto my-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                            <div>
                                <nav className="space-y-6"> 
                                    <NavLink 
                                        to="profileDetails" 
                                        className={({ isActive }) =>`block text-2xl font-semibold transition-all duration-300 ${
                                        isActive ? 'text-mainColor border-l-4 border-mainColor pl-3' : 'text-gray-700 hover:text-mainColorHover'}`}>
                                            Profile
                                    </NavLink>

                                    <NavLink to="UpdateProfile" className={({ isActive }) =>`block text-2xl font-semibold transition-all duration-300 ${isActive ? 'text-mainColor border-l-4 border-mainColor pl-3 dark:text-mainColor dark:border-l-4 dark:border-mainColor dark:pl-3 ' : 'text-gray-700 hover:text-mainColorHover dark:text-gray-200 dark:hover:text-mainColorHover'}`}>
                                            Edit Your Profile
                                    </NavLink>

                                    <NavLink 
                                        to="changePassword" 
                                        className={({ isActive }) =>`block text-2xl font-semibold transition-all duration-300 ${
                                        isActive ? 'text-mainColor border-l-4 border-mainColor pl-3' : 'text-gray-700 hover:text-mainColorHover'}`}>
                                            Change Password
                                    </NavLink>

                                    <NavLink
                                        to="/allorders"
                                        className={({ isActive }) =>
                                            `block text-2xl font-semibold transition-all duration-300 ${
                                            isActive? 'text-mainColor border-l-4 border-mainColor pl-3': 'text-gray-700 hover:text-mainColorHover'}`}>
                                                Your Orders
                                    </NavLink>
                                </nav>
                            </div>

                                <div className="md:col-span-2   shadow-lg rounded-2xl p-6">
                                    <Outlet />
                                </div>
                    </div>
                </div>
            </div>
    );
}
