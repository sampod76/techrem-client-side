import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';

const OfflineSingleService = ({ service }) => {
    const { image, serviceName, price, _id } = service;
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/dashboard/offline-booking-form/${_id}`, { state: service })}>
            <div className='relative hover:cursor-pointer group p-2 rounded-lg drop-shadow-lg' style={{ background: "rgba(248, 239, 244, 0.99)" }}>
                <img src={image} alt="" className='rounded-md' />
                <div className='flex justify-between mt-1'>
                    <p className='text-sm font-medium'>{serviceName}</p>
                    <p className='font-semibold text-sm text-gray-600'> {price}<TbCurrencyTaka className='inline-block font-medium mb-[2px] -ml-[2px] text-[16px]' /></p>
                </div>
                <div className='absolute top-0 left-0 w-full h-full z-10 hidden group-hover:block rounded-lg' style={{ background: "rgba(32, 3, 19, 0.40)" }} >
                    <div className='w-full h-full flex justify-center items-center'>
                        <h1 className='font-bold text-white text-center'> <FaPlus className='text-white ml-3'></FaPlus> Order</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfflineSingleService;