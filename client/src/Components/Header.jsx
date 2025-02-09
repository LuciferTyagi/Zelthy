import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { navLinks, slotPageNavLinks } from '../Utils/Constant';
import { useNavigate } from "react-router-dom";
const Header = ({ setActiveTab }) => {
const navigate = useNavigate();
const[showMobileMenu , setShowMobileMenu] = useState(false);
const location = useLocation();
const isSignUpPage = location.pathname === "/sign-up";
const isSlotPage = location.pathname === "/slot";
const buttonText = isSignUpPage ? "Log In" : "My Account";
const buttonPath = isSignUpPage ? "/log-in" : "/sign-up";
const linksToUse = isSlotPage ? slotPageNavLinks : navLinks;
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/log-in");
};


  return (
    <header className=' w-full bg-red-600 pt-10'>
            
             <nav style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='Desktop hidden w-full mx-auto max-w-[1440px] bg-white rounded-lg lg:flex justify-between items-center p-4'>
                  <a href='/'><img src='/images/zelthy.png' alt='company-logo' className='w-12'/></a>
                  {!isSignUpPage && ( 
                  <ul className='flex gap-5 text-[#0B3558] text-base font-semibold'>
                      {linksToUse.map((link) => (
                        <li onClick={() => setActiveTab(link.name)} key={link.name}> <a href={link.path}>{link.name}</a></li>
                      ))}
                  </ul>
                  )}
                  <div className='flex items-center gap-5'>
                  <button onClick={handleLogout}><img src='/images/dark-mode.png' alt='dark-mode' className='size-5'/></button>
                  {isSlotPage ? (
                    <div className='size-10 rounded-full bg-red-500'></div>
                  ) : (
                    <button className='bg-[#006BFF] text-white font-semibold rounded-lg py-2.5 px-4'><a href={buttonPath}>{buttonText}</a></button>

                  )}
                  </div>
             </nav>

             <nav style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className=' Mobile lg:hidden w-full mx-auto max-w-[1440px] bg-white rounded-lg flex justify-between items-center p-4'>
                  <a href='/'><img src='/images/zelthy.png' alt='company-logo' className='w-12'/></a>
                
                  <div className='flex items-center gap-5'>
                  <button className='bg-[#006BFF] text-white font-semibold rounded-lg py-2.5 px-4 text-sm'><a href={buttonPath}>{buttonText}</a></button>
                  <button onClick={() => setShowMobileMenu(true)}><img src='/images/menu.png' alt='menu' className='size-6'/></button>
                  </div>
                  {showMobileMenu && (
                           <div className="fixed z-[100] inset-0 w-full h-screen bg-white px-4">
                                 <div className="Tools flex justify-between items-center mt-6">
                                      <span className="text-2xl font-pacifico">Yagyansh Tyagi.</span>
                                      <div className="flex gap-4">
                                            <button><img src='/images/dark-mode.png' alt='dark-mode' className='size-5'/></button>
                                            <button onClick={() => setShowMobileMenu(false)}><img src='/images/close.png' alt='close' className='size-5'/></button>
                                      </div>
                                 </div>
                                 
                                 <ul className="flex flex-col gap-1 text-[26px] mt-4 ml-3 font-tajawal">
                                 {navLinks.map((link) => (
                                 <li key={link.name}> <a href={link.path}>{link.name}</a></li>
                                  ))}    
                                 </ul>
                           </div>
                       )}
             </nav>
    </header>
  )
}

export default Header
