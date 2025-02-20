import React, { useState , useEffect } from 'react'
import Dashboard from './Dashboard'
import AllUser from './AllUser'
import Availablity from '../AvailablityPage/Availablity'
import Footer from "../Footer"
import SlotPageHeader from './SlotPageHeader';
import EditProfile from './EditProfile';
import Documentation from './Documentation';
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
  "Dashboard": <Dashboard setTabSelected={setTabSelected}/>,
  "All Users": <AllUser />,
  "Edit Profile": <EditProfile />,
  "Availability": <Availablity setTabSelected={setTabSelected}/>,
  "Documentation": <Documentation/>
}
  return (
    <section className='dark:bg-black w-full min-h-screen  font-[inter]'>
            <SlotPageHeader/>
            
                 <div className='w-full max-w-[1440px] mx-auto bg--300 h-full lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 py-5 lg:py-10'>
                <SlotPageSidebar tabSelected={tabSelected} setTabSelected ={setTabSelected}/>

                <main className='bg--300 px-2 lg:px-0'>
                {components[tabSelected] || null}
                </main>
                 </div>

            
            <Footer/>
    </section>
  )
}

export default SlotPage
