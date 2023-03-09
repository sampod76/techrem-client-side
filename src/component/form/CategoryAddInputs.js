import React from 'react';
import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useGetMainCtgQuery, useGetSubCtg1Query, useGetSubCtg2Query, usePostCategoryMutation } from '../../app/features/others/categoriesApi';

const CategoryAddInputs = ({ctgValue, setCtgValue}) => {
    const [openCtg, setOpenCtg] = useState({ mainCtg: false, subCtg_1: false, subCtg_2: false });
    const [ctgAdd, setCtgAdd] = useState({ mainCtg: false, subCtg_1: false, subCtg_2: false });
    const { data: mainCategories, isLoading, isError, error } = useGetMainCtgQuery();
    const { data: subCategories1, } = useGetSubCtg1Query({ mainCategory: ctgValue?.mainCtg });
    const { data: subCategories2, } = useGetSubCtg2Query({ mainCategory: ctgValue?.mainCtg, subCategory1: ctgValue?.subCtg_1 });
    // const [postCategory, { isLoading: postLoading, }] = usePostCategoryMutation();

    // const handlePostCategory = async () => {
    //     const result = await postCategory(ctgValue);
    //     console.log(result)
    // }

    let categories;
    if (isLoading) {
        categories = [];
        return;
    };
    if (isError) {
        categories = []
        if (error.error) {
            return console(error.error);
        } else {
            return console.log(error.data.massage)
        }
    };
    if (!isLoading && mainCategories?.success) {
        categories = mainCategories.data;
    };
    return (
        <div className='h-fit w-full rounded-lg '>
            <div className='w-full grid smm:grid-cols-2 mdd:grid-cols-3 gap-4'>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className="">Main Category</label>
                    <div className='w-full select-none mt-1 relative flex justify-start items-center gap-1'>
                        {ctgAdd.mainCtg ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setCtgValue({ ...ctgValue, mainCtg: e.target.value })}
                                    placeholder={`Main Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenCtg({ mainCtg: !openCtg.mainCtg })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openCtg.mainCtg && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{ctgValue.mainCtg ? ctgValue.mainCtg : "Main Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${openCtg.mainCtg || "-rotate-90"}`} />
                                </div>
                                {openCtg.mainCtg &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenCtg({ ...openCtg, mainCtg: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {categories.map((main, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setCtgValue({ mainCtg: main.name })
                                                    setOpenCtg({ ...openCtg, mainCtg: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{main.name}</p>
                                        </div>)}
                                    </div>}
                            </div>
                        }
                        <div
                            onClick={() => setCtgAdd({ ctgAdd, mainCtg: !ctgAdd.mainCtg })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(ctgAdd.mainCtg ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                </div>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className=""> Sub Category</label>
                    <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                        {ctgAdd.subCtg_1 ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setCtgValue({ ...ctgValue, subCtg_1: e.target.value })}
                                    placeholder={`Sub Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenCtg({ subCtg_1: !openCtg.subCtg_1 })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openCtg.subCtg_1 && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{ctgValue.subCtg_1 ? ctgValue.subCtg_1 : "Sub Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openCtg.subCtg_1 && "-rotate-90"}`} />
                                </div>
                                {ctgValue.mainCtg && openCtg.subCtg_1 &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenCtg({ ...openCtg, subCtg_1: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {subCategories1?.data?.map((sub1, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setCtgValue({ ...ctgValue, subCtg_1: sub1.name, subCtg_2: "" })
                                                    setOpenCtg({ ...openCtg, subCtg_1: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{sub1.name}</p>
                                        </div>)}
                                    </div>}
                            </div>}
                        <div
                            onClick={() => setCtgAdd({ ctgAdd, subCtg_1: !ctgAdd.subCtg_1 })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(ctgAdd.subCtg_1 ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                    {/* {bookManSlotPhone.slotError && <p role="alert" className='pl-4px text-sm'>{bookManSlotPhone.slotError}</p>} */}
                </div>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className=""> Extra Category</label>
                    <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                        {ctgAdd.subCtg_2 ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setCtgValue({ ...ctgValue, subCtg_2: e.target.value })}
                                    placeholder={`Sub Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md" 
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenCtg({ subCtg_2: !openCtg.subCtg_2 })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openCtg.subCtg_2 && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{ctgValue.subCtg_2 ? ctgValue.subCtg_2 : "Extra Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openCtg.subCtg_2 && "-rotate-90"}`} />
                                </div>
                                {ctgValue.subCtg_1 && openCtg.subCtg_2 &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenCtg({ ...openCtg, subCtg_2: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {subCategories2?.data?.map((sub2, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setCtgValue({ ...ctgValue, subCtg_2: sub2.name })
                                                    setOpenCtg({ ...openCtg, subCtg_2: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{sub2.name}</p>
                                        </div>)}
                                    </div>}
                            </div>}
                        <div
                            onClick={() => setCtgAdd({ ctgAdd, subCtg_2: !ctgAdd.subCtg_2 })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(ctgAdd.subCtg_2 ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                </div>
                {ctgValue.error && <p role="alert" className='pl-4px text-sm -mt-6'>{ctgValue.error}</p>}
            </div>
            {/* <button
                onClick={handlePostCategory}
                className='bg-green-500 active:bg-cyan-500 active:outline outline-2 outline-indigo-600 hover:bg-green-600 py-2 px-3 rounded-md font-semibold text-white'
            >SUBMIT</button> */}
        </div>
    );
};

export default CategoryAddInputs;