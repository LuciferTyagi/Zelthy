import React from 'react'
import Header from './LandingPage/Header'
import AuthCard from './AuthCard'
const LogIn = () => {
  return (
    <section className='bg-transparent w-full h-screen font-[inter] flex flex-col'>
            <Header/>
            <div className="absolute  z-[-1] h-full w-full bg-white dark:bg-black  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]  bg-[size:14px_24px]"></div>

                  <div className='w-full max-w-[1440px] mx-auto  h-full  px-4 md:px-0 flex items-center justify-center'>
                        <div className='max-w-[600px]'>
                        <AuthCard title="Log in to your Zelthy Slot account" subtitle="Enter your details to continue" buttonText="Log in" redirectText="New here?" redirectLink="Sign up" redirectHref="/sign-up" isLogin={true}/>
                        </div>
                  </div>
            
    </section>
  )
}

export default LogIn
