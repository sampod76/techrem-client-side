import React from 'react';
import { updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import auth from '../../firebase/firebase.config';
import { headers, headers2 } from '../../utils/headers';
import SmallSpinner from '../spinner/SmallSpinner';
import { useUpdatePasswordMutation } from '../../app/features/auth/authApi';
const ChangePassword = ({ setModalData, modalData }) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({});
    const [success, setSuccess] = useState({ validUser: false, change: "" });
    const [updatePasswordDb] = useUpdatePasswordMutation();
    const handlePassword = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (inputs.prePass) {
            if (inputs.prePass.length < 6) {
                setLoading(false);
                return setError("Password must be 6 character!");
            } else {
                const data = { email: modalData.email, previouspassword: inputs.prePass }
                try {
                    const result = await axios(`${process.env.REACT_APP_DEV_URL}/users/get-pass`, { headers: { ...headers, ...data } });
                    if (result.data.success) {
                        e.target.reset();
                        setModalData({ ...modalData, prePass: inputs.prePass })
                        setInputs({})
                        setSuccess({ ...success, validUser: true });
                        setLoading(false);
                        setError("");
                        toast.success("Carefully set yur new password!")
                    } else {
                        setError(result.data.message);
                        toast.error("Something is wrong!");
                        setLoading(false);
                    };
                } catch (err) {
                    console.log("url", err);
                }
            };
        } else {
            if (inputs.newPassword) {
                if ((inputs.newPassword < 6) || (inputs.newPassword !== inputs.confirmPass)) {
                    if ((inputs.newPassword.length < 6) || (inputs.confirmPass < 6)) {
                        setLoading(false);
                        return setError("New and confirm Password must be 6 character!");
                    } else {
                        setLoading(false);
                        return setError("New and confirm password must be same!");
                    }
                } else {
                    updatePassword(auth.currentUser, inputs.confirmPass).then((res) => {
                        updatePasswordDb({ password: inputs.newPassword, email: modalData.email })
                            .then(res => {
                                console.log(res)
                                if (!res.error && res.data.success) {
                                    setLoading(false);
                                    e.target.reset();
                                    setSuccess({ change: "Password has been changed. Please login your account by new password!" });
                                    toast.warning("Password has been changed")
                                } else {
                                    if(res.error){
                                        console.log(res.error);
                                        setLoading(false);
                                        setError(res.error)
                                        toast.error(res.error)
                                    }else if(!res.data.success){
                                        console.log(res.data);
                                        setLoading(false);
                                        setError(res.data.message)
                                        toast.error(res.data.message)
                                    }else{
                                        console.log(res)
                                        setLoading(false);
                                    }
                                }

                            }).catch(e => {
                                console.log(e)
                            })
                    }).catch((error) => {
                        setError(error.message === "Firebase: Error (auth/user-not-found)." ? "Please enter correct email address!" : error.message);
                        setLoading(false);
                    });
                }
            }
        }
    };
    return (
        <div
            className='fixed top-0 left-0 z-30 flex justify-center items-center w-full h-screen'
            style={{ background: "rgba(68, 21, 76, 0.50)" }}
        >
            <div className='shadow-2xl w-[350px] smm:w-[400px] rounded md:mb-7 px-8 py-4 z-30 bg-slate-50 relative'>
                <h2 className='text-xl text-blue-600 text-center'>Change your account password</h2>
                <button onClick={() => setModalData(null)} className='bg-red-300 hover:bg-red-500 rounded-full text-lg px-[9px] absolute top-4 right-4'>X</button>
                {success.change ?
                    <p className="my-4 text-center mx-3 text-green-600">{success.change}</p>
                    : <form onSubmit={handlePassword}>
                        <div className="w-full my-3">
                            {success.validUser ?
                                <div>
                                    <label htmlFor='newPassword' className="">New password</label>
                                    <input
                                        onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                        name="newPassword" type="password"
                                        placeholder="Enter new password" required
                                        className="w-full text-lg text-gray-800 bg-slate-200 py-1 px-3 my-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                    />
                                    <label htmlFor='confirmPassword' className="">Confirm new password</label>
                                    <input
                                        onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                        name="confirmPass" type="password"
                                        placeholder="Confirm new password" required
                                        className="w-full text-lg text-gray-800 bg-slate-200 py-1 px-3 mt-1 mb-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                                    />
                                </div>
                                : <div>
                                    <label htmlFor='prePassword' className="mt-1">Your previews password</label>
                                    <input
                                        onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                                        name="prePass" type="password"
                                        placeholder="Enter previews password" required
                                        className="w-full text-lg mb-3 text-gray-800 bg-slate-200 py-1 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                    />
                                </div>
                            }
                            {error && <p role="alert" className='pl-[2px] text-sm -mt-[10px] text-red-600 animate-pulse'>{error}</p>}
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='px-6 mx-auto w-28 block mt-3 bg-blue-700 active:bg-blue-900 font-semibold text-white py-2 rounded-md active:outline outline-green-600'
                        >{loading ? <SmallSpinner /> : success.validUser ? "Confirm" : "Change"}</button>
                    </form>
                }
            </div>
        </div>
    );
};

export default ChangePassword;