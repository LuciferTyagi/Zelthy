import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { navLinks, slotPageNavLinks } from '../../Utils/Constant';
import ThemeToggle from '../ThemeToggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import {motion} from "Framer-motion"
const Header = ({ setActiveTab }) => {
const[showMobileMenu , setShowMobileMenu] = useState(false);
const location = useLocation();
const isSignUpPage = location.pathname === "/sign-up";
const buttonText = isSignUpPage ? "Log In" : "My Account";
const buttonPath = isSignUpPage ? "/log-in" : "/sign-up";



  return (
    <header className=' w-full bg-white dark:bg-black border-b-[1px] dark:border-white/10 border-black/10 '>
            
             <nav  className='Desktop hidden w-full mx-auto max-w-[1440px] bg-white dark:bg-black rounded-lg lg:flex justify-between items-center py-4'>
                  <a href='/'><img src='/images/zelthy.png' alt='company-logo' className='w-12'/></a>
                  {!isSignUpPage && ( 
                  <ul className='flex gap-5 text-zinc-800 dark:text-white text-base font-semibold'>
                      {navLinks.map((link) => (
                        <motion.li whileHover={{scale:1.2}} onClick={() => setActiveTab(link.name)} key={link.name}> <a  href={link.path}>{link.name}</a></motion.li>
                      ))}
                  </ul>
                  )}
                  <div className='flex items-center gap-5'>
                    <ThemeToggle/>
                 
                    <button className='bg-[#006BFF] dark:bg-white text-white dark:text-black font-semibold rounded-lg py-2.5 px-4'><a href={buttonPath}>{buttonText}</a></button>

                  </div>
             </nav>

             <nav  className=' Mobile lg:hidden w-full mx-auto max-w-[1440px] bg-white dark:bg-black rounded-lg flex justify-between items-center p-4'>
                  <a href='/'><img src='/images/zelthy.png' alt='company-logo' className='w-12'/></a>
                
                  <div className='flex items-center gap-5'>
                  <button className='bg-[#006BFF] dark:bg-white dark:text-black text-white font-semibold rounded-lg py-2.5 px-4 text-sm'><a href={buttonPath}>{buttonText}</a></button>
                  <button onClick={() => setShowMobileMenu(true)}><FontAwesomeIcon icon={faBars} className="dark:text-white size-5"/></button>
                  </div>
                  {showMobileMenu && (
                           <div className="fixed z-[100] inset-0 w-full h-screen bg-white dark:bg-[#1E1E1E] px-4">
                                 <div className="Tools flex justify-between items-center mt-6">
                                      <span className="text-2xl font-pacifico dark:text-white font-Medium">Yagyansh Tyagi.</span>
                                      <div className="flex gap-4">
                                            <ThemeToggle/>
                                            <button onClick={() => setShowMobileMenu(false)}><FontAwesomeIcon icon={faX} className='dark:text-white size-5'/></button>
                                      </div>
                                 </div>
                                 
                                 <ul className="flex flex-col gap-1 text-[26px] mt-4 ml-3 dark:text-[#B0B0B0]">
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
