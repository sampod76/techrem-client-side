import { format } from 'date-fns/esm';
import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateBookingMutation, useGetServiceManQuery } from '../app/features/booking/bookingApi';
import LargeSpinner from './spinner/LargeSpinner';
import SmallSpinner from './spinner/SmallSpinner';

const BookingModal = ({ modalData, setModalData }) => {
    const { serviceName, duration, price, _id } = modalData;
    const {dbUser} = useSelector((state)=> state.dbAuth);
    const [manOpen, setManOpen] = useState(false);
    const [slotOpen, setSlotOpen] = useState({});
    const [bookManSlotPhone, setBookManSlotPhone] = useState({});
    const [bookingDate, setBookingDate] = useState(new Date());
    const formatBookingDate = format(bookingDate, "P");
    const { data, isLoading, isError, error } = useGetServiceManQuery({ serviceId: _id, date: formatBookingDate });
    const [createBooking, { isLoading: bookLoading }] = useCreateBookingMutation();
    const submitBooking = event => {
        event.preventDefault();
        if (!bookManSlotPhone.timeSlot) {
            return setBookManSlotPhone({ ...bookManSlotPhone, slotError: "Serviceman and slot required!" })
        }
        if (!bookManSlotPhone.phoneNumber) {
            return setBookManSlotPhone({ ...bookManSlotPhone, phoneError: "Pone number is required!" })
        }
        delete bookManSlotPhone.slotError;
        delete bookManSlotPhone.phoneError;
        const bookingData = {
            ...bookManSlotPhone,
            serviceName,
            serviceId: _id,
            date: formatBookingDate,
            type: "Online",
            bookingPyment: false,
            customerDetails: {
                name: dbUser?.name,
                email: dbUser?.email,
                userId: dbUser?._id
            },
        }
        createBooking(bookingData).then(res => {
            if (res.error) {
                if (res.error.error) {
                    toast.error(res.error.error)
                } else {
                    toast.error(res.error.data.message)
                }
            } else if (res.data.success) {
                toast.success("successful your booking!");
                setModalData(null);
            }
        }).catch(e => console.log(e))
    };

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
    if (!data.success) {
        return <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">{data.message}</p>
        </div>
    }
    return (
        <div
            className='fixed top-0 left-0 flex justify-center items-center w-full h-screen'
            style={{ background: "rgba(68, 104, 97, 0.6)" }}
        >
            <div className='shadow-2xl w-[450px] rounded-3xl px-10 py-4 z-30 bg-slate-100 relative'>
                <h2 className='text-3xl text-zinc-600 mb-4 text-center'>Place your Booking</h2>
                <button onClick={() => setModalData(null)} className='bg-red-300 hover:bg-red-500 rounded-full text-lg px-[9px] absolute top-4 right-4'>X</button>
                <form onSubmit={submitBooking} className='text-sm smm:text-md'>
                    <div className="w-full pb-3">
                        <label htmlFor='massageName' className="">Massage Name</label>
                        <input
                            defaultValue={serviceName} readOnly
                            id='massageName' type="text"
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>
                    <div className="w-full pb-3 relative">
                        <label htmlFor='deliveryDate' className="">Date of Massages*</label>
                        <DatePicker
                            onFocus={() => setManOpen(false)}
                            id='deliveryDate'
                            minDate={new Date()}
                            selected={bookingDate}
                            onChange={(date) => setBookingDate(date)}
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        <label htmlFor="deliveryDate"><FaCalendarAlt className='text-green-600 absolute right-3 top-9' /></label>
                    </div>
                    <div className="w-full pb-3 relative">
                        <label htmlFor='serviceman' className="">Staff & Time</label>
                        <div className='select-none mt-1 relative'>
                            <div onClick={() => {
                                setManOpen(!manOpen)
                                setBookManSlotPhone({ ...bookManSlotPhone, slotError: "" })
                            }} className={`font-semibold border border-blue-500 px-3 py-[6px] ${manOpen && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between`}>
                                <p>{bookManSlotPhone.timeSlot ? bookManSlotPhone.serviceWorker + " " + bookManSlotPhone.timeSlot : "Select staff"}</p>
                                <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${manOpen && "-rotate-90"}`} />
                            </div>
                            {manOpen &&
                                <div
                                    onMouseLeave={() => {
                                        setManOpen(false);
                                        setSlotOpen({})
                                    }}
                                    className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[160px] overflow-y-scroll'
                                >
                                    {data.allUserRemainingSlot.map((man, i) => <div key={i} >
                                        <p
                                            onClick={() => setSlotOpen({ [man._doc.name]: !slotOpen[man._doc.name] ? man._doc.name : "" })}
                                            className={`font-medium hover:bg-blue-500 ${slotOpen[man._doc.name] && "bg-blue-500 text-white"} px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                        >{man._doc.name}</p>
                                        {slotOpen[man._doc.name] && <div className='py-2 bg-green-200 w-40 shadow-xl border ml-3'>
                                            {
                                                man?.remainingSlots?.map((slot, i) => <li
                                                    onClick={() => {
                                                        setBookManSlotPhone({ ...bookManSlotPhone, serviceWorker: man._doc.name, timeSlot: slot });
                                                        setManOpen(false);
                                                    }}
                                                    key={i}
                                                    className="list-none px-4 hover:text-white hover:bg-blue-500 hover:font-semibold active:bg-orange-500 active:text-white cursor-pointer"
                                                >
                                                    {slot}
                                                </li>)
                                            }
                                        </div>}
                                    </div>)}
                                </div>
                            }
                            {bookManSlotPhone.slotError && <p role="alert" className='pl-4px text-sm text-red-500 absolute let-0 -bottom-4'>{bookManSlotPhone.slotError}</p>}
                        </div>
                    </div>
                    {/* <div className="w-full mb-3">
                        <label htmlFor='duration' className="">Your email*</label>
                        <input
                            type="text"
                            id='duration'
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div> */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="w-full pb-3">
                            <label htmlFor='expense' className="">Massage Expense</label>
                            <input
                                defaultValue={price + " Taka"} readOnly
                                id='expense' type="text"
                                className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                        </div>
                        <div className="w-full mb-3">
                            <label htmlFor='duration' className="">Duration(editable)*</label>
                            <input
                                defaultValue={"30 minutes"} readOnly
                                id='duration' type="text"
                                className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full pb-3 relative">
                        <label htmlFor='phone' className="">Your Phone*</label>
                        <input
                            onChange={(e) => setBookManSlotPhone({ ...bookManSlotPhone, [e.target.name]: e.target.value })}
                            id='phone' name='phoneNumber' type="text" placeholder='Phone number'
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {bookManSlotPhone.phoneError && <p role="alert" className='pl-4px text-sm text-red-500 absolute let-0 -bottom-[5px]'>{bookManSlotPhone.phoneError}</p>}
                    </div>

                    <button type='submit' disabled={bookLoading} className='px-6 w-28 mx-auto block mt-3 bg-blue-700 hover:bg-blue-900 font-semibold text-white py-[6px] rounded-md active:outline outline-green-600'>{bookLoading ? <SmallSpinner /> : "Booking"}</button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;