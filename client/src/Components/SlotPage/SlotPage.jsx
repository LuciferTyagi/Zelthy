import React, { useState } from 'react'
import UserProfile from '../UserProfile'
import AllUser from '../AllUser'
import Availablity from '../AvailablityPage/Availablity'
import { slotPageNavLinks } from '../../Utils/Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import SlotPageHeader from './SlotPageHeader';
const SlotPage = () => {
const[sideBar , setSideBar] = useState(false);
const[tabSelected , setTabSelected] = useState("Availability")
  return (
    <section className='bg--500 w-full h-[90vh] font-[inter]'>
            <SlotPageHeader/>
            <div className='bg--300 w-full h-full'>
                 <div className='w-full max-w-[1440px] mx-auto bg--300 h-full lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 py-5 lg:py-10'>
                 <button onClick={() =>setSideBar(!sideBar)} className='lg:hidden ml-auto mr-2 flex items-center justify-center gap-2 py-2 px-4 bg-white rounded-xl font-inter outline-none border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13"></path>
                  </svg>
                   Sidebar
                 </button>
                 {sideBar && (
                   <div className=' fixed  inset-0  backdrop-blur-sm lg:hidden'>
                        <aside style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}  class="Mobile  z-30 h-full w-full sm:w-1/2 lg:hidden">
                    <nav className='relative h-full flex flex-col justify-between bg-white px-4 py-2 rounded-lg'>                  
                        <ul className='flex flex-col gap-5 '>
                          <div className='flex justify-between gap-6 '>
                          <button onClick={() => setTabSelected("Availability")} className='w-full flex items-center justify-center p-3 text-sm gap-3 font-medium text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-full '><FontAwesomeIcon icon={faPlus} className='bg--200'/>Create</button>
                          <button onClick={() => setSideBar(false)}><FontAwesomeIcon icon={faX} className='w-fit'/></button>
                          </div>
                          {slotPageNavLinks.slice(0).map((item) =>(
                            <li onClick={() => {
                              setTabSelected(item.name) 
                              setSideBar(false)}} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-sm font-semibold ${tabSelected === item.name ? "text-blue-500 bg-blue-100/50" : "text-[#0A2540] hover:bg-blue-50"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                      
                    </nav>
                       </aside>
                    </div>
                 )}                
                <aside style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}  class="Desktop hidden z-30 rounded-lg  sticky top-0  h-full w-full   lg:block  bg-red-300  ">
                    <nav className='h-full flex flex-col justify-between bg-white px-4 py-2 rounded-lg'>                  
                        <ul className='flex flex-col gap-5 '>
                          <button onClick={() => setTabSelected("Availability")} className='flex items-center justify-center p-3 text-base gap-3 font-medium text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-full'><FontAwesomeIcon icon={faPlus} className='bg--200'/>Create</button>
                          {slotPageNavLinks.slice(0).map((item) =>(
                            <li onClick={() => setTabSelected(item.name)} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-base font-semibold ${tabSelected === item.name ? "text-blue-500 bg-blue-100/50" : "text-[#0A2540] hover:bg-blue-50"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                      
                    </nav>
                </aside>

                <main className='bg-red-300 px-2 lg:px-0'>
                {tabSelected === "Profile" ? (
                    <UserProfile />
                ) : tabSelected === "All Users" ? (
                    <AllUser/>
                ) : (
                    <Availablity/>
                )}
                </main>
                 </div>

            </div>
    </section>
  )
}

export default SlotPage
