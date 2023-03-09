import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboardCustomize, MdOutlineReportOff } from "react-icons/md";
import { FaUsersCog, FaCashRegister, FaUsers, FaHome } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineComment, AiFillHdd } from "react-icons/ai";
import { SiAdobeacrobatreader } from "react-icons/si";
import { MdPreview } from "react-icons/md";
import { ImUpload2 } from "react-icons/im";
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Pages/shared/Navbar';
import DashboardItem from './DashboardItem';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
    const { dbUser, isLoading, isError, error } = useSelector((state) => state.dbAuth);
    const menus = [
        {
            name: "Dashboard",
            link: `/dashboard`,
            icon: MdOutlineDashboardCustomize
        },
        {
            name: "Make Order",
            link: "/dashboard/offline-order-make",
            icon: BsPencilSquare,
            margin: true
        },
        {
            name: "services",
            subMenu: [
                { subName: "All Service", subLink: "/dashboard/all-service", subIcon: SiAdobeacrobatreader },
                { subName: "Add New Service", subLink: "/dashboard/add-new-service", subIcon: ImUpload2 },
                { subName: "Service Review", subLink: "/dashboard/service-review", subIcon: MdPreview },
                { subName: "Reported Service", subLink: "/dashboard/reported-service", subIcon: MdOutlineReportOff },
            ],
            icon: AiFillHdd
        },
        {
            name: "Create Employee & user",
            link: "/dashboard/create-employee",
            icon: FaUsersCog
        },
        {
            name: "All customer & user",
            link: "/dashboard/all-user",
            icon: FaUsers
        },
        {
            name: "Sales History",
            subMenu: [
                { subName: "Orders", subLink: "/dashboard/order-history", subIcon: SlNotebook },
                { subName: "Bookings", subLink: "/dashboard/booking-history", subIcon: FaHome },
            ],
            icon: FcSalesPerformance
        },
        {
            name: "Staff Activity log",
            link: "/dashboard/activity-log/all",
            icon: TbActivity
        },
        {
            name: "Cash Management",
            subMenu: [
                { subName: "All cash", subLink: "/all-cash", subIcon: FaHome },
                { subName: "All Expense", subLink: "/all-expense", subIcon: FaHome },
                { subName: "All Sales", subLink: "/all sales", subIcon: FaHome },
                { subName: "Cas management", subLink: "/dashboard/cash-management", subIcon: FaHome },
            ],
            icon: FaCashRegister,
            margin: true
        },
    ];
    const [openDrawer, setOpenDrawer] = useState(true);
    const [subItemShow, setSubItemShow] = useState("");
    const [toggle, setToggle] = useState({});
    // console.log(openDrawer)
    return (
        <div>
            <Navbar></Navbar>
            <section className='flex min-h-screen pl-12 md:pl-0 mx-auto relative'>
                {/* main content overlay */}
                {!openDrawer &&
                    <div
                        onClick={() => setOpenDrawer(!openDrawer)}
                        style={{ background: "rgba(80, 21, 76, 0.30)" }}
                        className='block md:hidden absolute top-0 left-0 z-10 w-full h-full'
                    ></div>
                }
                <div className={`bg-gray-800 z-20 h-full absolute left-0 top-0 md:sticky md:min-h-screen ${openDrawer ? "w-14 md:w-72 xl:w-96" : "w-64 smm:w-68 md:w-16"} duration-300 md:duration-500`}>
                    <div className='px-3 md:px-4 text-gray-100 sticky top-0 left-0'>
                        <div className='pt-3 flex justify-end'>
                            <HiMenuAlt3 className="cursor-pointer active:bg-gray-600 rounded-full text-xl md:text-2xl xl:text-4xl" onClick={() => setOpenDrawer(!openDrawer)} />
                        </div>
                        <div className='flex flex-col gap-2 mt-4 relative'>
                            {
                                menus?.map((item, index) => <DashboardItem
                                    item={item}
                                    index={index}
                                    openDrawer={openDrawer}
                                    key={index}
                                    subItemShow={subItemShow}
                                    setSubItemShow={setSubItemShow}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />)
                            }
                        </div>
                    </div>
                </div>
                    <Outlet></Outlet>
            </section>
        </div>
    );
};

export default DashboardLayout;