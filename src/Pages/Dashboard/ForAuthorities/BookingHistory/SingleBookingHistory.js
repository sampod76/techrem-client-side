import React from 'react';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteBookingMutation } from '../../../../app/features/booking/bookingApi';
import DeleteConfirmModal from '../../../../component/form/DeleteConfirmModal';

const SingleBookingHistory = ({ book, pathname }) => {
    const [actionShow, setActionShow] = useState(false);
    const [deletedBooking, setDeletedBooking] = useState(null);
    const { _id, serviceName, timeSlot, type, date, serviceWorker, bookingExecutor: { name, role } } = book;
    const [deleteBooking] = useDeleteBookingMutation();
    const dashboard = pathname === "/dashboard" ? true : false;
    const navigate = useNavigate();

    const handleDeleteBooking = () => {
        deleteBooking(_id).then(res => {
            if (res.error) {
                console.log(res.error)
                if (res.error.error) {
                    toast.success(res.error.error)
                }
                if (!res.error.data.success) {
                    toast.error(res.error.data.message)
                    console.log(res.error.data.message)
                }
            }
            if (res.data.success) {
                toast.success("Booking delete success!")
                setDeletedBooking(null)
            };
        }).catch(e => console.log(e))
    };
    return (
        <div>
            <div className={`border bg-slate-50  grid ${pathname !== "/dashboard" ? "grid-cols-9 px-3" : "grid-cols-7 px-0 pl-3 lg:pl-2 lg:pr-0"} items-center py-1 rounded-sm text-left hover:bg-blue-200`}>
                <td className={`col-span-3 ${dashboard && "col-span-3"}`}>
                    <div className='flex justify-start gap-2 items-center'>
                        <img className={`w-12 h-12 ${dashboard && "w-9 h-9"} rounded-xl hidden md:block`} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHLT9xT8kHGRF5Xd4dENPCjcCVAm244IgAOlqBIb21pw&s' alt="" />
                        <div>
                            <p className='font-semibold'>{serviceName?.length < 15 ? serviceName : serviceName?.slice(0, 15)+".."}</p>
                        </div>
                    </div>
                </td>
                <td className={`col-span-2 ${dashboard && "col-span-3"}`}>
                    <p className='font-medium text-sm smm:text-md'>{serviceWorker}</p>
                    <p className={`text-sm md:text-md ${dashboard && "text-sm"}`}>{new Date(date).toLocaleDateString() + "-" + timeSlot}</p>
                </td>
                {dashboard || <td className='col-span-2 text-center'>
                    <p className="text-sm">{role}</p>
                    <p className='font-medium text-sm md:text-md'>{name.slice(0, 17)}</p>
                </td>}
                {dashboard || <td className='col-span-1 text-right'>
                    <p>{type}</p>
                </td>}
                <td className='col-span-1 text-center relative'>
                    <button
                        onClick={() => setActionShow(!actionShow)}
                        className='hover:bg-gray-300 active:text-blue-200 active:bg-gray-400 p-1 rounded-md'
                    >
                        <FaEllipsisV className='text-sm' />
                    </button>
                    {actionShow &&
                        <div
                            onMouseLeave={() => setActionShow(false)}
                            className="absolute top-6 right-0 z-30"
                        >
                            <ul className="p-1 shadow-lg bg-blue-100 rounded-xl border border-white">
                                <button
                                    className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                >Pay</button>
                                <button
                                    className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                >Edit</button>
                                <button
                                    onClick={() => setDeletedBooking(book)}
                                    className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                >Delete</button>
                                <button
                                    onClick={() => navigate(`/dashboard/booking-details/${_id}`)}
                                    className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                >Details</button>
                            </ul>
                        </div>
                    }
                </td>
            </div>
            {
                deletedBooking && <DeleteConfirmModal
                    deletedData={deletedBooking}
                    setDeletedData={setDeletedBooking}
                    deleteSuccess={handleDeleteBooking}
                    dataType="Booking"
                >
                </DeleteConfirmModal>
            }
        </div>
    );
};

export default SingleBookingHistory;