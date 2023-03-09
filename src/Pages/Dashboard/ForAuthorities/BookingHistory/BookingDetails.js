import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { PhotoView } from 'react-photo-view';
import { useGetOneBookingQuery } from '../../../../app/features/booking/bookingApi';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
import axios from 'axios';
const BookingDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const { data, isLoading, isError, error } = useGetOneBookingQuery(id);
    const navigate = useNavigate();
    useEffect(() => {
        const loadedService = async () => {
            const res = await axios(`${process.env.REACT_APP_DEV_URL}/services/single-service/${data?.data?.serviceId}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                }
            });
            if (res.data.success) {
                setService(res.data.data);
            } else {
                console.log(res.data)
            }
        }
        loadedService();
    }, [data?.data?.serviceId])

    if (isLoading) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isError) {
        if (error.error) {
            return <h4 className='text-center mt-10 md:mt-20'>{error.error}</h4>
        } else {
            return <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!isLoading && !data.success) {
        return <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">{data.data.message}</p>
        </div>
    }
    const { image, serviceName, details, duration, price, _id, additionalHeading } = service;
    const { bookingExecutor, customerDetails, phoneNumber, date, serviceWorker, timeSlot, _id: bookingId } = data?.data;

    return (
        <div className='px-4 smm:px-8 lg:px-10 py-6 mdd:py-10   ml-2 md:mx-auto rounded-lg lg:mt-4 h-fit bg-slate-100'>
            <section className='border border-indigo-200 rounded-sm w-full max-w-md smm:max-w-lg mdd:max-w-xl lg:max-w-2xl mx-auto sm:pl-5 smm:pl-3 p-3 '>
                <div className='flex flex-col smm:flex-row justify-start items-center gap-4'>
                    <div className='h-52 w-64'>
                        <PhotoView src={image} >
                            <img className='w-full h-full rounded-md' src={image} alt="" />
                        </PhotoView>
                    </div>
                    <div>
                        <h3 className='text-2xl smm:text-3xl md:text-2xl mdd:text-3xl text-gray-500 font-medium font-sans mb-1'>Service - {serviceName}</h3>
                        <li className='smm:text-xl md:text-lg mdd:text-xl'>Sevice expens - {price} Taka</li>
                        <li className='text-gray-700'>Duration - {duration ? duration : "30"} minute.</li>
                        <li className='text-gray-700'>Service ID - {_id}</li>
                        <h5 className='mt-4'> {additionalHeading}</h5>
                    </div>
                </div>
                <hr className='h-[2px] bg-gray-300 my-6' />
                <div className='max-w-md mx-auto font-medium text-gray-600'>
                    <h3 className='text-lg text-blue-600 underline mb-4'>Booking Details</h3>
                    <h6><span className='w-20 inline-block'>Service</span>: {serviceName}</h6>
                    <h6><span className='w-20 inline-block'>Date-Time</span>: {new Date(date).toLocaleDateString() + "-" + timeSlot}</h6>
                    <h6><span className='w-20 inline-block'>Staff</span>: {serviceWorker}</h6>
                    <p><span className='w-20 inline-block'>Email </span>: {customerDetails?.name}</p>
                    <p className='mb-1'><span className='w-20 inline-block'>Phone </span>: {phoneNumber}</p>
                    <p><span className='w-20 inline-block'>booked by </span>: {bookingExecutor?.name}</p>
                    <h4><span className='w-20 inline-block'>Email</span>: {bookingExecutor?.email}</h4>

                    <div className='flex justify-center gap-3 items-center mt-6 mb-4 md:mt-10'>
                        <button
                            onClick={() => navigate(`/dashboard/order-confirm-form/${bookingId}`)}
                            className='bg-green-500 active:bg-cyan-500 active:outline outline-2 outline-indigo-600 hover:bg-green-600 py-2 px-3 rounded-md font-semibold text-white uppercase'
                        >Proceed Order</button>
                    </div>
                </div>
            </section>
            <div className='py-5'>
                <h3 className='text-xl'>Description</h3>
                <p>{details}</p>
            </div>
        </div>
    );
};
export default BookingDetails;