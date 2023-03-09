import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ReviewAddForm from '../component/form/ReviewAddForm';

const OrderProcessing = () => {
    const [reviewingPd, setReviewingPd] = useState(null);
    const processingPd = {
        food: "burger",
        status: "cooking"
    }
    return (
        <div className='my-5 p-4 border rounded-lg w-1/2'>
            <div className='flex justify-between items-center my-5 p-4 border'>
                <div className='p-3 rounded-md font-bold text-sm bg-blue-600 text-white'>Start Cooking</div>
                <FaArrowRight className='text-3xl text-green-400' />
                <div className='p-3 rounded-md font-bold text-sm bg-blue-600 text-white'>Packing</div>
                <FaArrowRight className='text-3xl text-green-500' />
                <div className='p-3 rounded-md font-bold text-sm bg-blue-600 text-white'>Delivering</div>
                <FaArrowRight className='text-3xl text-green-600' />
                <div className='p-3 rounded-md font-bold text-sm bg-blue-600 text-white'>Accepted</div>
            </div>
            <div className='text-center pt-4'>
                <button
                    onClick={() => setReviewingPd(processingPd)}
                    className='bg-gray-100 border border-blue-600 active:bg-green-500 hover:bg-indigo-300 py-2 px-3 rounded-md font-semibold text-gray-500'
                >Add a review</button>
                {reviewingPd &&
                    <ReviewAddForm
                        setModalData={setReviewingPd}
                        modalData={reviewingPd}
                    ></ReviewAddForm>
                }
            </div>
        </div>
    );
};

export default OrderProcessing;

