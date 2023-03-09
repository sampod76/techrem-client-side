import React from 'react';
import logo from '../../asset/image/logo-removebg-preview.png'
import Doc from './DocService';
import PdfContainer from './PdfContainer';

const InvoiceReceipt = () => {
    const createPdf = (html) => Doc.createPdf(html);
    return (
        <PdfContainer createPdf={createPdf}>
            <div className='relative bg-slate-50 border border-green-400 w-[700px] min-h-[900px] mx-auto pb-8 my-6'>
                <div className='ml-6 flex mt-[-10px] justify-between items-center'>
                    <img className='w-52' src={logo} alt="" />
                    <div>
                        <h4 className='text-4xl font-thin font-serif mr-12 mt-10 text-blue-500'>Food for Life</h4>
                        <p className=' ml-[2px] mt-[-2px] text-gray-600'>Gazipur, Dhaka, Bangladesh</p>
                    </div>
                </div>
                <div className='grid grid-cols-5'>
                    <div className='bg-yellow-300 w-full col-span-2'></div>
                    <h1 className='text-3xl font-bold col-span-2 text-center font-mono'>Payment Receipt</h1>
                    <div className='bg-yellow-300 w-full col-span-1'></div>
                </div>
                <main>
                    <div className='mt-10 ml-16 w-[450px] grid grid-cols-1 gap-3'>
                        <h3 className='text-2xl font-semibold mb-2 underline underline-offset-4'>Invoice To</h3>
                        <div className='grid grid-cols-3'>
                            <h5 className='text-gray-800 font-semibold text-lg col-span-1'>Name</h5>
                            <h5 className='text-gray-600 text-lg col-span-2'><span className='text-gray-800 font-semibold text-lg col-span-2 ml-[-4px]'>:</span> Rabbill Hasan Rupom</h5>
                        </div>
                        <div className='grid grid-cols-3'>
                            <h5 className='text-gray-800 font-semibold text-lg col-span-1'>Address</h5>
                            <h5 className='text-gray-600 text-lg col-span-2'><span className='text-gray-800 font-semibold text-lg col-span-2 ml-[-4px]'>:</span> Sonapur, Noakhali, Bangladesh</h5>
                        </div>
                        <div className='grid grid-cols-3'>
                            <h5 className='text-gray-800 font-semibold text-lg col-span-1'>Date</h5>
                            <h5 className='text-gray-600 col-span-2'><span className='text-gray-800 font-semibold text-lg col-span-2 ml-[-4px]'>:</span> 20/02/2023 03:00 pm</h5>
                        </div>
                        <div className='grid grid-cols-3'>
                            <h5 className='text-gray-800 font-semibold text-lg col-span-1'>Transaction ID</h5>
                            <h5 className='text-gray-500 text-sm font-bold col-span-2'><span className='text-gray-800 font-semibold text-lg col-span-2 ml-[-4px]'>:</span> QL225045465645k44</h5>
                        </div>
                        <div className='grid grid-cols-3'>
                            <h5 className='text-gray-800 font-semibold text-lg col-span-1 mt-[6px]'>Payment method</h5>
                            <h5 className='text-gray-600 text-lg col-span-2'><span className='text-gray-800 font-semibold text-lg col-span-2 ml-[-4px]'>:</span> <button className='px-3 py-[2px] mt-1 rounded-md font-bold bg-orange-300 text-blue-100'>Card</button></h5>
                        </div>
                    </div>
                    <div className='mt-10 mx-16 grid grid-cols-1 gap-2 text-center'>
                        <h4 className='text-2xl text-start font-semibold mb-6 underline underline-offset-4'>Payment Details</h4>
                        <div className='grid grid-cols-4 gap-4'>
                            <h6 className='font-bold text-blue-500'>Products</h6>
                            <h6 className='font-semibold rounded-lg px-3 bg-gray-300'>Quantity</h6>
                            <h6 className='font-semibold rounded-lg px-3 bg-gray-300'>Unit Price</h6>
                            <h6 className='font-semibold rounded-lg px-3 bg-gray-300'>Amount</h6>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <p className='font-semibold text-gray-700 bg-slate-300 rounded-lg px-3'>Burger</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>3</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>20 Taka</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>60 Taka</p>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <p className='font-semibold text-gray-700 bg-slate-300 rounded-lg px-3'>Singara</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>3</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>20 Taka</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>60 Taka</p>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <p className='font-semibold text-gray-700 bg-slate-300 rounded-lg px-3'>Giril</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>3</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>150 Taka</p>
                            <p className='px-3 bg-green-200 text-gray-700 rounded-lg'>450 Taka</p>
                        </div>
                        <div className='flex justify-end'>
                            <hr className='h-1 bg-green-500 w-1/2 mt-2' />
                        </div>
                        <div className='grid grid-cols-4'>
                            <p></p>
                            <p></p>
                            <h5 className='px-3 bg-blue-400 font-semibold text-lg'>Total</h5>
                            <h5 className='px-3 bg-blue-400 font-semibold text-lg'>1020 Taka</h5>
                        </div>
                    </div>
                </main>
                <div className='absolute bottom-6 right-16 print:hidden'>
                    <button
                        // onClick={handleDownloadPdf}
                        className='active:bg-gray-200 py-[1px] px-2 ml-2 border rounded-md underline text-blue-400 hover:text-blue-600'
                    >Download pdf</button>
                    <button
                        onClick={() => window.print()}
                        className='bg-green-400 active:bg-green-500 py-[3px] px-2 ml-2 border rounded-md text-sm font-semibold text-blue-700 hover:text-blue-800'
                    >Print</button>
                </div>
                <div className='absolute left-14 bottom-6'>
                    <h4 className='text-lg font-thin font-serif mr-12 mt-10 text-blue-500'>Food for Life<span className='text-[10px] mt-2 text-green-600'> E-shop</span></h4>
                    <p className=' ml-[1px] text-xs mt-[-3px] text-gray-600'>Gazipur, Dhaka, Bangladesh</p>
                </div>
            </div>
        </PdfContainer>
    );
};

export default InvoiceReceipt;