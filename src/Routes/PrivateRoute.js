import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../component/spinner/SmallSpinner';

const PrivateRoute = ({ children }) => {
    const {user, isLoading} = useSelector((state)=> state.auth);
    const location = useLocation();
    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><Spinner></Spinner></div>
    }
    if (user?.email) {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace/>
};

export default PrivateRoute;