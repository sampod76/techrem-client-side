import React from 'react';
import { useSelector } from 'react-redux';
import background from "../../../asset/image/background.jpg";
import demoUser from '../../../asset/image/demoUser.jpg';
import jemCoin from '../../../asset/image/coin.jpg';
import { BiCoinStack } from 'react-icons/bi';
import { ImPencil2 } from 'react-icons/im';
import { Link } from 'react-router-dom';


const UseRewordPage = () => {
  const { dbUser } = useSelector((state) => state.dbAuth);
  const { userImage, name, email, state, country, userBio } = dbUser;
  console.log(dbUser)
  return (
    <div
      className='w-full h-full'
      style={{ background: `linear-gradient(90deg, rgba(100, 155, 157, 0.4), rgba(138, 255, 71, 0.1)), url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
    >
      <div className='text-center pt-4'>
        <figure className='w-36  mdd:w-40 xl:w-44 h-36 mdd:h-40 xl:h-44 mx-auto rounded-full border-4 p-[2px] border-white relative'>
          <div
            style={{ background: `linear-gradient(90deg, rgba(231, 205, 218, 0.78), rgba(231, 205, 218, 0.68)), url(${jemCoin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            className=' border border-white w-full h-full rounded-full flex justify-center items-center'
          >
            <h1 className='text-8xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>66</h1>
          </div>
          <Link to={`/dashboard/update-ac/${dbUser.email}`}><button className='border p-[6px] border-blue-500 active:border-white duration-100 text-lg font-medium  text-blue-600 hover:text-white hover:bg-blue-400 active:bg-blue-500 rounded-full absolute bottom-1 -right-1'><ImPencil2 /></button></Link>
          <div className='bg-green-500 rounded-full h-24 w-24 absolute top-5 -right-20 p-1'>
            <img className='z-10 w-full h-full rounded-full drop-shadow-lg' src={userImage || demoUser} alt="" />
          </div>
        </figure>
        <h4 className='text-md smm:text-lg text-orange-400 mt-2 uppercase'>welcome to your profile</h4>
        <h3 className='text-xl smm:text-2xl lg:text-3xl text-blue-500 capitalize'>{name}</h3>
        <h4 className=' text-sm smm:text-lg md:text-sm lg:text-xl'>{email}</h4>
        <hr className='h-[2px] w-10/12 max-w[800px] my-4 mx-auto bg-white ' />
      </div>
      <section className='flex flex-col lg:flex-row justify-center items-center gap-4'>
        <div className='max-w-sm border border-white rounded-lg'>
          <h4 style={{ background: "rgba(228, 212, 220, 0.40)" }} className='text-2xl pl-4 py-1 rounded-t-lg text-orange-400 font-[500]'>Total Reword Coins</h4>
          <hr className='h-[2px] bg-white' />
          <div className='flex justify-between divide-x-2 divide-white py-2 px-4'>
            <div className='pr-1'>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum Lorem ipsum dolor sit amet.</p>
              <p className='text-xl'>your reword coin 540</p>
            </div>
            <BiCoinStack className='text-8xl text-gray-700' />
          </div>
        </div>
        <div className='max-w-sm border border-white rounded-lg'>
          <h4 style={{ background: "rgba(228, 212, 220, 0.40)" }} className='text-2xl pl-4 py-1 rounded-t-lg text-orange-400 font-[500]'>Costing Reward Coins</h4>
          <hr className='h-[2px] bg-white' />
          <div className='flex justify-between divide-x-2 divide-white py-2 px-4'>
            <div className='pr-1'>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum Lorem ipsum dolor sit amet.</p>
              <p className='text-xl'>your reword coin 474</p>
            </div>
            <BiCoinStack className='text-8xl text-gray-700' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseRewordPage;