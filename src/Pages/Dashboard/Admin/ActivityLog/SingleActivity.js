import React from 'react';
import { useGetOneServiceQuery } from '../../../../app/features/product/serviceApi';
import { EMPTY_IMAGE } from '../../../../utils/constant';

const SingleActivity = ({ activity }) => {
    const { activityDetails, activityType, activityWorkerName, activityWorkerRole, createdAt, } = activity;
    const { data } = useGetOneServiceQuery(activityDetails?.id);
    return (
        <section className='relative'>
            <div className={`flex justify-start items-center gap-3 border-b px-4 py-2 ${"bg-blue-50"}`}>
                <div>
                    <img src={data?.data?.image || EMPTY_IMAGE} className="w-12 rounded-full h-12" alt="empty" />
                </div>
                <div className='flex-col justify-between'>
                    {/* <p className='text-xs font-bold text-green-600'>{actType === "foodBased"? <span>{food}</span>: <span>{newUser}</span>}</p> */}
                    <h5 className='text-sm'><span className=''>{activityWorkerRole}</span> <span className='font-semibold hover:underline hover:text-blue-700 '>{activityWorkerName?.slice(0, 17)}</span> {activityType}.</h5>
                    <h5 className='text-sm'><span className=''>{activityDetails?.message}</span>.</h5>
                    <p className='text-xs text-gray-500 ml-auto'>{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
            <p className='text-gray-700 font-semibold absolute -top-2 right-3 cursor-pointer select-none'>...</p>
        </section>
    );
};

export default SingleActivity;