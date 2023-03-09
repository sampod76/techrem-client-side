import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    const handleLogOut = () => {
       
    }
    return (
        <div className='h-screen flex items-center justify-center text-center'>
            <div>
                <img className='w-[30%] mx-auto mb-3' src="https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/error-icon.png" alt="" />
                <p>Please <button onClick={handleLogOut} className='btn btn-ghost hover:underline hover:text-blue-500 btn-sm font-medium'>Log out</button> and log back in !!</p>
                
                <h3 className='text-4xl my-4'>{error.statusText || error.message}({error.status})</h3>
                <h4 className='text-2xl mb-2'>Something went wrong !!!</h4>
            </div>
        </div>
    );
};

export default ErrorPage;