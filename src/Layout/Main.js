import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/shared/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-[1900px] mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;