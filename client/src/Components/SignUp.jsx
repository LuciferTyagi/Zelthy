import React from 'react'
import Header from './Header'
import { featureData } from '../Utils/Constant'

const SignUp = () => {
  return (
    <section className='bg--300 w-full  font-[inter]'>
          <Header/>
          <div className='bg-[#F8F9FB] py-20'>
          <div className='w-full max-w-[1440px] bg--300 mx-auto h-full grid grid-cols-2 gap-32'>
                <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} className='bg-white rounded-lg p-8 flex flex-col gap-5 text-center'>
                      <h1 className='text-5xl text-[#0B3558] font-bold leading-snug'>Sign up for your <br></br>Zelthy Slot account</h1>
                      <p className='text-[#476788] text-lg font-medium'>Always free! No credit card required.</p>
                      <form className='flex flex-col gap-5'>
                            <input style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} type='text'  placeholder='Enter your good name'  className='outline-none  rounded-md p-3  placeholder:text-zinc-300'/>
                            <input style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} type='email' placeholder='Enter your email' className='outline-none  rounded-md p-3  placeholder:text-zinc-300'/>
                            <button className='bg-[#006BFF] text-white p-3 rounded-md'>Sign up</button>
                      </form>
                      <div className='flex items-center gap-3'>
                            <div className='h-[1px] w-full bg-black/20'/>
                            <p className='text-[#476788]'>OR</p>
                            <div className='h-[1px] w-full bg-black/20'/>

                      </div>
                      <p className='text-[#476788]'>Welcome back! Just <a href='/log-in' className='text-[#006BFF] font-medium'>log in</a> and pick up where you left off.</p>
                </div>

                <div className='bg--600 rounded-lg flex flex-col gap-5'>
                      <h1 className='text-4xl text-[#0B3558] font-bold'>Create your free account</h1>
                      <p className='text-lg text-[#476788]'>Seamlessly manage your availability and book slots with ease! Configure your schedule, view available times, and stay in sync—all in one intuitive platform.</p>
                      <h3 className='text-3xl text-[#0B3558] font-semibold'>Why Zelthy Slot?</h3>
                        {featureData.map((feature) =>(
                      <div className='flex gap-3 items-center'>
                           <img src='/images/check.png' alt='check' className='size-5'/>
                            <p className='text-[#476788] '>{feature}</p>
                      </div>
                        ))}
                </div>
          </div>
          </div>
    </section>
  )
}

export default SignUp
