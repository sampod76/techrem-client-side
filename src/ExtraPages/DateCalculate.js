import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { differenceInDays, differenceInMinutes } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

const DateCalculate = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 120 * 60 * 60 * 1000));

    console.log(differenceInDays(endDate, startDate))
    console.log(differenceInMinutes(endDate, startDate))

    return (
        <div className='bg-gray-200 shadow-none border-2 mt-6 w-2/3 p-4 mx-auto'>
            <h4 className='text-xl text-center my-2 underline'>Calculate between tow Dates</h4>
            <div className='grid grid-cols-7'>
                <div className="w-full mb-3 relative col-span-3">
                    <label htmlFor='deliveryDate' className="">Booking start</label>
                    <DatePicker
                        id='deliveryDate'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full font-medium text-zinc-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                    />
                    <label htmlFor="deliveryDate"><FaCalendarAlt className='text-green-600 absolute right-3 top-10' /></label>
                </div>
                <p className='text-2xl font-bold col-span-1 text-center mt-8'>To</p>
                <div className="w-full mb-3 relative col-span-3">
                    <label htmlFor='deliveryDate' className="">Booking end</label>
                    <DatePicker
                        id='deliveryDate'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="w-full font-medium text-zinc-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                    />
                    <label htmlFor="deliveryDate"><FaCalendarAlt className='text-green-600 absolute right-3 top-10' /></label>
                </div>

            </div>
        </div>
    );
};

export default DateCalculate;