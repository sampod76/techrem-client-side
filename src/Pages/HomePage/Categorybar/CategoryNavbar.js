import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useGetAllCategoryQuery } from '../../../app/features/others/categoriesApi';

const CategoryNavbar = ({ queryData, setQueryData }) => {
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading, isError, error } = useGetAllCategoryQuery();
    const [services, setServices] = useState([]);
    const [matchService, setMatchService] = useState([]);
    const [showBrands, setShowBrands] = useState("");
    useEffect(() => {
        let loadServices = async () => {
            const response = await axios.get(`${process.env.REACT_APP_DEV_URL}/services/allservices`);
            setServices(response.data.data);
        }
        loadServices();
    }, []);


    // const getUniquePro = (array, property) => {
    //     let newVal = array.map((curElem)=> )
    // }
    const handleSearch = (text) => {
        let matches = [];
        let matchesName = services.filter((service) => service.serviceName.toLowerCase().includes(text.toLowerCase())).map((curElem) => curElem.serviceName);
        let matchesCategory = services.filter((service) => service.category.mainCategory.toLowerCase().includes(text.toLowerCase())).map((curElem) => curElem.category.mainCategory);
        let matchesCtg1 = services.filter((service) => service.category.subCategory1.toLowerCase().includes(text.toLowerCase())).map((curElem) => curElem.category.subCategory1);
        let matchesCtg2 = services.filter((service) => service.category.subCategory2.toLowerCase().includes(text.toLowerCase())).map((curElem) => curElem.category.subCategory2);
        matches = [...matchesName, ...matchesCategory, ...matchesCtg1, ...matchesCtg2];
        matches = [...new Set(matches)];
        setMatchService(text ? matches : []);
        text || setQueryData({ ...queryData, keyword: "" })
    }
    // const handleSearch = (text) => {
    //     let matches = services.filter((service) => service.serviceName.toLowerCase().includes(text.toLowerCase()))
    //     console.log(matches)
    // matches = [...new Set(matches)];
    //     setMatchService(text ? matches : []);
    //     text || setQueryData({ ...queryData, keyword: "" })
    // }


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
    // console.log(queryData)
    return (
        <div>
            <section className='select-none hidden lg:block'>
                <div className='bg-zinc-300 shadow-lg w-full py-2 pr-6 ml-auto flex justify-end'>
                    <label className="relative block rounded-md">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsSearch className='active:text-green-300' />
                        </span>
                        <input
                            onChange={(e) => handleSearch(e.target.value)}
                            onBlur={() => setTimeout(() => setMatchService([]), 500)}
                            className="placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-1 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Search for anything..." type="text" name="search" autoComplete="off"
                        />
                        {matchService.length !== 0 && <div className='absolute bg-white drop-shadow-md rounded w-full py-1 z-20'>
                            {matchService.slice(0, 10).map((serviceName, _id) =>
                                <p
                                    onClick={() => {
                                        setQueryData({ ...queryData, keyword: serviceName });
                                        setMatchService([])
                                    }}
                                    key={_id}
                                    className='font-[7000] pl-3 my-1 cursor-pointer hover:bg-gray-100 active:bg-gray-200 capitalize hover:text-blue-500'
                                >{serviceName}</p>
                            )}
                        </div>}
                    </label>
                    <div className='mx-2 flex justify-between'>
                        {categories.map(({ mainCategory, subCategory1 }, i) => <div key={i} className='group relative'>
                            <button onClick={() => {
                                setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: "", subCategory2: "" })
                            }} className='text-orange-400 font-semibold py-1 hover:pb-0 px-2 hover:text-indigo-400 hover:border-b-4 border-indigo-300 min-w-[60px]'>{mainCategory}</button>
                            <div className='bg-white hidden group-hover:block absolute top-8 left-0 z-20 shadow-lg'>
                                {subCategory1 && subCategory1.map((sub, i) => <div key={i} className='relative'>
                                    <button
                                        onClick={() => setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: sub.name, subCategory2: "" })}
                                        onMouseEnter={() => setShowBrands(sub?.name)}
                                        className='hover:text-white hover:bg-green-400 whitespace-pre text-start px-2 w-full border-b min-w-[80px]'
                                    >{sub?.name}</button>
                                    <div className={` ${showBrands === sub?.name ? "block" : "hidden"} absolute top-0 left-full bg-white`}>
                                        {
                                            sub?.subCategory2 && sub?.subCategory2?.map((sub2, i) => <div key={i}>
                                                <button
                                                    onClick={() => setQueryData({ ...queryData, mainCategory: mainCategory, subCategory1: sub.name, subCategory2: sub2.name })}
                                                    className='hover:text-white hover:bg-blue-400 whitespace-pre text-start px-2 border-b min-w-[70px]'
                                                >{sub2.name}</button>
                                            </div>)
                                        }
                                    </div>
                                </div>)}
                            </div>
                        </div>)}
                        <div className='relative group'>
                            <button
                                className='text-orange-400 font-semibold py-1 hover:pb-0 px-2 hover:text-indigo-400 hover:border-b-4 border-indigo-300'
                            >Expenses</button>
                            <div
                                className={`absolute top-8 -right-2 hidden group-hover:block bg-white z-20`}
                            >
                                <div className=''>
                                    <button onClick={() => setQueryData({ ...queryData, priceSerial: "high" })} className='hover:text-white hover:bg-green-400 whitespace-pre text-start px-2 w-full'>High Price</button>
                                    <button onClick={() => setQueryData({ ...queryData, priceSerial: "low" })} className='hover:text-white hover:bg-green-400 whitespace-pre text-start px-2 w-full'>Low Price</button>
                                    <button className='hover:text-white hover:bg-green-400 whitespace-pre text-start px-2 w-full'>Discount</button>
                                    <button className='hover:text-white hover:bg-green-400 whitespace-pre text-start px-2 w-full'>Popular</button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setQueryData({ priceSerial: "", keyword: "", mainCategory: "", subCategory1: "", subCategory2: "" })}
                            className='text-orange-400 font-semibold py-1 hover:pb-0 px-2 hover:text-indigo-400 hover:border-b-4 border-indigo-300'
                        >All</button>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default CategoryNavbar;