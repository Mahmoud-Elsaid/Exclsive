




import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { UserAuthContext } from '../../Context/UserContext/UserAuthContext';

export default function ProfileDetails() {

    const { UserToken } = useContext(UserAuthContext);
  


  if (!UserToken) {
      Swal.fire({
        icon: "warning",
        title: "No User Data",
        text: "You must be logged in to get your data",
        confirmButtonText: "OK"
      });
      return;
    }
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log("mahmosd", user);

  return (
    <div className="w-full  bg-white  rounded-2xl p-8 mx-auto">

      <div className="text-center">
        <i className="fa-solid fa-address-card text-mainColor text-5xl"></i>
        <h2 className="text-mainColor font-bold text-3xl my-6">Simple Profile</h2>
        <hr className="border-maintext-mainColor border-2 w-24 mx-auto my-6 rounded-full" />
      </div>


      {user ? (
        <div className="text-lg space-y-5 text-gray-700 text-center md:text-left">
          <h3 className="font-bold">
            Name: <span className="text-mainColor font-semibold">{user.name}</span>
          </h3>
          <h3 className="font-bold">
            Email: <span className="text-mainColor font-semibold">{user.email}</span>
          </h3>
          <h3 className="font-bold">
            Role: <span className="text-mainColor font-semibold">{user.role}</span>
          </h3>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-gray-600 text-xl font-semibold">
            Please login again
          </h2>
        </div>
      )}
    </div>
  );
}
