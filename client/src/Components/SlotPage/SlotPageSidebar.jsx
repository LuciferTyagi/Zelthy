import React, { useState } from 'react'
import { slotPageNavLinks } from '../../Utils/Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'

const SlotPageSidebar = ({tabSelected , setTabSelected}) => {
const[sideBar , setSideBar] = useState(false);
  return (
    <div>
       <button onClick={() =>setSideBar(!sideBar)} className='lg:hidden ml-auto mr-2 flex items-center justify-center gap-2 py-2 px-4 bg-white rounded-xl font-inter outline-none border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13"></path>
                  </svg>
                   Sidebar
                 </button>
                 {sideBar && (
                   <div className=' fixed z-30  inset-0  backdrop-blur-sm lg:hidden'>
                        <aside style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}  class="Mobile  z-30 h-full w-full sm:w-1/2 lg:hidden">
                    <nav className='relative h-full flex flex-col justify-between bg-white dark:bg-[#1E1E1E] px-4 py-2 rounded-lg'>                  
                        <ul className='flex flex-col gap-5 '>
                          <div className='flex justify-between gap-6 '>
                          <button onClick={() => setTabSelected("Availability")} className='w-full flex items-center justify-center p-3 text-sm gap-3 font-medium text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-full dark:text-white dark:border-white dark:hover:bg-[#2A2A2A]'><FontAwesomeIcon icon={faPlus} className='bg--200'/>Create</button>
                          <button onClick={() => setSideBar(false)}><FontAwesomeIcon icon={faX} className='w-fit dark:text-white'/></button>
                          </div>
                          {slotPageNavLinks.slice(0).map((item) =>(
                            <li key={item.name} onClick={() => {
                              setTabSelected(item.name) 
                              setSideBar(false)}} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-sm font-semibold ${tabSelected === item.name ? "text-blue-500 bg-blue-100/50 dark:text-white" : "text-[#0A2540] hover:bg-blue-50 dark:text-[#B0B0B0] dark:hover:bg-[#2A2A2A]"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                      
                    </nav>
                       </aside>
                    </div>
                 )}                
                <aside style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}  class="Desktop hidden z-30 rounded-lg  sticky top-0  h-full w-full lg:block">
                    <nav className='h-full flex flex-col justify-between bg-white dark:bg-[#1E1E1E] px-4  py-6 rounded-lg'>                  
                        <ul className='flex flex-col gap-5 '>
                          <button onClick={() => setTabSelected("Availability")} className='flex items-center justify-center p-3 text-base gap-3 font-medium text-blue-500 border dark:text-white dark:border-white dark:hover:bg-[#2A2A2A] border-blue-500 hover:bg-blue-50 rounded-full'><FontAwesomeIcon icon={faPlus} className='bg--200'/>Create</button>
                          {slotPageNavLinks.slice(0).map((item) =>(
                            <li key={item.name} onClick={() => setTabSelected(item.name)} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-base font-semibold ${tabSelected === item.name ? "text-blue-500 dark:text-white bg-blue-100/50" : "text-[#0A2540] dark:text-[#B0B0B0] dark:hover:bg-[#2A2A2A] hover:bg-blue-50"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                      
                    </nav>
                </aside>
    </div>
  )
}

export default SlotPageSidebar
