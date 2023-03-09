import React from 'react';
import { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const CashManagement = () => {
    const emptyRow = <div className='border bg-white grid grid-cols-10 items-center'>
        <td className='col-span-4 h-7 border border-t-0'></td>
        <td className='col-span-2 h-7 border border-t-0'></td>
        <td className='col-span-2 h-7 border border-t-0'></td>
        <td className='col-span-2 h-7 border border-t-0'></td>
    </div>;
    const [showCalculation, setShowCalculation] = useState("all");
    return (
        <div
            className='px-2 md:px-4 lg:px-6 pt-3 pb-8 w-full'
            style={{ background: `linear-gradient(90deg, rgba(226, 145, 186, 0.5), rgba(226, 145, 186, 0.3)), url(https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-investment-financial-management-financial-background-image_194572.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <div className='flex justify-between items-center mb-2'>
                <h2 className='text-2xl text-center text-white'>Recent cash management history of our market.</h2>
                <div>
                    <button
                        onClick={() => setShowCalculation("expenses")}
                        className='px-2 py-[2px] border text-sm font-medium text-blue-700 border-blue-500 bg-slate-100 hover:bg-blue-500 focus:bg-blue-500 focus:text-white active:bg-blue-700 hover:text-white rounded-lg '
                    >Expenses</button>
                    <button
                        onClick={() => setShowCalculation("sales")}
                        className='px-3 py-[2px] border text-sm font-medium text-blue-700 border-blue-500 bg-slate-100 hover:bg-blue-500 focus:bg-blue-500 focus:text-white active:bg-blue-700 hover:text-white rounded-lg ml-2'
                    >Sales</button>
                    <button
                        onClick={() => setShowCalculation("all")}
                        className='px-4 py-[2px] border text-sm font-medium text-blue-700 border-blue-500 bg-slate-100 hover:bg-blue-500 focus:bg-blue-500 focus:text-white active:bg-blue-700 hover:text-white rounded-lg mx-2 '
                    >All</button>
                </div>
            </div>
            <main>
                <table className="table text-left w-full">
                    <thead>
                        <div className='border grid grid-cols-10 pl-2 py-1 bg-green-500'>
                            <th className='col-span-4 row-span-2 text-start mt-auto text-lg'>Cash Balance</th>
                            <th className='col-span-2 text-center'>Today</th>
                            <th className='col-span-2 text-center'>Last week</th>
                            <th className='col-span-2 text-center'>Last Manth</th>
                            <td className='col-span-2 text-center font-thin text-green-900 text-sm'>Thursday</td>
                            <td className='col-span-2 text-center font-thin text-green-900 text-sm'>7 day</td>
                            <td className='col-span-2 text-center font-thin text-green-900 text-sm'>February</td>
                        </div>
                    </thead>
                    <tbody className='grid grid-cols-1'>
                        {showCalculation === "all" ?
                            <>
                                <section>
                                    <div className='border bg-white grid grid-cols-10 items-center'>
                                        <td className='col-span-4 font-bold text-md text-gray-700 py-1 p-1 border'>Opening Cash Balance</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border '>
                                            <p className='font-semibold'>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border '>
                                            <p className='font-semibold'>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border '>
                                            <p className='font-semibold'>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                </section>
                                <section className='h-44 overflow-y-scroll scrollbar-hide relative'>
                                    {emptyRow}
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center sticky top-0 left-0'>
                                        <td className='col-span-4 font-bold text-center text-lg'>REVENUES</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>In store sales</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Online Sales</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Other revenues</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Total Revenues</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                </section>
                                <section>
                                    {emptyRow}
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center'>
                                        <td className='col-span-4 font-bold pl-2'>GROOS PROFIT</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Cost of products carrying</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 h-full'>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>510.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>252.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Gross profits</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Gross profit margins</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>45.0%</p>
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>40.00% </p>
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 h-full'>

                                        </td>
                                    </div>
                                </section>
                                <section className='h-52 overflow-y-scroll scrollbar-hide relative'>
                                    {emptyRow}
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center sticky top-0 left-0'>
                                        <td className='col-span-4 font-bold pl-2'>ALL EXPENSES</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Rent</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Insurance</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>2004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Fees(bankign, licenses, etc)</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Payroll</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Shipping costs</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Marketing spend</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Other expenses</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Total fixed and variable cost</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4040.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4541.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                </section>
                                <section>
                                    {emptyRow}
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center'>
                                        <td className='col-span-4 font-bold pl-2'>NET PROFIT MARGINS</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Interest</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Taxes</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Net profits / Losses</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4040.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4541.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    {emptyRow}
                                </section>
                                <section>
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center'>
                                        <td className='col-span-4 font-bold pl-2'>CLOSENG CASH BALANCE</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Net profits / Losses</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4040.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4541.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Closing Cash Balance</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>423040.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>224541.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                </section>
                            </>
                            : <>
                                <section
                                //  className='h-52 overflow-y-scroll scrollbar-hide relative'
                                 >
                                    {emptyRow}
                                    <div className='border border-t-0 bg-green-400 grid grid-cols-10 items-center'>
                                        <td className='col-span-4 font-bold pl-2'>ALL EXPENSES</td>
                                        <td className='col-span-6 h-full'></td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Rent</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>45200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Insurance</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>5000.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>452.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>2004.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Fees(bankign, licenses, etc)</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Payroll</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Shipping costs</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Marketing spend</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-white grid grid-cols-10 items-center font-semibold'>
                                        <td className='col-span-4 text-gray-700 py-1 p-1 border border-t-0'>Other expenses</td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 border border-t-0 '>
                                            <p>00.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 bg-green-100 py-1 p-1 text-center border border-t-0 '>
                                            <p>4524.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                    <div className='border bg-gray-300 grid grid-cols-10 items-center font-bold'>
                                        <td className='col-span-4 py-1 border border-t-0 text-right pr-1'>Total fixed and variable cost</td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4200.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4040.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                        <td className='flex justify-end items-center col-span-2 py-1 p-1 border border-t-0 '>
                                            <p>4541.00 </p>
                                            <TbCurrencyTaka className='text-xl' />
                                        </td>
                                    </div>
                                </section>
                            </>}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default CashManagement;