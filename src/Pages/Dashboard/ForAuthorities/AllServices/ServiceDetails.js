import React from 'react';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import { PhotoView } from 'react-photo-view';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetOneServiceQuery } from '../../../../app/features/product/serviceApi';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
const ServiceDetails = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useGetOneServiceQuery(id);
    const navigate = useNavigate();
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
    const { image, serviceName, details, additionalHeading, category, updatedAt, active, createdAt, duration, price, _id } = data?.data;
    return (
        <div className='w-full px-4 mdd:px-6 lg:px-10 bg-gray-100'>
            <section className='flex flex-col-reverse mdd:flex-row justify-between gap-2 py-12'>
                <div>
                    <PhotoView src={image}>
                        <img src={image} className="max-w-sm" alt="" />
                    </PhotoView>
                    <h5 className='text-lg font-semibold'>Heading: {additionalHeading}</h5> 
                </div>
                <div className='px-4 flex flex-col justify-between'>
                    <div>
                        <h3 className='text-5xl text-gray-500 font-sans mb-2'>{serviceName}</h3>
                        <h4 className='text-4xl my-2'>Price: {price}<TbCurrencyTaka className='inline-block mb-2 -ml-2' /></h4>
                        <h4 className='text-lg font-semibold text-gray-700'>Duration: {duration ? duration : "30"} minute.</h4>
                        <h4 className='text-lg my-1'>Reserve: {active ? <span className='font-semibold bg-green-400 px-2 py-1 rounded text-blue-100'>Active</span> : <span className='font-semibold bg-red-500 px-2 py-1 rounded text-blue-100'> Deactive</span>}</h4>
                        <h5>Category: {category?.mainCategory}, {category?.subCategory1}</h5>
                        <h4 className='text-lg '>Service: Saturday to Thursday</h4>
                        <h4 className='mt-3'>Posted At: {new Date(createdAt).toLocaleString()}</h4>
                        <h4 className=''>Last Updated: {new Date(updatedAt).toLocaleString()}</h4>
                    </div>
                    <div className='flex justify-start gap-3 mt-4 items-center'>
                        <button
                            onClick={() => navigate(`/dashboard/offline-booking-form/${_id}`, { state: data?.data })}
                            className=' py-1 px-[6px] font-semibold text-white rounded-md bg-cyan-500 active:bg-cyan-600 hover:bg-gray-400'
                        >
                            Booking
                        </button>
                        <button className=' py-1 px-2 font-semibold text-white rounded-md bg-blue-500 active:bg-blue-600 hover:bg-gray-400'>
                            Order
                        </button>
                        <Link to={`/dashboard/activity-log/${_id}`}>
                            <button className=' py-1 px-2 font-semibold text-white rounded-md bg-red-300 active:bg-red-400 hover:bg-gray-400'>
                                Activity
                            </button>
                        </Link>
                        <button
                            onClick={() => navigate(`/dashboard/update-service/${_id}`)}
                            className=' py-1 px-3 font-semibold text-white rounded-md bg-green-500 active:bg-green-600 hover:bg-gray-400'
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </section>
            <div className='mt-3'>
                <h3 className='text-2xl'>Description</h3>
                <p>{details}</p>
            </div>
        </div>
    );
};

export default ServiceDetails;