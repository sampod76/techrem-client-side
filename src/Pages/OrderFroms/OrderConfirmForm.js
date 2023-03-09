import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneBookingQuery } from '../../app/features/booking/bookingApi';
import LargeSpinner from '../../component/spinner/LargeSpinner';
import bankLogo from "../../asset/image/bank_logo.jpg";
import payIdLogo from "../../asset/image/payID-logo.jpg";
import squareLogo from "../../asset/image/square_logo.jpg";

const OrderConfirmForm = () => {
    const { bookingId } = useParams();
    console.log(bookingId);
    const [service, setService] = useState({});
    const { data, isLoading, isError, error } = useGetOneBookingQuery(bookingId);
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
    };
    const paymentMethods = [
        {
            name: "Bank",
            logo: bankLogo,
            _id: 0
        },
        {
            name: "PayId",
            logo: payIdLogo,
            _id: 1
        },
        {
            name: "Square",
            logo: squareLogo,
            _id: 3
        },
    ];
    const { image, serviceName, price, _id } = service;
    const { bookingExecutor, customerDetails, phoneNumber, date, serviceWorker, timeSlot } = data?.data;
    const tax = parseFloat(price) / 100 * 3;
    return (
        <div className='mx-auto p-4 bg-zinc-100 h-fit my-4 lg:my-8'>
            <section className='border border-indigo-200 rounded-sm w-full max-w-md smm:max-w-lg mdd:max-w-xl lg:max-w-2xl mx-auto px-2 smm:px-4 mdd:px-8'>
                <h2 className='text-xl smm:text-2xl md:text-xl mdd:text-2xl bg-gray-100 pb-1 w-fit mx-auto my-4 px-5 rounded-sm drop-shadow-lg border-b border-blue-400 text-blue-600'>Complete your purchase</h2>
                <div className='flex justify-start items-center gap-2 mdd:gap-4'>
                    <div className='w-36 h-44 md:h-44 md:w-52'>
                        <img className='w-full h-full rounded-md' src={image} alt="" />
                    </div>
                    <div className='font-[500] text-gray-600 text-xs smm:text-sm mdd:text-md'>
                        <p><span className='w-[68px] inline-block'>Service</span>: {serviceName}</p>
                        <p><span className='w-[68px] inline-block'>Expenses</span>: {price} Taka</p>
                        <p><span className='w-[68px] inline-block'>Staff</span>: {serviceWorker}</p>
                        <p className='mb-1'><span className='w-[68px] inline-block'>Date-Time</span>: {new Date(date).toLocaleDateString() + "-" + timeSlot}</p>
                        <p><span className='w-[68px] inline-block'>Consumer </span>: {customerDetails?.name}</p>
                        <p><span className='w-[68px] inline-block'>Phone </span>: {phoneNumber}</p>
                        <p><span className='w-[68px] inline-block'>Order by </span>: {bookingExecutor?.name}</p>
                        <p><span className='w-[68px] inline-block'>Email</span>: {bookingExecutor?.email}</p>
                    </div>
                </div>
                <div className='font-[500] text-gray-700 max-w-sm mdd:max-w-md mx-2 smm:mx-auto mt-6'>
                    <div className='flex justify-between items-center'>
                        <p>Service Expenses</p>
                        <p>{price} Taka</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Govt. Tax</p>
                        <p className='border-b border-gray-500 pl-5'>{tax} Taka</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Total Pay</p>
                        <p>{parseFloat(price) + tax} Taka</p>
                    </div>
                </div>
                <div className='my-4'>
                    <h3 className='text-xl smm:text-2xl font-medium text-green-500 mb-1 ml-[6%]'>Payment Methods</h3>
                    <hr className='h-[2px] bg-gray-300' />
                </div>
                <main>
                    {/* <h6 className='text-md sm:text-lg font-medium'>Pay-up Information</h6> */}
                    <div className='grid grid-cols-3 gap-3 mdd:gap-4 mb-4'>
                        {
                            paymentMethods.map(method => <div key={method._id} className="border-2 border-green-400 hover:border-blue-600 duration-500 rounded-xl h-[90%] p-[2px] cursor-pointer">
                                <img src={method.logo} className="w-full h-full  rounded-lg" alt="" />
                            </div>)
                        }
                    </div>
                </main>
                <div className='max-w-sm p-5 bg-slate-50 rounded-md'>
                    <div className="w-full mb-3">
                        <label htmlFor='name' className="font-semibold">Your Name</label>
                        <input

                            id='name' placeholder="Enter your name" type="text"
                            className="w-full text-md font-medium text-zinc-700 bg-slate-200 py-1 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor='email' className="font-semibold">Your Email</label>
                        <input

                            id='email' type="email" placeholder="Enter your email"
                            className="w-full text-md font-medium text-zinc-700 bg-slate-200 py-1 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {/* {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.email?.message}</p>} */}
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor='transactionId' className="font-semibold">Transaction ID</label>
                        <input

                            id='transactionId' placeholder="Enter transaction id" type="text"
                            className="w-full text-md font-medium text-zinc-700 bg-slate-200 py-1 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>
                    <button type='submit' className='px-6 mx-auto block bg-green-500 hover:bg-orange-400 active:bg-green-600 duration-75 font-semibold text-white py-[6px] rounded-md active:outline outline-2 outline-blue-500'>
                        {/* {bookLoading ? <SmallSpinner /> : "Continue Order"} */} Submit
                    </button>
                </div>
            </section>
        </div>
    );
};

export default OrderConfirmForm;