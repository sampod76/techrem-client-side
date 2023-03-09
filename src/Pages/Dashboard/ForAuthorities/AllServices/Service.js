import React from 'react';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Service = ({ service, setDeletedProduct }) => {
    const { image, serviceName, quantity, createdAt, _id } = service;
    const postDate = new Date(createdAt).toLocaleString();
    const navigate = useNavigate();
    return (
        <div>
            <div className='border bg-slate-50 px-3 py-1 rounded-md hover:bg-blue-200 grid grid-cols-7 items-center'>
                <div className='col-span-4 flex justify-start gap-2 items-center'>
                    <Link to={`/dashboard/service/${_id}`}>
                        <img title='see service details' src={image} alt="" className='w-12 h-12 rounded-full' />
                    </Link>
                    <div>
                        <Link to={`/dashboard/service/${_id}`}>
                            <p className='font-semibold hover:text-blue-600 hover:underline'>{serviceName}</p>
                        </Link>
                        <p className='text-xs text-gray-500'>{postDate}</p>
                    </div>
                </div>
                <div className='col-span-1 text-right'>
                    {/* <p>{product.postedBy}</p> */}
                    <Link to={`/dashboard/activity-log/${_id}`}>
                        <button title='See all activity' className='hover:bg-gray-300 active:bg-gray-400 px-2 py-2 rounded-full active:text-white'>
                            <FiActivity />
                        </button>
                    </Link>
                </div>
                <div className='text-right relative'>
                    <button onClick={() => navigate(`/dashboard/update-service/${_id}`)} className='hover:bg-gray-300 active:text-white active:bg-gray-400 px-2 py-2 rounded-full'><FaPenAlt /></button>
                </div>
                <div className='text-center'>
                    <button
                        onClick={() => setDeletedProduct(service)}
                        className='bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-2 py-2 rounded-full'
                    >
                        <FaTrash className="text-red-600" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Service;
