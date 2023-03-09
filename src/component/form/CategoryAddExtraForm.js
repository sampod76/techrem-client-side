import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePostCategoryMutation } from '../../app/features/others/categoriesApi';
import SmallSpinner from '../spinner/SmallSpinner';
import CategoryAddInputs from './CategoryAddInputs';

const CategoryAddExtraForm = () => {
    const [ctgValue, setCtgValue] = useState({ mainCtg: "", subCtg_1: "", subCtg_2: "" });
    const [postCategory, { isLoading, isError, error }] = usePostCategoryMutation();
    useEffect(() => {
        if (isError) {
            console.log(error)
        }
    }, [isError, error]);

    const handlePostCategory = () => {
        setCtgValue({ ...ctgValue, error: "" })
        if (!ctgValue.mainCtg) {
            return setCtgValue({ ...ctgValue, error: "Service category setup is required!" });
        }
        postCategory(ctgValue).then(async (res) => {
            if (res.data.success) {
                toast.success(res.data.message)
                setCtgValue({ mainCtg: "", subCtg_1: "", subCtg_2: "" });
            } else {
                toast.error(res.data.message)
            }
        })
    }
    return (
        <div className='border border-blue-500 px-8 pb-10 max-w-2xl  mt-6 mx-auto'>
            <h1 className='text-2xl text-blue-500 my-4 underline'>Add new category</h1>
            <CategoryAddInputs ctgValue={ctgValue} setCtgValue={setCtgValue}></CategoryAddInputs>
            <button onClick={handlePostCategory} className='w-40 px-8 py-2 mx-auto block mt-8 bg-blue-700 active:outline outline-green-500 active:text-yellow-400 font-semibold text-white rounded-md hover:bg-blue-800 duration-100'>{isLoading ? <SmallSpinner /> : "Post Service"}</button>
        </div>
    );
};

export default CategoryAddExtraForm;