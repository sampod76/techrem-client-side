import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import auth from '../../firebase/firebase.config';
import SmallSpinner from '../spinner/SmallSpinner';

const ResetPassword = ({ setModalData}) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handlePassReset = e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        sendPasswordResetEmail(auth, e.target.email.value).then(() => {
            setLoading(false);
            setSuccess(true);
            toast.warning("Check your inbox")
        })
            .catch((error) => {
                setError(error.message === "Firebase: Error (auth/user-not-found)." ? "Please enter correct email address!" : error.message);
                setLoading(false);
            });
    };
    return (
        <div
            className='fixed top-0 left-0 flex justify-center items-center w-full h-screen'
            style={{ background: "rgba(68, 21, 76, 0.50)" }}
        >
            <div className='shadow-2xl w-[350px] smm:w-[400px] rounded px-8 py-4 z-30 bg-slate-50 relative'>
                <h2 className='text-xl text-blue-600 text-center'>Reset your account password</h2>
                <button onClick={() => setModalData(null)} className='bg-red-300 hover:bg-red-500 rounded-full text-lg px-[9px] absolute top-4 right-4'>X</button>
                {
                    success ?
                        <p className="my-4 text-center mx-3 text-green-600">Please check your email inbox and reset your account password!</p>
                        : <form onSubmit={handlePassReset}>
                            <div className="w-full my-3">
                                <label htmlFor='email' className="">Your account email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    id='email'
                                    required
                                    className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {error && <p role="alert" className='pl-4px text-sm text-red-500'>{error}</p>}
                            </div>
                            <button
                                type='submit'
                                disabled={loading}
                                className='px-6 mx-auto block mt-3  bg-blue-700 active:bg-blue-900 font-semibold text-white py-2 rounded-md active:outline outline-green-600'
                            >{loading ? <SmallSpinner /> : "Reset"}</button>
                        </form>
                }
            </div>
        </div>
    );
};

export default ResetPassword;