import React, { useState } from 'react'
import Header from '../Header'
import UserProfile from '../UserProfile'
import AllUser from '../AllUser'
import Availablity from '../AvailablityPage/Availablity'
import { slotPageNavLinks } from '../../Utils/Constant';
const SlotPage = () => {
const[sideBar , setSideBar] = useState(false);
const[tabSelected , setTabSelected] = useState("Availability")
  return (
    <section className='bg--500 w-full h-screen font-[inter]'>
            <Header />
            <div className='bg--300 w-full h-full'>
                 <div className='w-full max-w-[1440px] mx-auto bg-green-300 h-full lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
              
                <aside class="hidden z-30  sticky top-0  h-screen w-full shrink-0  lg:block lg:self-start bg-red-300  ">
                    <nav className='h-full bg-yellow-300 '>                  
                        <ul className='flex flex-col gap-5'>
                          {slotPageNavLinks.map((item) =>(
                            <li onClick={() => setTabSelected(item.name)} className='cursor-pointer text-lg text-[#0A2540] font-semibold'>{item.name}</li>
                          ))}
                        </ul>
                      
                    </nav>
                </aside>

                <main className='bg-red-800'>
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
