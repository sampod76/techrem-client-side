import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dbLogoutSet } from '../../app/features/auth/dbUserSlice';
import { authLogoutSet } from '../../app/features/auth/authSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdLocate } from 'react-icons/io';
import { toggleSideBar } from '../../app/features/others/othersSlice';

const Navbar = () => {
    const { dbUser, isLoading, isError, error } = useSelector((state) => state.dbAuth);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const demoImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINunkuVsAGQboPsDChBxyekjHUlWm1CuH36DJkK1_SRgCDfotuvW8gKsV6PnOQHERk0E&usqp=CAU";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(authLogoutSet())
            dispatch(dbLogoutSet());
            localStorage.removeItem("tech_token");
            localStorage.removeItem("activeUser")
            navigate("/");
        })
    };
    // console.log(dbUser)
    const navItems = <>
        <Link to="/"><li className='hover:bg-blue-300 font-semibold px-3 py-2 hover:cursor-pointer'>Home</li></Link>
        {localStorage.getItem("activeUser") || (dbUser.email && dbUser.role) ?
            <>
                <Link to='/dashboard'><li className='hover:bg-blue-300 font-semibold px-3 py-2 hover:cursor-pointer'>Dashboard</li></Link>
                <div className='relative'>
                    <div onClick={() => setShowProfile(!showProfile)} title={dbUser.name}>
                        <h5 className='hover:bg-blue-300 font-semibold px-3 py-2 hover:cursor-pointer text-green-500 md:hidden'>Accounts</h5>
                        <figure className='hidden md:block border rounded-full p-[1px]'>
                            <img src={dbUser.userImage || demoImage} className="h-10 w-10 rounded-full" alt="" />
                        </figure>
                    </div>
                    {showProfile &&
                        <nav onMouseLeave={() => setShowProfile(false)} style={{ background: "rgba(237, 221, 229, 0.90)" }} className={`p-3 absolute top-11 left-0 shadow-lg`}>
                            <Link to={`/dashboard/update-ac/${dbUser.email}`}><button className='py-1 w-full whitespace-pre text-green-700 hover:text-white hover:bg-green-600 duration-300 rounded-sm px-2 font-semibold outline outline-1 outline-white drop-shadow-xl mb-2'>Profile<BsThreeDotsVertical className="inline text-white" /></button></Link>
                            <button className='py-1 w-full whitespace-pre text-green-700 hover:text-white hover:bg-green-600 duration-300 rounded-sm px-2 font-semibold outline outline-1 outline-white drop-shadow-xl' onClick={handleLogout}>Logout</button>
                        </nav>
                    }
                </div>
            </> : <>
                <Link to="/login"><li className='hover:bg-blue-300 font-semibold px-3 py-2 hover:cursor-pointer'>Login</li></Link>
                <Link to="/register"><li className='hover:bg-blue-300 font-semibold px-3 py-2 hover:cursor-pointer'>Register</li></Link>
            </>
        }

    </>;
    return (
        <div className='w-full z-40 bg-blue-500 print:hidden pt-2 sticky -top-2 left-0'>
            <div className='max-w-[1940px] mx-auto px-4'>
                <div className='flex justify-between items-center relative'>
                    <div className='flex justify-start items-center gap-2'>
                       {pathname === "/" && <IoMdLocate onClick={()=>dispatch(toggleSideBar())} className='text-white ml-3 block lg:hidden' size={28}></IoMdLocate>}
                        <Link to={'/'}> <h4 className=' text-lg smm:text-2xl font-semibold text-orange-100'>House of Taste</h4></Link>
                    </div>
                    <div className='flex justify-end'>
                        <ul className='hidden md:flex justify-around gap-2'>
                            {navItems}
                        </ul>
                        <button onClick={() => setShowMenu(!showMenu)} className='md:hidden'>
                            <HiMenuAlt2 size={24} />
                        </button>
                        <ul
                            hidden={!showMenu}
                            onMouseLeave={() => setShowMenu(false)}
                            className={`bg-whiteRgb md:hidden border p-1 rounded-md drop-shadow-xl absolute top-12 left-0 !z-50 `}
                        >
                            {navItems}
                        </ul>
                        <Link to="/add-to-cart">
                            <li className='px-3 list-none py-2 hover:cursor-pointer'>
                                <FaCartPlus className='hover:text-orange-300 text-white text-3xl' />
                            </li>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;