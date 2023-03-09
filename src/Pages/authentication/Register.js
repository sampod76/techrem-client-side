import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SmallSpinner from '../../component/spinner/SmallSpinner';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, googleLogin, toggleIsError } from '../../app/features/auth/authSlice';
import { useRegisterMutation } from '../../app/features/auth/authApi';
import { USER } from '../../utils/constant';
import { getUser } from '../../app/features/auth/dbUserSlice';
import registerImg from "../../asset/image/register.jpg";
import { multipartHeaders } from '../../utils/headers';
import axios from 'axios';

const Register = () => {
    const [preview, setPreview] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, error } = useSelector((state) => state.auth);
    const [postUser, { isSuccess, isError: isPostError, error: postError }] = useRegisterMutation();
    const { dbUser, isLoading: isDbLoading, isError: isDbError, error: dbError } = useSelector((state) => state.dbAuth);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const term = useWatch({ control, name: "term" });


    useEffect(() => {
        if (dbUser?.email) {
            navigate("/")
        };
    }, [dbUser]);

    const handleSignUp = async (data) => {
        delete data.userImage;
        const formData = new FormData();
        formData.append('image', imgFile);
        try {
            const result = await axios.post(`${process.env.REACT_APP_DEV_URL}/img`,
                formData,
                {
                    headers: multipartHeaders
                })
            if (result.data.file) {
                const results = await dispatch(createUser(data));
                if (!results.error) {
                    const res = await postUser({ name: data.name, email: data.email, password: data.password, userImage: result.data.file, role: USER });
                    if (res.data.success) {
                        localStorage.setItem("tech_token", res.data.jwtToken);
                        toast.success(res.data?.message);
                    } else {
                        toast.error(res?.message);
                    }
                } else {
                    toast.error(results.error.message);
                }
            }
        } catch (error) {
            toast.error(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };
    const handleGoogleLogin = async () => {
        const results = await dispatch(googleLogin());
        if (!results.error) {
            const findEmail = await dispatch(getUser(results.payload.email));
            // console.log("find email get", findEmail)
            if (!findEmail.payload.success) {
                const res = await postUser({ name: results?.payload?.name, email: results?.payload?.email, userImage: results?.payload?.userImage, role: USER });
                if (res.data.success) {
                    localStorage.setItem('tech_token', res.data.jwtToken);
                    toast.success(res.data?.message)
                } else {
                    toast.error(res?.message)
                }
            } else {

            }
        } else {
            console.log(results.error)
        }
    };

    return (
        <div className='flex flex-col-reverse md:flex-row justify-center'>
            <img className='w-[50%] md:w-[40%] lg:w-[50%] mx-auto' src={registerImg} alt="" />
            <div className='w-full min-h-[70vh] px-4 md:px-0 py-6 lg:py-0 flex items-center'>
                <div className='relative shadow-2xl border rounded-md w-full max-w-lg mx-auto px-10 pt-12 pb-8'>
                    <h2 className='font-bold text-2xl mdd:text-3xl text-blue-600 mb-4'>Register Now</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className='absolute right-11 top-7'>
                            <label htmlFor="image" className='block h-20 w-[4.375rem] border-2 border-gray-500 bg-slate-300 hover:bg-green-200 text-center pt-6'>{preview?.imageLive ? "" : "Image"}</label>
                            <input
                                {...register("userImage", { required: "Image is required!" })}
                                onChange={(e) => {
                                    setImgFile(e.target.files[0])
                                    setPreview({ imageLive: window.URL.createObjectURL(e.target.files[0]), imageText: e.target.files[0].name })
                                }}
                                type="file"
                                accept='image/*'
                                id="image"
                                className='hidden'
                            />
                            {preview?.imageLive && <label htmlFor="image"><img src={preview.imageLive} className='block h-[78px] w-[68px] absolute right-[1px] top-[1px]' alt='preview_img' /></label>}
                        </div>
                        {errors.userImage?.type === 'required' && <p role="alert" className='absolute right-5 text-sm top-[105px]'>{errors.userImage?.message}</p>}
                        <div className="w-full mb-3">
                            <label htmlFor='name' className="font-semibold">Name</label>
                            <input
                                type="name"
                                {...register("name", { required: "Name field is required!" })}
                                placeholder="Enter your name"
                                id='name'
                                className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />

                            {errors.name?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.name?.message}</p>}
                        </div>
                        <div className="w-full mb-3">
                            <label htmlFor='email' className="font-semibold">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email field is required!", pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address!"
                                    }
                                })}
                                placeholder="Enter your email"
                                id='email'
                                className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                            {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.email?.message}</p>}
                            {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.email?.message}</p>}
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor='password' className="font-semibold">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password field is required!", minLength: { value: 6, message: "Password must be 6 characters!" },
                                    // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong!' }
                                })}
                                placeholder="Enter your password"
                                id='password'
                                className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                            {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>}
                            {errors.password?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>}
                        </div>
                        <p className='text-blue-500 hover:underline hover:text-blue-700'><Link to="/login">Already have a account?</Link></p>
                        <div className='flex justify-start items-center gap-2 text-sm'>
                            <input type="checkbox" {...register("term")} /> <p>Terms and Conditions
                                <span>.....</span></p>
                        </div>
                        <button
                            type='submit'
                            disabled={!term}
                            className={`w-full py-2 rounded-md mt-1 ${term ? 'bg-blue-700 hover:bg-blue-800 active:outline outline-green-600 font-semibold text-white' : 'bg-blue-400 font-semibold text-gray-300'}`}
                        >
                            {isLoading ? <SmallSpinner /> : "Register"}
                        </button>
                    </form>
                    <div className='flex justify-center items-center mt-2 gap-1'>
                        <div className='bg-gray-500 h-[1px] w-full'></div>
                        <p>or</p>
                        <div className='bg-gray-500 h-[1px] w-full'></div>
                    </div>
                    <div className='flex justify-center gap-4 mt-4'>
                        <button ><FaFacebook className='text-3xl text-green-500 hover:text-green-600' /></button>
                        <button onClick={handleGoogleLogin}><FaGoogle className='text-3xl text-green-500 hover:text-green-600' /></button>
                        <button ><FaInstagram className='text-3xl text-green-500 hover:text-green-600' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
