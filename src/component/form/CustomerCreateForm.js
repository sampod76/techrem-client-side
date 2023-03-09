import React from 'react';

const CustomerCreateForm = () => {
    return (
        <div className='mx-8'>
            <h2 className='text-2xl text-indigo-700 font-semibold my-2'>Create a customer Account</h2>
            <form
            // onSubmit={handleSubmit(handleSignUp)}
            >
                {/* <div className='absolute right-11 top-8'>
                            <label htmlFor="image" accept="/image*" className='block h-20 w-[70px] border-2 border-gray-500 bg-slate-300 hover:bg-green-200 text-center pt-6'>Image</label>
                            <input
                                {...register("userImage", { required: true })}
                                onChange={(e) => handleImageChange(e.target.files[0])}
                                type="file"
                                name="userImage"
                                id="image"
                                className='hidden'
                            />
                            {preview && <label htmlFor="image"><img src={preview} className='block h-[78px] w-[68px] absolute right-[1px] top-[1px]' alt='preview_img' /></label>}
                        </div> */}
                <div className="w-full mb-3">
                    <label htmlFor='name' className="font-semibold">Name</label>
                    <input
                        type="name"
                        // {...register("name", { required: "name field is required!", pattern: { value: /(?=.*[A-Z])/, message: 'one uppercase required' } })}
                        placeholder="Enter customer name"
                        id='name'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />

                    {/* {errors.name?.type === 'required' && <p role="alert" className='pl-4px'>{errors.name?.message}</p>}
                            {errors.name?.type === 'pattern' && <p role="alert" className='pl-4px'>{errors.name?.message}</p>} */}
                </div>
                <div className="w-full mb-3">
                    <label htmlFor='email' className="font-semibold">Email</label>
                    <input
                        type="email"
                        // {...register("email", {
                        //     required: "email field is required!", pattern: {
                        //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //         message: "invalid email address"
                        //     }
                        // })}
                        placeholder="Enter customer email"
                        id='email'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {/* {errors.email?.type === 'required' && <p role="alert" className='pl-4px'>{errors.email?.message}</p>}
                            {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px'>{errors.email?.message}</p>} */}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='password' className="font-semibold">Password</label>
                    <input
                        type="password"
                        // {...register("password", {
                        //     required: "password field is required", minLength: { value: 6, message: "password must be 6 characters" },
                        //     pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'password must be strong' }
                        // })}
                        placeholder="Enter your password"
                        id='password'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                    {/* {errors.password?.type === 'required' && <p role="alert" className='pl-4px'>{errors.password?.message}</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className='pl-4px'>{errors.password?.message}</p>}
                            {errors.password?.type === 'pattern' && <p role="alert" className='pl-4px'>{errors.password?.message}</p>} */}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor='address' className="font-semibold">Customer address*</label>
                    <input
                        type="address"
                        placeholder="customer address"
                        id='address'
                        className="w-full text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                    />
                </div>
                <button
                    type='submit'
                    className='w-full py-2 rounded-md mt-1 bg-blue-700 hover:bg-blue-800 active:outline outline-green-600 font-semibold text-white'
                >Create Account</button>
            </form>
        </div>
    );
};

export default CustomerCreateForm;