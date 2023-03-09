import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCategoryQuery } from '../../../app/features/others/categoriesApi';
import { toggleSideBar } from '../../../app/features/others/othersSlice';

const CategorySideBar = ({ queryData, setQueryData }) => {
    const { data, isLoading, isError, error } = useGetAllCategoryQuery(queryData);
    const barToggle = useSelector((state) => state.otherState.sideBar);
    const [showCategory, setShowCategory] = useState({});
    const [showSubCategory, setShowSubCategory] = useState({});
    const dispatch = useDispatch();

    let categories;
    if (isLoading) {
        categories = [];
        return;
    };
    if (isError) {
        categories = []
        if (error.error) {
            return console.log(error.error);
        } else {
            return console.log(error.data.massage)
        }
    };
    if (!isLoading && data?.success) {
        categories = data.data;
    };
    return (
        <div>
            <div
                onClick={() => dispatch(toggleSideBar())}
                style={{ background: "rgba(80, 21, 76, 0.30)" }}
                className={`block lg:hidden ${barToggle || "hidden"} fixed top-0 left-0 z-10 w-full h-full`}
            ></div>
            <div className={`${barToggle ? "w-64" : "w-0"} duration-500 fixed z-20 top-11 left-0 block lg:hidden`}>
                <div className='h-[93vh] -ml-2 flex flex-col justify-start overflow-y-scroll w-full pt-2 bg-gray-50 drop-shadow-lg'>
                    {categories.map(({ mainCategory, subCategory1 }, i) => <div key={i} >
                        <div
                            onClick={() => {
                                setShowCategory({ [mainCategory]: showCategory[mainCategory] === mainCategory ? "" : mainCategory })
                                setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: "", subCategory2: "" })
                            }}
                            className='font-semibold hover:bg-indigo-200 cursor-pointer select-none py-2 border-b border-gray-300 text-gray-900 w-full flex justify-between items-center px-4'
                        >
                            <p>{mainCategory}</p>
                            {showCategory[mainCategory] !== mainCategory ? <AiOutlinePlus /> : <AiOutlineMinus />}

                        </div>
                        {showCategory[mainCategory] === mainCategory && subCategory1 && subCategory1.map(({ name, subCategory2 }, i) => <div key={i} className=''>
                            <div
                                onClick={() => {
                                    setShowSubCategory({ [name]: showSubCategory[name] === name ? "" : name })
                                    setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: name, subCategory2: "" })
                                }}
                                className='font-medium hover:bg-indigo-100 cursor-pointer select-none py-2 px-7 border-b border-gray-300 text-gray-600 w-full flex justify-between items-center'
                            >
                                <p>{name}</p>
                                {subCategory2 && (showSubCategory[name] !== name ? <AiOutlinePlus /> : <AiOutlineMinus />)}

                            </div>
                            {
                                showSubCategory[name] === name && subCategory2 && subCategory2.map((sub2, i) => <div key={i}>
                                    <button
                                        onClick={() => {
                                            setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: name, subCategory2: sub2.name })
                                        }}
                                        className='hover:bg-green-300 text-gray-700 hover:text-white hover:font-medium text-start cursor-pointer select-none py-2 px-9 border-b border-gray-300 w-full'
                                    >{sub2.name}</button>
                                </div>)
                            }
                        </div>)}
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default CategorySideBar;