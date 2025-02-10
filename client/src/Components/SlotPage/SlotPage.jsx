import React, { useState } from 'react'
import UserProfile from '../UserProfile'
import AllUser from '../AllUser'
import Availablity from '../AvailablityPage/Availablity'
import { slotPageNavLinks } from '../../Utils/Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SlotPageHeader from './SlotPageHeader';
const SlotPage = () => {
const[sideBar , setSideBar] = useState(false);
const[tabSelected , setTabSelected] = useState("Availability")
  return (
    <section className='bg--500 w-full h-[90vh] font-[inter]'>
            <SlotPageHeader/>
            <div className='bg--300 w-full h-full'>
                 <div className='w-full max-w-[1440px] mx-auto bg--300 h-full lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 py-10'>
              
                <aside style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}  class="hidden z-30 rounded-lg  sticky top-0  h-full w-full shrink-0  lg:block lg:self-start bg-red-300  ">
                    <nav className='h-full flex flex-col justify-between bg-white px-4 py-2 rounded-lg'>                  
                        <ul className='flex flex-col gap-5 '>
                          <button onClick={() => setTabSelected("Availability")} className='flex items-center justify-center p-3 text-lg gap-3 font-medium text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-full'><FontAwesomeIcon icon={faPlus} className='bg--200'/>Create</button>
                          {slotPageNavLinks.slice(0,3).map((item) =>(
                            <li onClick={() => setTabSelected(item.name)} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-lg font-semibold ${tabSelected === item.name ? "text-blue-500 bg-blue-100/50" : "text-[#0A2540] hover:bg-blue-50"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                        <ul className='flex flex-col gap-5 '>
                          {slotPageNavLinks.slice(3).map((item) =>(
                            <li onClick={() => setTabSelected(item.name)} className={`cursor-pointer rounded-lg  p-3 flex items-center gap-3 text-lg font-semibold ${tabSelected === item.name ? "text-blue-500 bg-blue-100/50" : "text-[#0A2540] hover:bg-blue-50"}`}><FontAwesomeIcon icon={item.icon} className=''/>{item.name}</li>
                          ))}
                        </ul>
                    </nav>
                </aside>

                <main className='bg-white'>
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
