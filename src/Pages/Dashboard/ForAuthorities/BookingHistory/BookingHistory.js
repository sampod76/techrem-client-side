import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetAllBookingQuery } from '../../../../app/features/booking/bookingApi';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
import SingleBookingHistory from './SingleBookingHistory';

const BookingHistory = () => {
    const { pathname } = useLocation();
    const {dbUser }= useSelector((state)=> state.dbAuth);
    const [queryData, setQueryData] = useState({ keyword: "" })
    const { data, isLoading, isError, error } = useGetAllBookingQuery(queryData);
    const dashboard = pathname === "/dashboard" ? true : false;

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
        const oneDayAfter = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
        const upComingBooking = data.data.filter(service => new Date(service.date).toLocaleDateString() === oneDayAfter)
        if (dashboard && dbUser?.role === "admin") {
            content = <div className='grid grid-cols-1 gap-3'>
                {upComingBooking.slice(0, 20).map(book => <SingleBookingHistory book={book} key={book._id} pathname={pathname} />)}
            </div>
        } else {
            content = <div className='grid grid-cols-1 gap-3'>
                {data.data.map(book => <SingleBookingHistory book={book} key={book._id} pathname={pathname} />)}
            </div>
        }
    };
    return (
        <div className={`bg-gray-100 w-full rounded-t-md mt-1 ${dashboard ? "px-0" : "p-3 mdd:px-0 lg:px-8"}`}>
            <div className='max-w-6xl xl:max-w-7xl mx-auto'>
                {dashboard || <header>
                    <h2 className='text-2xl font-semibold mb-5'>All Booking History</h2>
                </header>}
                <main>
                    <table className="table text-left w-full">
                        {dashboard || <thead>
                            <div className='border-b grid grid-cols-9 pl-3 py-1 mb-6'>
                                <th className='col-span-3 ml-3'>Service</th>
                                <th className='col-span-2 ml-3'>Staff-Slot</th>
                                <th className='col-span-2 text-center'>Executor</th>
                                <th className='col-span-1 mr-3 text-right'>Type</th>
                                <th className='col-span-1'></th>
                            </div>
                        </thead>}
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default BookingHistory;