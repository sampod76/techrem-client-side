import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({category}) => {
    const { categoryImg, category:name, _id,} = category;
    return (
        <div className='relative'>
        <Link to={`/massages/${_id}`}>
            <div className='p-2 rounded-sm bg-gray-50 border border-gray-200'>
                <div>
                    <img className='max-w-[180px] rounded-md' src={categoryImg} alt="" />
                </div>
                <div className='text-center'>
                    <h4 className='text-xl text-blue-400 absolute bottom-3 left-1/2'>{name}</h4>
                </div>
            </div>
        </Link>
    </div>
    );
};

export default Category;