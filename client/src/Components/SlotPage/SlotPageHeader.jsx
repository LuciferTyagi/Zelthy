import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { accountSettingsLinks, BASE_URL } from '../../Utils/Constant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ThemeToggle from '../ThemeToggle';

const SlotPageHeader = () => {

const [showAccountMenu , setshowAccountMenu] = useState(false);
const {username , profilePicture} = useSelector((state) => state.user);
const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/log-in";
  };
  return (
    <header style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='bg-white dark:bg-black w-full font-[inter] border-b border-white/20'>
            <nav className='relative  w-full mx-auto max-w-[1440px]  flex justify-between items-center py-4 px-2'>
            <a href='/slot' className='flex items-center gap-3 text-lg font-semibold text-zinc-500 dark:text-white'><img src='/images/zelthy.png' alt='company-logo' className='w-12'/>Zelthy Slot</a>
            <div className='flex gap-4'>
            <ThemeToggle/>
            <div onClick={() => setshowAccountMenu(!showAccountMenu)} className='size-10 rounded-full bg-white border border-black/20 cursor-pointer overflow-hidden'>
              <img src={profilePicture} alt='Me' className='w-full h-full object-cover'/>
            </div>
            {showAccountMenu && (
                <div style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='Account-Menu absolute p-4 w-[200px] bg-white top-20 right-0 flex flex-col rounded-lg z-[1]'>
                      <h1 className='text-base font-semibold'>{username}</h1>
                      <p className='text-sm text-zinc-300'><a href='/upgrade' className='text-blue-500 font-medium'>Upgrade</a> any time</p>
                      <div className='h-[1px] w-full bg-black/20 my-4 '/>
                      <ul className='flex flex-col gap-3'>
                          <h2 className='text-sm text-zinc-300 font-medium'>ACCOUNT SETTINGS</h2>
                          {accountSettingsLinks.map((item) => (
                          <li key={item.name} className="p-2 cursor-pointer hover:bg-blue-50">
                         <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={item.icon} className="size-4" />
                            <p className='text-sm font-medium'>{item.name}</p>
                         </div>
                         </li>
                          ))}
                          <button onClick={handleLogout}className='flex items-center text-sm font-medium gap-3 ml-2 hover:bg-blue-50'><FontAwesomeIcon icon={faArrowRightFromBracket} className='size-4'/> Logout </button>
                      </ul>
                </div>
            )}
            </div>
            </nav>
    </header>
  )
}

export default SlotPageHeader
