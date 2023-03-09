import React from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetAllActivityQuery } from '../../../../app/features/activityLog/activityLogApi';
import LargeSpinner from '../../../../component/spinner/LargeSpinner';
import { ADD_BOOKING, ADD_SERVICE, ADD_USER, ADMIN, DELETE_BOOKING, DELETE_USER, MANAGER, POS_STAFF, REMOVE_SERVICE, STAFF, UPDATE_BOOKING, UPDATE_SERVICE, USER } from '../../../../utils/constant';
import SingleActivity from './SingleActivity';

const ActivityLog = () => {
    const { pathname } = useLocation();
    const { id: itemId } = useParams();
    const [activityQuery, setActivityQuery] = useState({ role: "", date: "", activityType: "" });
    const { data, isLoading, isError, error } = useGetAllActivityQuery(`/activitys/allactivity?activityItemId=${itemId}&role=${activityQuery?.role}&date=${activityQuery?.date}&activityType=${activityQuery?.activityType}`);
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
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
    };
    if (!isLoading && data?.success) {
        content = <div className='grid grid-cols-1 mdd:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-2 px-4 mt-3'>
            {
                data.data.map((activity) => <SingleActivity activity={activity} key={activity._id} />)
            }
        </div>
    };
    return (
        <div className='w-full'>
            {
                pathname !== "/dashboard" && <div className='bg-zinc-300 shadow-sm w-full py-2 ml-auto flex justify-end'>
                    <div className='mx-2 flex justify-between pr-3'>
                        <input type="date" onChange={(e) => setActivityQuery({ ...activityQuery, date: new Date(e.target.value).toLocaleDateString() })} className='placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        <select onChange={(e) => setActivityQuery({ ...activityQuery, role: e.target.value })} className='font-medium text-md focus:ring-2 ring-blue-500 ml-2 rounded-md px-4'>
                            <option selected value="">select Role</option>
                            <option value={ADMIN}>Admin</option>
                            <option value={MANAGER}>Manager</option>
                            <option value={STAFF}>Staff</option>
                            <option value={POS_STAFF}>POS Staff</option>
                            <option value={USER}>Customer</option>
                        </select>
                        <select onChange={(e) => setActivityQuery({ ...activityQuery, activityType: e.target.value })} className='font-medium text-md focus:ring-2 ring-blue-500 ml-2 rounded-md px-4'>
                            <option selected value="">activity type</option>
                            <option value={REMOVE_SERVICE}>Delete service</option>
                            <option value={ADD_SERVICE}>Add service</option>
                            <option value={UPDATE_SERVICE}>Update service</option>
                            <option value={ADD_USER}>Add user</option>
                            <option value={DELETE_USER}>Delete user</option>
                            <option value={ADD_USER}>Add user</option>
                            <option value={ADD_BOOKING}>Update Booking</option>
                            <option value={DELETE_BOOKING}>Delete Booking</option>
                            <option value={UPDATE_BOOKING}>Add user</option>
                        </select>
                    </div>
                </div>
            }
            {
                content
            }
        </div>
    );
};

export default ActivityLog;
    // const allActivity = [
    //     {
    //         activities: "crete a new POS staff account",
    //         actType: "createAc",
    //         worker: "Khalek Hosen",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Habib Ulla",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "create a new manager account",
    //         actType: "createAc",
    //         worker: "MD. Subbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Jakir Hosen",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "deleted a food",
    //         actType: "foodBased",
    //         worker: "MD. Sabbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglai",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9b6neZQMUIKZ-lRqIkMOW_3ZNAjVGz8Ty8Q&usqp=CAU"
    //     },
    //     {
    //         activities: "posted a new food",
    //         actType: "foodBased",
    //         worker: "Kholil Mal",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Singara",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     },
    //     {
    //         activities: "crete a new customer account",
    //         actType: "createAc",
    //         worker: "Khalek Hosen",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Habib Ulla",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "has been placed a new order",
    //         actType: "foodBased",
    //         worker: "Abu Jahed",
    //         designation: "customer",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglay",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     },
    //     {
    //         activities: "create a new manager account",
    //         actType: "createAc",
    //         worker: "MD. Subbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Jakir Hosen",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "deleted a food",
    //         actType: "foodBased",
    //         worker: "MD. Sabbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglai",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9b6neZQMUIKZ-lRqIkMOW_3ZNAjVGz8Ty8Q&usqp=CAU"
    //     },
    //     {
    //         activities: "posted a new food",
    //         actType: "foodBased",
    //         worker: "Kholil Mal",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Singara",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     },
    //     {
    //         activities: "crete a new customer account",
    //         actType: "createAc",
    //         worker: "Khalek Hosen",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Habib Ulla",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "has been placed a new order",
    //         actType: "foodBased",
    //         worker: "Abu Jahed",
    //         designation: "customer",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglay",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     },
    //     {
    //         activities: "create a new manager account",
    //         actType: "createAc",
    //         worker: "MD. Subbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Jakir Hosen",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "deleted a food",
    //         actType: "foodBased",
    //         worker: "MD. Sabbir",
    //         designation: "admin",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglai",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9b6neZQMUIKZ-lRqIkMOW_3ZNAjVGz8Ty8Q&usqp=CAU"
    //     },
    //     {
    //         activities: "posted a new food",
    //         actType: "foodBased",
    //         worker: "Kholil Mal",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Singara",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     },
    //     {
    //         activities: "crete a new customer account",
    //         actType: "createAc",
    //         worker: "Khalek Hosen",
    //         designation: "manager",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         newUser: "Habib Ulla",
    //         newUserImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgpNeFwtFsdSLLp9qlln6CaGSwu9gGjRq45HGbBt9&s"
    //     },
    //     {
    //         activities: "has been placed a new order",
    //         actType: "foodBased",
    //         worker: "Abu Jahed",
    //         designation: "customer",
    //         time: "12:01 pm",
    //         date: "12-03-2023",
    //         food: "Moglay",
    //         foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5UvYN4wvoMdavEkGHgD_z5_QxYG1kY_hJg&usqp=CAU"
    //     }
    // ]
//     const SingleActivity = ({ activity }) => {
//         console.log(activity)
//     const { activities, actType, worker, designation, time, date, food, foodImg, newUser, newUserImg } = activity;
//     return (
//         <section className='relative'>
//             <div className={`flex justify-start items-center gap-3 border-b px-4 py-2 ${newUserImg && "bg-blue-50"}`}>
//                 <div>
//                     <img src={foodImg || newUserImg} className="w-16 rounded-full h-16" alt="" />
//                 </div>
//                 <div className='flex-col justify-between'>
//                     <p className='text-xs font-bold text-green-600'>{actType === "foodBased"? <span>{food}</span>: <span>{newUser}</span>}</p>
//                     <h5 className='text-sm'><span className=''>{designation}</span> <span className='font-semibold hover:underline hover:text-blue-700 '>{worker}</span> {activities}.</h5>
//                     <p className='text-xs text-gray-500 mt-1'><span className=''>{time}</span> {date}</p>
//                 </div>
//             </div>
//             <p className='text-gray-700 font-semibold absolute -top-2 right-3'>...</p>
//         </section>
//     );
// };