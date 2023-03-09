import React, { useState } from 'react';
import { useGetAllServiceQuery } from '../../../app/features/product/serviceApi';
import LargeSpinner from '../../../component/spinner/LargeSpinner';
import MassageCard from './MassageCard';
import CategoryNavbar from '../Categorybar/CategoryNavbar';
import CategorySideBar from '../Categorybar/CategorySideBar';

const Massages = () => {
    const [queryData, setQueryData] = useState({ priceSerial: "", keyword: "", mainCategory: "", subCategory1: "", subCategory2: "" });
    const [matchService, setMatchService] = useState([]);
    const [showBrands, setShowBrands] = useState("");
    const { data, isLoading, isError, error } = useGetAllServiceQuery(queryData);
    // console.log(data)
    
    let content;
    if (isLoading) {
        content = <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data.success) {
        if (data?.data?.length === 0) {
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty services !</h3>
        } else {
            content = <main className='grid grid-cols-2 mdd:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2 mt-4'>
                {
                    data.data.map((service) => <MassageCard service={service} key={service._id} />)
                }
            </main>
        };
    };
    
    console.log(queryData, 10)
    return (
        <div className=''>
            <CategoryNavbar queryData={queryData} setQueryData={setQueryData}></CategoryNavbar>
            <CategorySideBar queryData={queryData} setQueryData={setQueryData}></CategorySideBar>
            <section>
                {
                    content
                }
            </section>
        </div>
    );
};

export default Massages;