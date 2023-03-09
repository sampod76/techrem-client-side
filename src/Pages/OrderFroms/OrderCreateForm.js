import { format } from 'date-fns';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, useWatch } from 'react-hook-form';
import { IoMdArrowDropdown } from "react-icons/io"
import { FaCalendarAlt } from "react-icons/fa"
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCreateBookingMutation, useGetServiceManQuery } from '../../app/features/booking/bookingApi';
import LargeSpinner from '../../component/spinner/LargeSpinner';
import SmallSpinner from '../../component/spinner/SmallSpinner';
import ChackoutFrom from '../Payment/ChackoutFrom';

const OrderCreateForm = () => {
    const { success, data: service } = useLoaderData();
    const { dbUser } = useSelector((state) => state.dbAuth);
    const [manOpen, setManOpen] = useState(false);
    const [slotOpen, setSlotOpen] = useState({})
    const [bookManSlotPhone, setBookManSlotPhone] = useState({});
    const [bookingDate, setBookingDate] = useState(new Date());
    const formatBookingDate = format(bookingDate, "P");
    const { data, isLoading, isError, error } = useGetServiceManQuery({ serviceId: service._id, date: formatBookingDate });
    const [createBooking, { isLoading: bookLoading }] = useCreateBookingMutation();
    const discount = "3";
    const rewordCoin = 54
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { ...service, discount }
    });
    const createAccount = useWatch({ control, name: "createAccount" });
    const rewordUse = useWatch({ control, name: "rewordUse" });
    const discountPrice = parseFloat(service.price) - (parseFloat(service.price) / 100 * parseFloat(discount))
    const calculatePrice = !rewordUse ? discountPrice : discountPrice - (parseFloat(rewordCoin) * 0.5);
    console.log(calculatePrice)

    const handleOfflineOrder = data => {
        if (!bookManSlotPhone.timeSlot) {
            return setBookManSlotPhone({ ...bookManSlotPhone, slotError: "Serviceman and slot required!" })
        }
        delete bookManSlotPhone.slotError;
        delete bookManSlotPhone.phoneError;
        const bookingData = {
            ...bookManSlotPhone,
            serviceName: service.serviceName,
            serviceId: service._id,
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
        <main className='p-6 my-4 max-w-2xl m-1 smm:mx-auto border rounded-md'>
            <form
                onSubmit={handleSubmit(handleOfflineOrder)}

            >
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className='text-2xl text-blue-600'>Billing Details.</h2>
                        <h2 className=''>Placed your order information.</h2>
                    </div>
                    <div>
                        <div className='font-semibold'>Useable reword <div className='border border-dashed border-orange-500 text-orange-300 rounded-full pb-[6px] pt-[2px]  font-serif drop-shadow-lg inline-flex justify-center items-center min-w-[35px]'><span>{rewordUse ? 0 : rewordCoin}</span></div></div>
                        <h4 className='text-center'>Used <input type="checkbox" {...register("rewordUse")} />
                        </h4>
                        {/* <Link to='/login'> <button className='py-1 w-full whitespace-pre text-green-700 hover:text-white hover:bg-green-600 duration-300 rounded-sm px-2 border  font-semibold drop-shadow-xl' >Login</button></Link> */}
                    </div>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between gap-4 mt-1'>
                    <div className="w-full mb-2">
                        <label htmlFor='first-name' className="">First name *</label>
                        <input
                            {...register("firstName", { required: "First name is required!" })}
                            placeholder="Enter first name" type="first-name" id='first-name'
                            className="w-full text-zinc-800 bg-slate-200 py-[5px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.firstName?.type === 'required' && <p role="alert" className='pl-4px text-sm'>{errors.firstName?.message}</p>}
                    </div>
                    <div className="w-full mb-2">
                        <label htmlFor='last-name' className="">Last name *</label>
                        <input
                            {...register("lastName", { required: "Last name is required!" })}
                            placeholder="Enter last name" type="name" id='last-name'
                            className="w-full text-zinc-800 bg-slate-200 py-[5px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.lastName?.type === 'required' && <p role="alert" className='pl-4px text-sm'>{errors.lastName?.message}</p>}
                    </div>
                </div>
                <div className="w-full pb-2">
                    <label htmlFor='massageName' className="">Massage Name</label>
                    <input
                        {...register("serviceName")} readOnly
                        id='massageName' type="text"
                        className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="w-full pb-2 relative">
                        <label htmlFor='deliveryDate' className="">Date of Massages*</label>
                        <ReactDatePicker
                            onFocus={() => setManOpen(false)}
                            id='deliveryDate'
                            selected={bookingDate}
                            onChange={(date) => setBookingDate(date)}
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        <label htmlFor="deliveryDate"><FaCalendarAlt className='text-green-600 absolute right-3 top-10' /></label>
                    </div>
                    <div className="w-full pb-2 relative">
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
                                </div>}
                        </div>
                        {bookManSlotPhone.slotError && <p role="alert" className='pl-4px text-sm text-red-500 absolute let-0 -bottom-2'>{bookManSlotPhone.slotError}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-7 gap-4'>
                    <div className="w-full pb-2 relative col-span-3">
                        <label htmlFor='phone' className="">Phone*</label>
                        <input
                            {...register("phoneNumber", { required: "Phone number required!" })}
                            id='phone' name='phoneNumber' type="text" placeholder='phone number'
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.phoneNumber?.type === 'required' && <p role="alert" className='pl-4px text-sm'>{errors.phoneNumber?.message}</p>}
                    </div>
                    <div className="w-full pb-2 col-span-2">
                        <label htmlFor='expense' className="">Expense(taka)</label>
                        <input

                            value={calculatePrice} readOnly
                            id='expense' type="text"
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>
                    <div className="w-full pb-2 col-span-2">
                        <label htmlFor='discount' className="">Discount(%)</label>
                        <input
                            {...register("discount")} readOnly
                            id='discount' type="text"
                            className="w-full font-medium text-zinc-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="w-full">
                        <label htmlFor='email' className="text-[14px]">Email address*</label>
                        <input
                            {...register("email", { required: "Customer email required!" })}
                            type="email" placeholder="Enter customer email" id='email'
                            className="w-full text-gray-800 bg-slate-200 py-[5px] px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                        {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-sm'>{errors.email?.message}</p>}
                    </div>
                    {createAccount &&
                        <div className="w-full">
                            <label htmlFor='password' className="text-[14px]">Account password*</label>
                            <input
                                {...register("password", { required: "Password is required!" })}
                                type="password" placeholder="Enter account password" id='password'
                                className="w-full text-gray-800 bg-slate-200 py-[5px] px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-sm'>{errors.password?.message}</p>}
                        </div>
                    }
                </div>
                <div>
                    <article className='flex items-center gap-2 mb-3'>
                        <input type="checkbox" {...register("createAccount")} className='bg-white' />
                        <span className='text-[14px]'>Create an a account?</span>
                    </article>
                </div>
                <button type='submit' className='px-6 mx-auto block bg-green-500 active:bg-green-600 font-semibold text-white py-2 rounded-md active:outline outline-2 outline-blue-500'>
                    {bookLoading ? <SmallSpinner /> : "Continue Order"}
                </button>
            </form>
            
            <div className='w-96 border-2 border-blue-700 rounded-2xl p-3 mt-6 mx-auto'>

                <ChackoutFrom calculatePrice={calculatePrice} />
            </div>

        </main >
    )
};

export default OrderCreateForm;