import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteServiceMutation, useGetAllServiceQuery, } from '../../../../app/features/product/serviceApi';
import DeleteConfirmModal from '../../../../component/form/DeleteConfirmModal';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
import CategoryNavbar from '../../../HomePage/Categorybar/CategoryNavbar';
import Service from './Service';

const AllServices = () => {
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [queryData, setQueryData] = useState({ priceSerial: "", keyword: "", mainCategory: "", subCategory1: "", subCategory2: "" })
    const { data, isLoading, isError, error } = useGetAllServiceQuery(queryData);
    const [deleteService] = useDeleteServiceMutation();
    const handleDelete = async () => {
        const results = await deleteService(deletedProduct?._id);
        // console.log(results)
        if (!results.error) {
            toast.success(results.data.message);
            setDeletedProduct(null);
        } else {
            toast.error(results.error.data.message);
        }
    };

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
            content = <main className='grid grid-cols-1 smm:grid-cols-2 md:grid-cols-1 mdd:grid-cols-2 xxl:grid-cols-3 gap-x-4 gap-y-2 mt-4'>
                {
                    data.data.map((service) => <Service
                        service={service}
                        setDeletedProduct={setDeletedProduct}
                        key={service._id}
                    />)
                }
            </main>
        };
    };
    return (
        <div
            className='w-full relative'
            style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(138, 255, 71, 0.3)), url(https://media.istockphoto.com/id/1320617268/vector/abstract-shine-silver-cylinder-pedestal-podium-sci-fi-white-empty-room-concept-with-semi.jpg?s=612x612&w=0&k=20&c=pdFiGdxqu5tCeOGAzSLmWi6n-vyDvL7DNjbYrxsSlzo=)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <CategoryNavbar queryData={queryData} setQueryData={setQueryData}></CategoryNavbar>
            <div
                className='px-6 md:px-6 lg:px-8 py-3'
            >
                <h2 className='text-2xl ml-1'>All salable products in our market.</h2>
                {content}
            </div>
            {deletedProduct &&
                <DeleteConfirmModal
                    deletedData={deletedProduct}
                    setDeletedData={setDeletedProduct}
                    deleteSuccess={handleDelete}
                    dataType="Food"
                ></DeleteConfirmModal>
            }
        </div>
    );
};

export default AllServices;