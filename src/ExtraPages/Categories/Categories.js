import React from 'react';
import Category from './Category';

const Categories = () => {
    const serviceCategory = [
        {
            category: "Massage",
            _id: "jak1",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body" }, { name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }]
        },
        {
            category: "Hair-style",
            _id: "jak2",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }, { name: "Treats", brands: ["Vivo", "Samsung", "Real-me"] }]
        },
        {
            category: "Cosmetics",
            _id: "jak3",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Mobiles", brands: ["Vivo", "Samsung", "Real-me"] }, { name: "Baby mode", brands: ["Loson", "hello", "Rakaaaaa"] }]
        },
        {
            category: "Fashion",
            _id: "jak4",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body Treats" }, { name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }]
        },
        {
            category: "Fashion",
            _id: "jak5",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body Treats" }, { name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }]
        },
        {
            category: "Fashion",
            _id: "jak6",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body Treats" }, { name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }]
        },
        {
            category: "Fashion",
            _id: "jak7",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "Body Treats" }, { name: "Body In Balance" }, { name: "Under Pressure" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }, { name: "Forever Balanced" }]
        },
        {
            category: "Price Expenses",
            _id: "jak8",
            categoryImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMTDLPaTGBDMtZu3ljJF1pOaDVf7Fjgnm-RZTVrSOwDvOBynQf7YBPCQThZF26Dnuz4&usqp=CAU",
            subCategory: [{ name: "High" }, { name: "Low" }, { name: "Medium" }, { name: "Discount" }, { name: "Popular Service" }]
        },
    ];
    let content;
    // if (isLoading) {
    //     content = <LargeSpinner />;
    // };
    // if (isError) {
    //     if (error.error) {
    //         content = <div className='text-center mt-10 md:mt-52'>
    //             <p className="text-2xl text-red-500">{error.error}</p>
    //         </div>
    //     } else {
    //         content = <div className='text-center mt-10 md:mt-52'>
    //             <p className="text-2xl text-red-500">{error.data.message}</p>
    //         </div>
    //     }
    // } else if (!isLoading && data.success) {
    //     if (data?.data?.length === 0) {
    //         content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty services !</h3>
    // } else {
    content = <main className='flex justify-center gap-2 max-w-[90vw] overflow-x-scroll px-3'>
        {
            serviceCategory.map((category) => <Category category={category} key={category._id} />)
        }
    </main>
    //     };
    // };
    return (
        <div className='relative'>
            {
                content
            }
        </div>
    );
};

export default Categories;