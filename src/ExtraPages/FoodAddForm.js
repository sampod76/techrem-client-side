import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiMinus, BiMinusCircle, BiPlus, BiPlusCircle, BiStopwatch } from 'react-icons/bi';
import { FaPenAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePostNewServiceMutation } from '../app/features/product/serviceApi';

const FoodAddForm = () => {
    const [preview, setPreview] = useState({});
    const [counter, setCounter] = useState({ quantity: 1, discount: 0 });
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [postNewService, { isError, isSuccess, data, error }] = usePostNewServiceMutation();

    const handleCreateService = data => {
        postNewService({ ...data, ...counter, image: "https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg" })
    };
    useEffect(() => {
        if (isError) {
            toast.error(error);
        }
        if (isSuccess) {
            if (data.success) {
                toast.success(data.message)
                setCounter({ quantity: 1, discount: 0 });
                setPreview(null);
                reset();
            }
        }
    }, [isSuccess, isError])
return (
    <form
        onSubmit={handleSubmit(handleCreateService)}
        className='mt-4'
    >
        <div className='flex justify-between gap-4 mt-1'>
            <div className="w-full pb-5 relative">
                <label htmlFor='food-name' className="font-medium">Food name *</label>
                <input
                    {...register("serviceName", { required: "Food name filed is required!" })}
                    type="text" id='food-name' placeholder="Enter your new food name"
                    className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-gray-600 border-blue-500 rounded-md"
                />
                {errors.serviceName?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute bottom-0 left-0'>{errors.serviceName?.message}</span>}
            </div>
            <div className="w-full pb-5 relative">
                <label htmlFor='food-heading' className="font-medium">Additional heading *</label>
                <input
                    {...register("additionalHeading", { required: "Food heading filed is required!" })}
                    id='food-heading' type="text" placeholder="Enter optional food heading"
                    className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-gray-600 border-blue-500 rounded-md"
                />
                {errors.additionalHeading?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute bottom-0 left-0'>{errors.additionalHeading?.message}</span>}
            </div>
        </div>
        <div className='grid lg:grid-cols-3'>
            <div className='col-span-2 grid grid-cols-2 gap-4'>
                <div className='relative pb-1'>
                    <label htmlFor='foodPrice' className="font-medium">Price per fizz Food(taka) *</label>
                    <input
                        {...register("price", { required: "Food price filed is required!" })}
                        id='foodPrice' type="text" placeholder="Enter food price"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.price?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute -bottom-4 left-0'>{errors.price?.message}</span>}
                </div>
                <div className='select-none pb-1'>
                    <label htmlFor='priceDiscount' className="font-medium">Percentage discount(%) </label>
                    <div className='grid grid-cols-5 gap-1 mt-1'>
                        <div
                            onClick={() => setCounter({ ...counter, discount: counter?.discount > 0 ? counter?.discount - 1 : 0 })}
                            className='col-span-1 bg-gray-400 active:bg-gray-500 flex justify-center items-center outline outline-1 outline-gray-300 active:outline-gray-100  text-white rounded-md group'
                        >
                            <BiMinus className='text-2xl text-gray-200 group-active:text-white font-bold' />
                        </div>
                        <input
                            onChange={(e) => setCounter({ ...counter, discount: Number(e.target.value) })}
                            value={counter?.discount} readOnly
                            id='priceDiscount' type="text"
                            className="w-full col-span-3 text-center text-gray-800 bg-slate-200 py-2 px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                        <div
                            onClick={() => setCounter({ ...counter, discount: counter.discount + 1 })}
                            className='col-span-1 bg-gray-400 active:bg-gray-500 flex justify-center items-center outline outline-1 outline-gray-300 active:outline-gray-100  text-white rounded-md group'
                        >
                            <BiPlus className='text-2xl text-gray-200 group-active:text-white font-bold' />
                        </div>
                    </div>
                </div>
                <div className='pb-5 relative'>
                    <label htmlFor='expiryDate' className="font-medium">Expiry date *</label>
                    <input
                        {...register("expiryDate", { required: "Food expiry date filed is required!" })}
                        id='expiryDate' type="text" placeholder="write food expiry date"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.expiryDate?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute bottom-0 left-0'>{errors.expiryDate?.message}</span>}
                </div>
                <div className='select-none pb-5'>
                    <label htmlFor='availableQuantity' className="font-medium">Available quantity *</label>
                    <div>
                        <div className='grid grid-cols-5 gap-1 mt-1'>
                            <div
                                onClick={() => setCounter({ ...counter, quantity: counter?.quantity > 1 ? counter?.quantity - 1 : 1 })}
                                className='col-span-1 bg-gray-400 active:bg-gray-500 flex justify-center items-center outline outline-1 outline-gray-300 active:outline-gray-100  text-white rounded-md group'
                            >
                                <BiMinus className='text-2xl text-gray-200 group-active:text-white font-bold' />
                            </div>
                            <input
                                onChange={(e) => setCounter({ ...counter, quantity: Number(e.target.value) })}
                                value={counter?.quantity} readOnly
                                id='availableQuantity' type="text"
                                className="w-full col-span-3 text-center text-gray-800 bg-slate-200 py-2 px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            <div
                                onClick={() => setCounter({ ...counter, quantity: counter?.quantity + 1 })}
                                className='col-span-1 bg-gray-400 active:bg-gray-500 flex justify-center items-center outline outline-1 outline-gray-300 active:outline-gray-100  text-white rounded-md group'
                            >
                                <BiPlus className='text-2xl text-gray-200 group-active:text-white font-bold' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 relative'>
                <div className='absolute w-[93%] h-[93%] left-4 top-7'>
                    <label htmlFor="image" className='block h-[80%] w-full rounded-lg border-2 border-gray-500 bg-slate-300 hover:bg-green-200 font-semibold text-center pt-[20%]'>{preview?.imageLive ? "" : "Image Upload"}</label>
                    <input
                        {...register("image", { required: "Food image is required!" })}
                        onChange={(e) => setPreview({ imageLive: window.URL.createObjectURL(e.target.files[0]), imageText: e.target.files[0].name })}
                        id="image" type="file" accept='image/*' name="foodImage"
                        className='hidden'
                    />
                    <label htmlFor="image">
                        <div className='absolute right-1 bg-gray-200 top-1 rounded-full z-30 p-[6px] hover:bg-green-200 group'><FaPenAlt className='text-gray-600 group-hover:text-gray-700' /></div>
                    </label>
                    {preview?.imageLive && <img src={preview.imageLive} className='block h-[78%] w-[98.5%] absolute right-[2px] top-[1.5px] rounded' alt='preview_img' />}
                </div>
                {errors.image?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute bottom-0 left-4'>{errors.image?.message}</span>}
            </div>
        </div>
        <div className="w-full pb-4 relative">
            <label htmlFor='description' className="font-medium">Write details about food*</label>
            <textarea
                {...register("details", { required: "Food description is required!" })}
                id='description' type="text" placeholder="Write details about the food here"
                className="w-full min-h-[100px] text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-gray-600 border-blue-500 rounded-md"
            />
            {errors.details?.type === 'required' && <span role="alert" className='pl-4px text-sm text-red-600 absolute bottom-0 left-0'>{errors.details?.message}</span>}
        </div>
        <button type='submit' className='px-8 py-3 mx-auto block mt-3 bg-blue-700 active:outline outline-green-500 active:text-yellow-400 font-semibold text-white rounded-md hover:bg-blue-800'>Post Product</button>
    </form>
);
};

export default FoodAddForm;