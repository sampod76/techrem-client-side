import React from 'react';
import { useLocation } from 'react-router-dom';
import SingleOrderHistory from './SingleOrderHistory';

const OrderHistory = () => {
    const { pathname } = useLocation();
    const allOrder = [
        {
            _id: "#34252",
            customer: "Fahim All Hasan",
            payment: "paid",
            orderType: "Online",
            status: "Proecing",
            foodName: "Singara",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#34225",
            customer: "Rohim All Hasan",
            payment: "Unpaid",
            orderType: "Ofliene",
            status: "Delivered",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#34222",
            customer: "Fahim All Hasan",
            payment: "paid",
            orderType: "Online",
            status: "Cancelled",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#34222",
            customer: "Fahim All Hasan",
            payment: "Cash",
            orderType: "Ofline",
            status: "Cancelled",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#34222",
            customer: "Fahim All Hasan",
            payment: "Cash",
            orderType: "Ofline",
            status: "Cancelled",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#44222",
            customer: "Fahim All Hasan",
            payment: "paid",
            orderType: "Online",
            status: "Cancelled",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },
        {
            _id: "#34822",
            customer: "Khalek Mal",
            payment: "paid",
            orderType: "Online",
            status: "Cancelled",
            foodName: "Cool Burger",
            quantity: 5,
            foodImg: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            orderedDate: "12:20 January 25 2023"
        },

    ]
    return (
        <div className='bg-gray-100 rounded-t-md mt-1 p-4'>
            {pathname === "/dashboard" || <header>
                <h2 className='text-2xl font-semibold my-5'>Order History</h2>
                <nav>
                    <ul className='flex justify-start gap-5 my-2'>
                        <li className='text-lg font-semibold list-none text-zinc-500 hover:text-zinc-700 mb-1 hover:border-b-4 hover:mb-0 border-green-400'>All Order</li>
                        <li className='text-lg font-semibold list-none text-zinc-500 hover:text-zinc-700 mb-1 hover:border-b-4 hover:mb-0 border-green-400'>Summery</li>
                        <li className='text-lg font-semibold list-none text-zinc-500 hover:text-zinc-700 mb-1 hover:border-b-4 hover:mb-0 border-green-400'>Completed</li>
                        <li className='text-lg font-semibold list-none text-zinc-500 hover:text-zinc-700 mb-1 hover:border-b-4 hover:mb-0 border-green-400'>Cancelled</li>
                    </ul>
                </nav>
            </header>}
            <main>
                <table className="table text-left w-full">
                    {pathname === "/dashboard" || <thead>
                        <div className='border grid grid-cols-12 pl-3 py-1 rounded-xl mb-6'>
                            <th className='col-span-2'>ID</th>
                            <th className='col-span-3 ml-2'>Name</th>
                            <th className='col-span-1'>Quantity</th>
                            <th className='col-span-2 text-center mr-2'>Type</th>
                            <th className='col-span-1'>Status</th>
                            <th className='col-span-2 text-center'>Payment</th>
                            <th className='col-span-1'>Action</th>
                        </div>
                    </thead>}
                    <tbody>
                        <div className='grid grid-cols-1 gap-3'>
                            {
                                allOrder.map(order => <SingleOrderHistory order={order} key={order._id} pathname={pathname}/>)
                            }
                        </div>
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default OrderHistory;