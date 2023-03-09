import React from 'react';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookingModal from './BookingModal';
import { useGetOneServiceQuery } from "../app/features/product/serviceApi";
import LargeSpinner from "../component/spinner/LargeSpinner";
import { useGetServiceManQuery } from '../app/features/booking/bookingApi';
import { firstLConvert } from '../utils/hooks/textConvert';
import { format } from 'date-fns';
import { PhotoView } from 'react-photo-view';
const MassageDetails = () => {
    const { id } = useParams()
    const [bookingData, setBookingData] = useState(null);
    const { data: serviceMan } = useGetServiceManQuery({ serviceId: id, date: format(new Date(), "P") });
    const { data, isLoading, isError, error } = useGetOneServiceQuery(id);
    const navigate = useNavigate();
    if (isLoading) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isError) {
        if (error.error) {
            return <h4 className='text-center mt-10 md:mt-20'>{error.error}</h4>
        } else {
            return <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };

    const { image, serviceName, details, quantity, createdAt, duration, price, _id } = data?.data;
    return (
        <div className='px-4 smm:px-12 md:px-2 lg:px-10 h-full bg-slate-100'>
            <section className='grid grid-cols-1 md:grid-cols-2 py-4'>
                <div className='md:max-[300px] lg:max-h-[600px] h-[80vh] w-full px-4 md:px-0 lg:px-4 xl:px-8'>
                    <PhotoView src={image} >
                        <img className='w-full h-full drop-shadow-2xl shadow-slate-100 rounded-xl' src={image} alt="" />
                    </PhotoView>
                </div>
                <div className='px-8 py-4 md:pt-0 mx-4 flex flex-col justify-around mt-5 md:mt-0 border-double border-4 border-indigo-200 rounded-xl'>
                    <div>
                        <h3 className='text-3xl smm:text-4xl md:text-3xl mdd:text-5xl text-gray-500 font-sans mb-2'>{firstLConvert(serviceName)}</h3>
                        <h4 className='text-2xl smm:text-xl md:text-2xl mdd:text-4xl my-2'>Price: {price}</h4>
                        <h4 className='text-lg font-semibold text-gray-700'>Duration: {duration ? duration : "30"} minute.</h4>
                        <h4 className='text-lg '>Service: Saturday to Thursday</h4>
                        <div className='mb-4 mt-1'>
                            <h4 className='text-md underline'>Service Mans:</h4>
                            {
                                serviceMan?.allUserRemainingSlot?.map((man, i) => <div key={i} className="font-medium ">{++i}. {man._doc.name}</div>)
                            }
                        </div>
                    </div>
                    <div className='flex justify-center gap-3 items-center'>
                        <button
                            onClick={() => setBookingData(data.data)}
                            className='bg-blue-400 active:bg-cyan-500 active:outline outline-2 outline-indigo-600 hover:bg-green-500 py-2 px-5 rounded-md font-semibold text-white'
                        >BOOKING</button>
                        <button
                            onClick={() => navigate(`/create-order/${_id}`)}
                            className='bg-green-500 active:bg-cyan-500 active:outline outline-2 outline-indigo-600 hover:bg-green-600 py-2 px-3 rounded-md font-semibold text-white'
                        >ORDER NOW</button>
                        <button className='bg-gray-200 py-2 px-4 rounded-md active:bg-cyan-500 hover:bg-gray-300'>
                            <FaHeart className='text-2xl text-red-500' />
                        </button>
                    </div>
                </div>
            </section>
            <div className='pt-2 pb-10'>
                <h3 className='text-2xl'>Description</h3>
                <hr className='my-1 h-[2px] bg-gray-400' />
                <p>{details}</p>
            </div>
            {bookingData &&
                <BookingModal
                    setModalData={setBookingData}
                    modalData={bookingData}
                ></BookingModal>
            }
        </div>
    );
};

export default MassageDetails;