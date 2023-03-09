import React from 'react';
import { useState } from 'react';
import AddressForm from './form/AddressForm';
import shoppingBg from '../asset/image/shopping.jpg'
import { format } from 'date-fns';

const BookingCheckout = () => {
    const [showDifAddress, setShowDifAddress] = useState(false);
    const [deliveryD, setDeliveryD] = useState(new Date(new Date().getTime() + 120 * 60 * 60 * 1000));
    const deliveryDate = format(deliveryD, "PP");
    console.log(deliveryDate)
    return (
        <div className='w-full h-full bg-slate-200 px-16 py-6'>
            <div className='md:grid grid-cols-2 gap-2 '>
                <section className=''>
                    <h3 className='text-2xl my-2'>BILLING DETAILS</h3>
                    <main className='mr-10'>
                        <AddressForm
                            deliveryD={deliveryD}
                            setDeliveryD={setDeliveryD}
                        ></AddressForm>
                        <div className="w-full mb-4">
                            <label htmlFor='email' className="text-[14px]">Email address*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                id='email'
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor='phoneNumber' className="text-[14px]">Phone number*</label>
                            <div className='grid grid-cols-5 gap-4'>
                                <select className="w-full text-gray-800 bg-slate-200 py-2 px-1 mt-2 border focus:outline-gray-600 border-blue-500">
                                    <option>BD +880</option>
                                    <option>USA +745</option>
                                    <option>UK +454</option>
                                    <option>IND +914</option>
                                    <option>JP +721</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Your phone number"
                                    id='phoneNumber'
                                    className="col-span-4 text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                                />
                            </div>
                        </div>
                        <article className='flex items-center gap-2 my-2'>
                            <input type="checkbox" name="" id="" className='bg-white' />
                            <span className='text-[14px]'>Create an a account?</span>
                        </article>
                        <article className='flex items-center gap-2 mb-2'>
                            <input onClick={() => setShowDifAddress(!showDifAddress)} type="checkbox" name="" id="" className='bg-white' />
                            <span className='text-[14px]'>Ship to a different address?</span>
                        </article>
                        {/* different address form */}
                        {showDifAddress &&
                            <AddressForm
                                deliveryD={deliveryD}
                                setDeliveryD={setDeliveryD}
                            ></AddressForm>
                        }
                        <div className="w-full mb-4">
                            <label htmlFor='orderNotes' className="text-[14px]">Order notes (optional)</label>
                            <textarea
                                type="text"
                                placeholder="Notes about your orders"
                                id='orderNotes'
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                        </div>
                    </main>
                </section>
                <section className='relative'>
                    <main className=' p-8 bg-gray-100'>
                        <h2 className='text-center text-2xl mb-4'>ORDERED EXPENSE</h2>
                        <div className='bg-gray-50 shadow-md rounded-md p-6 grid grid-cols-1 gap-3 divide-y'>
                            <div className='flex justify-between'>
                                <h3 className='text-lg font-bold text-zinc-600'>FOOD</h3>
                                <h3 className='text-lg font-bold text-zinc-600'>SUBTOTAL</h3>
                            </div>
                            <div className='flex justify-between items-center pt-2'>
                                <p className='w-1/2'>Karicare 2 Baby Follow-On Formula From 6-12 Months</p>
                                <p>৳ 4,080.00</p>
                            </div>
                            <div className='flex justify-between items-center pt-2'>
                                <p className='w-1/2'>Karicare 2 Baby Follow-On Formula From 6-12 Months</p>
                                <p>৳ 7,080.00</p>
                            </div>
                            <div className='flex justify-between items-center pt-2'>
                                <p className='w-1/2 font-semibold'>Subtotal</p>
                                <p className='font-semibold text-gray-500'>৳ 54,80.00</p>
                            </div>
                            <div className='flex justify-between items-center pt-2'>
                                <p className='w-1/2 font-semibold'>Shipping</p>
                                <p>Free shipping</p>
                            </div>
                            <div className='flex justify-between items-center pt-2'>
                                <p className='w-1/2 font-semibold'>Total</p>
                                <p className='text-lg font-semibold  text-gray-500'>৳ 455,080.00</p>
                            </div>
                        </div>
                        <article className='flex justify-start items-center gap-2 mt-4'>
                            <input type="checkbox" name="" id="" className='block' />
                            <p className='text-sm'> I have read and agree to the website terms and conditions*</p>
                        </article>
                        <button className='w-full py-3 text-center bg-orange-500 rounded-lg text-white font-medium active:outline outline-3 outline-blue-500 mt-2 hover:bg-orange-600'>PLACE ORDER</button>
                    </main>
                </section>
            </div>
        </div>
    );
};

export default BookingCheckout;