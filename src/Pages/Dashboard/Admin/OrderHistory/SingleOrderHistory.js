import React from 'react';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const SingleOrderHistory = ({ order, pathname }) => {
    const [actionShow, setActionShow] = useState(false);
    const { _id, customer, payment, orderType, status, foodName, quantity, foodImg, orderedData } = order;
    return (
        <div>
            <div className={`border bg-slate-50 grid ${pathname === "/dashboard" ? "grid-cols-9" : "grid-cols-12"} items-center px-3 py-1 rounded-xl text-left hover:bg-green-200`}>
                {pathname === "/dashboard" || <td className='col-span-2'>{_id}</td>}
                <td className='col-span-3'>
                    <div className='flex justify-start gap-2 items-center'>
                        <img src={foodImg} alt="" className='w-12 h-12 rounded-full' />
                        <p className='font-semibold'>{foodName}</p>
                    </div>
                </td>
                <td className='col-span-1 text-center'>
                    <p>{quantity}</p>
                </td>
                <td className='col-span-2 text-center'>
                    <p>{orderType}</p>
                </td>
                <td className='col-span-1'>
                    <p>{status}</p>
                </td>
                <td className='col-span-2 text-center'>
                    <p>{payment}</p>
                </td>
                {pathname === "/dashboard" || <td className='col-span-1 text-center relative'>
                    <button
                        onClick={() => setActionShow(!actionShow)}
                        className='hover:bg-gray-300 active:text-blue-200 active:bg-gray-400 p-1 rounded-md'
                    >
                        <FaEllipsisV className='text-sm' />
                    </button>
                    {actionShow &&
                        <div
                            onMouseLeave={() => setActionShow(false)}
                            className="absolute top-6 left-2 z-30"
                        >
                            <ul className="p-1 shadow-lg bg-blue-100 rounded-xl border border-white">
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Edit</button>
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Delete</button>
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Mark</button>
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Details</button>
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Details</button>
                                <button className='text-sm font-semibold px-4 hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'>Details</button>
                            </ul>
                        </div>
                    }
                </td>}
            </div>
        </div>
    );
};

export default SingleOrderHistory;