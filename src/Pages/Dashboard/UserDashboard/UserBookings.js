import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetUserBookingsQuery } from '../../../app/features/booking/bookingApi';
import LargeSpinner from '../../../component/spinner/LargeSpinner';
import SingleBookingHistory from '../ForAuthorities/BookingHistory/SingleBookingHistory';

const UserBookings = ({ userEmail }) => {
    const {pathname} = useLocation();
    const {dbUser} = useSelector((state)=> state.dbAuth);
    const { data, isLoading, isError, error } = useGetUserBookingsQuery({ email: dbUser?.email  });
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
    };
    if (isError) {
        if (error.error) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!isLoading && !data.success) {
        content = <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">{data.message}</p>
        </div>
    };
    if (!isLoading && data?.success) {
        content = <div className='grid grid-cols-1 gap-3'>
            {data.data.map(book => <SingleBookingHistory book={book} key={book._id} pathname={pathname}/>)}
        </div>
    };
    return (
        <div className='border w-full'>
            <h5 className='text-lg bg-gray-200 p-1 font-medium text-gray-500 text-center'>Your all Bookings</h5>
            <div>
                {content}
            </div>
        </div>
    );
};

export default UserBookings;