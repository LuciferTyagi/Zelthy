import React from 'react'
import Header from './LandingPage/Header'
import AuthCard from './AuthCard'
const LogIn = () => {
  return (
    <section className='bg-gray-100 dark:bg-black w-full  font-[inter]'>
            <Header/>
            
                  <div className='w-full max-w-[1440px] mx-auto bg--400 flex items-center justify-center py-20 px-4 md:px-0'>
                        <div className='max-w-[600px]'>
                        <AuthCard title="Log in to your Zelthy Slot account" subtitle="Enter your details to continue" buttonText="Log in" redirectText="New here?" redirectLink="Sign up" redirectHref="/sign-up" isLogin={true}/>
                        </div>
                  </div>
            
    </section>
  )
}

export default LogIn
