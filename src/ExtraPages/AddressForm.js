import React from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';

const AddressForm = ({ deliveryD, setDeliveryD }) => {
    return (
        <section className=''>
            <div className='flex justify-between gap-4 mt-1'>
                <div className="w-full mb-4">
                    <label htmlFor='first-name' className="text-[14px]">First name*</label>
                    <input
                        type="first-name"
                        placeholder="Enter your first name"
                        id='first-name'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='last-name' className="text-[14px]">Last name*</label>
                    <input
                        type="name"
                        placeholder="Enter your last name"
                        id='last-name'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                </div>
            </div>
            <div className="w-full mb-4">
                <label htmlFor='rood' className="text-[14px]">House rood(optional)</label>
                <input
                    type="text"
                    placeholder="Enter your house rood"
                    id='rood'
                    className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                />
            </div>
            <div className='mb-2'>
                <h6 className='text-[14px]'>Country / Region*</h6>
                <p className='text-zinc-700 font-medium'>Bangladesh</p>
            </div>
            <div className="w-full mb-4">
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2'>
                        
                        <label htmlFor='streetAddress' className="text-[14px]">Street address*</label>
                        <input
                            type="text"
                            placeholder="Enter your house street address"
                            id='streetAddress'
                            className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                    </div>
                    <div className="w-full relative">
                        <label htmlFor='deliveryDate' className="text-[14px]">Date of Delivery*</label>
                        <DatePicker
                            id='deliveryDate'
                            selected={deliveryD}
                            onChange={(date) => setDeliveryD(date)}
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                        <label htmlFor="deliveryDate"><FaCalendarAlt className='text-green-600 absolute right-3 top-11' /></label>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                <label htmlFor='localTown' className="text-[14px]">Local Town / City *</label>
                <div className='grid grid-cols-3 gap-4'>
                    <input
                        type="text"
                        placeholder="Enter local town, City"
                        id='localTown'
                        className="col-span-2 text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Postcode, ZIP (optional)"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default AddressForm;