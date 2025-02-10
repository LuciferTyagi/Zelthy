import React, { useState } from 'react'
import Header from './LandingPage/Header'
import { featureData } from '../Utils/Constant'
import AuthCard from './AuthCard'
const SignUp = () => {

  return (
    <section className='bg--300 w-full  font-[inter]'>
          <Header/>
          <div className='bg-[#F8F9FB] '>
          <div className='w-full max-w-[1440px] bg--300 mx-auto h-full flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-32 py-20 px-4 md:px-0'>
              
                <AuthCard title="Sign up for your Zelthy Slot account"subtitle="Always free! No credit card required."buttonText="Sign up"redirectText="Welcome back!"redirectLink="Log in"redirectHref="/log-in" isLogin={false}/>

                <div className='flex flex-col gap-3 md:gap-5'>
                      <h1 className='text-3xl md:text-4xl text-[#0B3558] font-bold'>Create your free account</h1>
                      <p className= 'text-sn md:text-lg text-[#476788]'>Seamlessly manage your availability and book slots with ease! Configure your schedule, view available times, and stay in sync—all in one intuitive platform.</p>
                      <h3 className='text-xl md:text-3xl text-[#0B3558] font-semibold'>Why Zelthy Slot?</h3>
                        {featureData.map((feature) =>(
                      <div className='flex gap-3 items-center'>
                           <img src='/images/check.png' alt='check' className='size-3 md:size-5'/>
                            <p className='text-[#476788] text-sm md:text-base'>{feature}</p>
                      </div>
                        ))}
                </div>
          </div>
          </div>
    </section>
  )
}

export default SignUp
