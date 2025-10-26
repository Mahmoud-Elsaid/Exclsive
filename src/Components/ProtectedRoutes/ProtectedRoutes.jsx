



import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';


export default  function ProtectedRote({children}) {

    if(localStorage.getItem("UserToken")){
        return children
    }
    else
    {
        Swal.fire({
                icon: 'warning',
        title: 'Please login first',
        text: ' You Should Be Logged in To Do This Action ',
        confirmButtonText: 'OK'
            });
        return <>
            <Navigate to='/login'/>
            
        </>
    }

}