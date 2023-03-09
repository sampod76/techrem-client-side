import React from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { BsArrowDown, BsArrowUp, BsBagPlus, BsBookmarkCheck, BsFillBookmarkCheckFill, BsPencilSquare } from 'react-icons/bs';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';
import { GoPrimitiveDot } from 'react-icons/go';
import Chart from './Chart';
import { FaUsers } from 'react-icons/fa';
import OrderHistory from '../OrderHistory/OrderHistory';
import ActivityLog from '../ActivityLog/ActivityLog';
import BookingHistory from '../../ForAuthorities/BookingHistory/BookingHistory';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className='w-full max-w-[1500px] mx-auto p-4'>
            <main className='w-full grid mdd:grid-cols-1 lg:grid-cols-7 lgg:grid-cols-3 gap-4'>
                <section className='lg:col-span-4 lgg:col-span-2'>
                    <div className="grid grid-cols-1 smm:grid-cols-2 lg:grid-cols-2 lgg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
                        <div className="border bg-blue-200 w-full p-4 rounded-sm shadow">
                            <p><HiOutlineCurrencyDollar className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >64,564.000 </span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Balance</p>
                                <p className=''>+12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-blue-100 w-full p-4 rounded-sm shadow">
                            <p><BsBagPlus className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >6,546.000 </span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Sales</p>
                                <p className=''>+12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-green-200 w-full p-4 rounded-sm shadow">
                            <p><BiBarChartAlt2 className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >4,055.000 </span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Expenses</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-orange-200 w-full p-4 rounded-sm shadow">
                            <p><BsPencilSquare className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >4,055.000 </span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Bookings</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-red-200 w-full p-4 rounded-sm shadow">
                            <p><BsBookmarkCheck className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >4,055.000 </span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Orders</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-indigo-200 w-full p-4 rounded-sm shadow">
                            <p><FaUsers className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >4,055.000 </span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Customer</p>
                                <p className=''>-12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                    </div>
                    <Chart></Chart>
                    <div>
                        <div className='mt-4 border p-3'>
                            <div className='flex justify-between '>
                                <h6 className='text-lg font-semibold'>Recent Sales</h6>
                                <button className='text-sm hover:underline text-blue-500'>See All</button>
                            </div>
                        </div>
                        <OrderHistory></OrderHistory>
                    </div>
                </section>
                <section className='lg:col-span-3 lgg:col-span-1'>
                    <div className='bg-gray-800 p-4 text-white'>
                        <h3 className='text-2xl md:text-xl xl:text-4xl'>Monthly Profits</h3>
                        <p className='text-gray-300 mb-2 text-lg md:text-sm xl:text-lg'>Total Profit Groth of 26%</p>
                        <div className='flex justify-between'>
                            <div>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Maintenance</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Giveaway</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Online Sales</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Offline Sales</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                            </div>
                            <div className='grow flex justify-center items-center'>
                                <div className='bg-white rounded-full p-1 w-[80%] h-[80%]'>
                                    <div className=' bg-gray-700 rounded-full w-full h-full p-1'>
                                        <div className='bg-red-400 rounded-full w-full h-full flex justify-center items-center'>
                                            <h1 className='text-3xl font-bold font-serif'>Good</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-4 border p-3'>
                            <div className='flex justify-between '>
                                <h6 className='text-lg font-semibold'>Upcoming Booking</h6>
                                <Link to={`/dashboard/booking-history`}><button className='text-sm hover:underline text-blue-500'>See All</button></Link>
                            </div>
                        </div>
                        <BookingHistory></BookingHistory>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;