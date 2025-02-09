import React, { useState } from 'react'
import Header from './Header'
import UserProfile from './UserProfile'
import Availablity from './AvailablityPage.jsx/Availablity';
import AllUser from './AllUser';
const SlotPage = () => {
const [activeTab, setActiveTab] = useState("availability");    
  return (
    <section className='bg--500 w-full h-screen'>
            <Header setActiveTab={setActiveTab}/>
            <div className='bg--300 w-full h-full'>
                 <div className='w-full max-w-[1440px] mx-auto bg--300 h-full '>
                 {activeTab === "Profile" && <UserProfile />}
                 {activeTab === "availability" && <Availablity />}
                 {activeTab === "all-users" && <AllUser />}
                 </div>

            </div>
    </section>
  )
}

export default SlotPage
