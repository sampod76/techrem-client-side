import React from 'react';
import { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { useGetAllServiceQuery } from '../../../../app/features/product/serviceApi';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
import CategoryNavbar from '../../../HomePage/Categorybar/CategoryNavbar';
import OfflineSingleService from './OfflineServiceSingle';

const OfflineOrderMake = () => {
   const [queryData, setQueryData] = useState({ priceSerial: "", keyword: "", mainCategory: "", subCategory1: "", subCategory2: "" })
    const { data, isLoading, isError, error } = useGetAllServiceQuery(queryData);
   

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
            content = <main className='grid grid-cols-2 smm:grid-cols-3 md:grid-cols-3 lgg:grid-cols-5 xl:grid-cols-6 mx-4 gap-x-2 gap-y-2 mt-4'>
                {
                    data.data.map((service) => <OfflineSingleService
                        service={service}
                        key={service._id}
                    />)
                }
            </main>
        };
    };
    return (
        <div
            className='pb-5 w-full'
            style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(138, 255, 71, 0.3)), url(https://png.pngtree.com/thumb_back/fh260/background/20201024/pngtree-d-illustration-mock-up-scene-geometry-shape-platform-forms-for-product-image_435976.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <CategoryNavbar queryData={queryData} setQueryData={setQueryData}></CategoryNavbar>
            <section>
                <div>
                    {
                        content
                    }
                </div>
            </section>
        </div>
    );
};

export default OfflineOrderMake;