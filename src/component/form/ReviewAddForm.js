import ReactStars from "react-rating-stars-component";
import React, { useState } from 'react';

const ReviewAddForm = ({ setModalData, modalData }) => {
    const [review, setReview] = useState({reviewText: '', rating: 0});
    const submitReview = () => {
        console.log(review)
    }
    return (
        <div
            className='fixed top-0 left-0 flex justify-center items-center w-full h-screen'
            style={{ background: "rgba(68, 21, 76, 0.40)" }}
        >
            <div className='shadow-2xl w-[450px] rounded px-10 py-4 z-30 bg-slate-50 relative'>
                <h2 className='text-2xl text-blue-600 text-center'>Place your review</h2>
                <button onClick={() => setModalData(null)} className='bg-red-300 hover:bg-red-500 rounded-full text-lg px-[9px] absolute top-4 right-4'>X</button>
                <div>
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <h4 className="text-2xl font-thin text-yellow-600">Ratings :</h4>
                        <ReactStars
                            count={5}
                            onChange={(rating)=>setReview({ ...review, rating})}
                            size={32}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className="w-full mb-3">
                        <textarea
                            onBlur={(e) => setReview({ ...review, [e.target.name]: e.target.value })}
                            type="text"
                            name="reviewText"
                            required
                            placeholder="write your comment for our service"
                            className="w-full min-h-[70px] text-zinc-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                    </div>

                    <button onClick={submitReview} className='px-6 mx-auto block mt-3 bg-blue-700 active:bg-blue-900 font-semibold text-white py-2 rounded-md hover:outline outline-green-600'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewAddForm;