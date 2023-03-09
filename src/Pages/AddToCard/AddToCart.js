import React, { useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';

const AddToCart = () => {
    const [allSelect, setAllSelect] = useState(false);
    const addedProducts = [
        {
            img: "https://i.ytimg.com/vi/aGddwUZ3ctA/maxresdefault.jpg",
            name: "Fast food - Singara",
            info: "Today's cooked fast food delivery and ",
            id: 1,
            price: 20,
            quantity: 3
        },
        {
            img: "https://qph.cf2.quoracdn.net/main-qimg-4fea231fddd2824f39527fe3cefd603b-lq",
            name: "Fast food - Singara",
            info: "Today's cooked fast food delivery and ",
            id: 1,
            price: 20,
            quantity: 5
        },
        {
            img: "https://i.ytimg.com/vi/aGddwUZ3ctA/maxresdefault.jpg",
            name: "Fast food - Singara",
            info: "Today's cooked fast food delivery and ",
            id: 1,
            price: 20,
            quantity: 1
        },
        {
            img: "https://qph.cf2.quoracdn.net/main-qimg-4fea231fddd2824f39527fe3cefd603b-lq",
            name: "Fast food - Singara",
            info: "Today's cooked fast food delivery and ",
            id: 1,
            price: 20,
            quantity: 3
        },
    ]
    // const handleQuantity = increase => {

    // }
    return (
        <div className='grid grid-cols-5'>
            <section className='col-span-3 mt-3'>
                <div className='flex justify-between items-center bg-green-100 border rounded-sm p-2'>
                    <article className='flex justify-start items-center gap-2'>
                        <input onClick={()=>setAllSelect(!allSelect)} type="checkbox" name="" id="" className='block' />
                        <p>SELECT ALL ({addedProducts.length} ITEM(S))</p>
                    </article>
                    <FaTrash className='block mr-2 text-red-400 hover:text-red-500' />
                </div>
                <div>
                    {
                        addedProducts.map(product => <div className='flex justify-between items-center border p-4'>
                            <div className='flex justify-between items-center gap-3'>
                                <div className='flex justify-around items-center gap-2'>
                                    <input checked={allSelect} type="checkbox" name="" id="" />
                                    <img className='w-28' src={product.img} alt="" />
                                </div>
                                <div>
                                    <p className='font-semibold'>{product.name}</p>
                                    <p>{product.info}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-1'>
                                <p className='text-lg ml-2'>{product.price}<span className='text-lg font-serif'>৳</span></p>
                                <p>Per pz price</p>
                                <div className='mt-2'>
                                    <button className='mx-1'>
                                        <FaHeart className='text-gray-500'></FaHeart>
                                    </button>
                                    <button className='mx-1'>
                                        <FaTrash className='text-gray-500'></FaTrash>
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between items-center font-semibold'>
                                <button className='px-3 bg-red-200 text-lg border active:bg-green-300'>-</button>
                                <h5 className='bg-red-400 text-lg px-3'>5</h5>
                                <button className='px-3 bg-red-200 text-lg border active:bg-green-300'>+</button>
                            </div>
                        </div>)
                    }
                </div>
            </section>
            <section className='col-span-2 mt-3'>
                <h3>Order Summery</h3>

            </section>
        </div>
    );
};

export default AddToCart;