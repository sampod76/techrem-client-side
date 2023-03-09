import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { MdMedicalServices } from 'react-icons/md';
import { BsBookmarkCheck } from 'react-icons/bs';
import { RiCoinsLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import demoUser from '../../../asset/image/demoUser.jpg';
import { Link } from 'react-router-dom';
import { ImPencil2 } from 'react-icons/im';
import UserBookings from './UserBookings';
import LargeSpinner from '../../../component/spinner/LargeSpinner';

const UserDashboard = () => {
    const { dbUser: { email, name, userImage }, isLoading } = useSelector((state) => state.dbAuth);
    if(isLoading){
        return <LargeSpinner></LargeSpinner>
    }
    return (
        <div className='w-full mdd:max-w-[1000px] xl:max-w-[1300px] mx-auto p-4'>
            <div className='text-center'>
                <figure className='w-32  mdd:w-36 xl:w-40 h-32 mdd:h-36 xl:h-40 mx-auto rounded-full border-4 p-[2px] border-white relative'>
                    <div className='bg-green-500 rounded-full h-full w-full p-1'>
                        <div className='bg-white p-[2px] rounded-full'>
                            <img className='w-full h-full rounded-full' src={userImage || demoUser} alt="" />
                        </div>
                    </div>
                    <Link to={`/dashboard/update-ac/${email}`}><button className='border p-[6px] border-blue-500 active:border-white duration-100 text-lg font-medium  text-blue-600 hover:text-white hover:bg-blue-400 active:bg-blue-500 rounded-full absolute bottom-1 -right-1'><ImPencil2 /></button></Link>
                </figure>
                <h3 className='text-xl smm:text-2xl lg:text-3xl text-blue-500 capitalize'>{name}</h3>
                <h4 className=' text-sm smm:text-lg md:text-sm lg:text-xl'>{email}</h4>
                <hr className='h-[2px] w-10/12 max-w[800px] my-4 mx-auto bg-white ' />
            </div>
            <div className="grid grid-cols-1 smm:grid-cols-2 md:grid-cols-2 lgg:grid-cols-3 gap-4">
                <div className="border bg-blue-200 w-full p-4 rounded-sm shadow">
                    <div className='flex justify-start items-center gap-1 text-orange-500'>
                        <MdMedicalServices className='text-2xl mb-1' />
                        <p className='font-bold'>Complete</p>
                    </div>
                    <hr className='mb-3 h-[2px] bg-white' />
                    <div className='font-bold font-sans text-xl'>
                        <span >564.000</span>
                        <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                    </div>
                    <div className='flex justify-between'>
                        <p className=''>Total consume service</p>
                        <p className='font-semibold'>2</p>
                    </div>
                </div>
                <div className="border bg-blue-100 w-full p-4 rounded-sm shadow">
                    <div className='flex justify-start items-center gap-1 text-orange-500'>
                        <BsBookmarkCheck className='text-2xl mb-1' />
                        <p className='font-bold'>Bookings</p>
                    </div>
                    <hr className='mb-3 h-[2px] bg-white' />
                    <div className='font-bold font-sans text-xl'>
                        <span >6046.000</span>
                        <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                    </div>
                    <div className='flex justify-between'>
                        <p className=''>Total booking service</p>
                        <p className='font-semibold'>5</p>
                    </div>
                </div>
                <div className="border bg-green-200 w-full p-4 rounded-sm shadow">
                    <div className='flex justify-start items-center gap-1 text-orange-500'>
                        <RiCoinsLine className='text-2xl mb-1' />
                        <p className='font-bold'>Reword</p>
                    </div>
                    <hr className='mb-3 h-[2px] bg-white' />
                    <div className='font-bold font-sans text-xl'>
                        <span >240.00</span>
                        <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                    </div>
                    <div className='flex justify-between'>
                        <p className=''>Current reword coin</p>
                        <p className='font-semibold'>480</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 mdd:grid-cols-2 gap-4 mt-4'>
                <UserBookings userEmail={email}></UserBookings>
                <div className='border'>
                    <h5 className='text-lg bg-gray-200 p-1 font-medium text-gray-500 text-center'>Your all bookings</h5>

                </div>
            </div>
        </div >
    );
};

export default UserDashboard;