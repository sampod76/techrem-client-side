import React from 'react';
import { Link } from 'react-router-dom';
import { firstLConvert } from '../../../utils/hooks/textConvert';

const MassageCard = ({ service }) => {
    const { image, serviceName, quantity, createdAt, price, _id } = service;
    return (
        <div className=''>
            <Link to={`/massages/${_id}`}>
                <div className='py-4 px-4 shadow-lg hover:shadow-2xl shadow-transparent rounded-xl bg-gray-50 border hover:border-blue-700 transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-105 duration-300'>
                    <div>
                        <img className='h-[200px] rounded-md w-full' src={image} alt="" />
                    </div>
                    <div className='text-center'>
                        <h3 className='text-xl text-green-400'>Expenses: <span className='text-green-400'>{price} taka</span></h3>
                        <h4 className='text-2xl text-blue-400 border-4 rounded-full pb-2 mt-2 bg-slate-100'>{firstLConvert(serviceName)}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MassageCard;