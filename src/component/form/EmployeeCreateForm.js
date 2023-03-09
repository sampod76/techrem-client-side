import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../app/features/auth/authApi';
import { createUser } from '../../app/features/auth/authSlice';
import { multipartHeaders } from '../../utils/headers';
import SmallSpinner from '../spinner/SmallSpinner';

const EmployeeCreateForm = ({ formHeading, employeeType }) => {
    const [postUser, { isSuccess, isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleCreateAccount = async (data) => {
        const formData = new FormData();
        formData.append('image', "");
        // try {
        //     const result = await axios.post(`${process.env.REACT_APP_DEV_URL}/img`,
        //         formData,
        //         {
        //             headers: multipartHeaders
        //         })
        //     if (result.data.file) {
        const results = await dispatch(createUser(data));
        console.log(results)
        if (!results.error) {
            // userImage: result.data.file,
            const res = await postUser({ name: data.name, email: data.email, password: data.password, role: employeeType });
            console.log(res)
            if (res.data.success) {
                toast.success(res.data?.message);
            } else {
                toast.error(res?.message);
            }
        } else {
            toast.error(results.error.message);
        }
        //     }
        // } catch (error) {
        //     toast.error(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        // }
    }
    return (
        <div className='mx-8'>
            <h2 className='text-2xl text-indigo-700 font-semibold my-2'>{formHeading}</h2>
            <form onSubmit={handleSubmit(handleCreateAccount)}>
                <div className="w-full mb-4">
                    <label htmlFor='name' className="text-[14px]">Employee name*</label>
                    <input
                        {...register("name", { required: "Employee name is required!" })}
                        id='name' type="name" placeholder="Employee name"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.name?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>{errors.name?.message}</p>}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='email' className="text-[14px]">Employee Email*</label>
                    <input
                        {...register("email", { required: "Email is required!" })}
                        id='email' type="email" placeholder="enter the employee email address"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.email?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>{errors.email?.message}</p>}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='document' className="text-[14px]">Employee Document*</label>
                    <div className='grid grid-cols-6 gap-3'>
                        <select
                            className="col-span-2 text-gray-800 bg-slate-200 px-1 font-medium mt-2 border focus:outline-gray-600 border-blue-500"
                            id='document'
                        >
                            <option disabled selected className=''>Select Type</option>
                            <option>National ID</option>
                            <option>Passport</option>
                            <option>Visa Card</option>
                            <option>Birth Certificate</option>
                        </select>
                        <input

                            type="file" placeholder="national document of the employee"
                            className="col-span-4 text-gray-800 bg-slate-200 py-1 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='other-document' className="text-[14px]">Other Document*</label>
                    <div className='grid grid-cols-6 gap-3'>
                        <select
                            className="col-span-2 text-gray-800 bg-slate-200 px-1 font-medium mt-2 border focus:outline-gray-600 border-blue-500"
                            id='other-document'
                        >
                            <option disabled selected className=''>Other Type</option>
                            <option>Certificate</option>
                            <option>Record</option>
                            <option>Resign letter</option>
                            <option>Other</option>
                        </select>
                        <input
                            type="file"
                            placeholder="any other document"
                            className="col-span-4 text-gray-800 bg-slate-200 py-1 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <div className='grid grid-cols-3 gap-4'>
                        <div className="col-span-2">
                            <label htmlFor='address' className="text-[14px]">Permanent address*</label>
                            <input
                                {...register("address", { required: "Address is required!" })}
                                id='address' placeholder="Employee address" type="text"
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            {errors.address?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>{errors.address?.message}</p>}
                        </div>
                        <div className='w-full'>
                            <label htmlFor='country' className="text-[14px]">Country</label>
                            <input
                                {...register("country", { required: "Country is required!" })}
                                id='country' placeholder="Employee country a" type="text"
                                className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                            {errors.country?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>{errors.country?.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='password' className="text-[14px]">Account Password*</label>
                    <input
                        {...register("password", { required: "Password is required!" })}
                        id='password' type="password" placeholder="enter the employee email address"
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {errors.password?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>{errors.password?.message}</p>}
                </div>
                <button
                    type="submit"
                    className='w-full py-2 text-center bg-orange-500 rounded-lg text-white font-medium active:outline outline-3 outline-blue-500 mt-2 hover:bg-orange-600'
                >{isLoading ? <SmallSpinner/> : "Create Account"}</button>
            </form>
        </div>
    );
};

export default EmployeeCreateForm;