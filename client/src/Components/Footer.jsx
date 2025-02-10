import React from 'react'
import { footerLinks } from '../Utils/Constant';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
const Footer = () => {
  return (
    <footer className='w-full px-8 py-20 font-inter bg--300 border-t border-neutral-100/10 bg-white dark:bg-black'>
            <div className='Footer-Parent max-w-[1400px] mx-auto flex flex-col gap-10 sm:flex-row md:justify-between md:gap-0'>
                  <div className='First-Child flex flex-col items-start gap-2 bg--300'>
                        <a href='/' className='Company-Name&Logo flex items-center justify-center gap-2'>
                            <img src='/images/zelthy.png' alt='logo' width={60} className='xl:w-16'/>
                            <h1 className='font-bold text-2xl xl:text-3xl text-zinc-700 dark:text-white'>Zelthy Slot</h1>
                        </a>
                        <h2 className='text-sm xl:text-base text-zinc-400 my-2'>Build by <span><a href='https://www.linkedin.com/in/lucifertyagi/' className='text-zinc-700 font-medium'>@YagyanshTyagi</a></span></h2>
                        <button className='whitespace-nowrap text-sm xl:text-base flex items-center gap-2 bg-[#006BFF] dark:bg-white dark:text-black font-medium text-white py-2 px-4 rounded-md'>Share Your Thoughts On <FontAwesomeIcon icon={faLinkedin} className='size-5'/></button>
                  </div>

                  <nav className='Second-Child grid grid-cols-3 gap-10 items-start text-zinc-500 dark:text-white text-sm xl:text-base'>
                      {footerLinks.map((section) => (
                            <ul className='flex justify-center space-y-4 flex-col mt-4 sm:mt-0' key={section.title}>
                             {section.links.map((link) => (
                               <li key={link.name}>
                                <a href={link.href} className=''>{link.name}</a>
                               </li>
                              ))}
                             </ul>
                       ))}
                   </nav>
            </div>
    </footer>
  )
}

export default Footer