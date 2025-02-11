import React, { useState , useEffect } from 'react'
import Dashboard from '../Dashboard'
import AllUser from '../AllUser'
import Availablity from '../AvailablityPage/Availablity'
import SlotPageHeader from './SlotPageHeader';
import EditProfile from '../EditProfile';
import Documentation from '../Documentation';
import SlotPageSidebar from './SlotPageSidebar';
import { useDispatch } from "react-redux";
import { fetchAvailability, fetchUserProfile } from "../../Redux/Slices/UserSlice";
const SlotPage = () => {
const[tabSelected , setTabSelected] = useState("Documentation")
const dispatch = useDispatch();
 useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchAvailability())
    }, [dispatch]);
const components = {
  "Dashboard": <Dashboard />,
  "All Users": <AllUser />,
  "Edit Profile": <EditProfile />,
  "Availability": <Availablity/>,
  "Documentation": <Documentation/>
}
  return (
    <section className='bg--500 w-full h-[90vh] font-[inter]'>
            <SlotPageHeader/>
            <div className='bg--300 w-full h-full'>
                 <div className='w-full max-w-[1440px] mx-auto bg--300 h-full lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 py-5 lg:py-10'>
                <SlotPageSidebar tabSelected={tabSelected} setTabSelected ={setTabSelected}/>

                <main className='bg-red-300 px-2 lg:px-0'>
                {components[tabSelected] || null}
                </main>
                 </div>

            </div>
    </section>
  )
}

export default SlotPage
