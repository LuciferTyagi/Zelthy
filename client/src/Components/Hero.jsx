import React from 'react'
import { buildUsingData } from '../Utils/Constant'

const Hero = () => {
  return (
    <section className='bg-orange-200 w-full py-20'>
             <div className='Hero-Container Parent w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-green-400 px-4'>
                   <div className='Hero-Information First-Child flex flex-col gap-5 bg-pink-400'>
                        <h1 className='text-4xl md:text-5xl text-[#0B3558] font-bold'>Book Your Slot with Ease!</h1>
                        <p className=' text-base md:text-xl text-[#476788] font-medium'>Hassle-free scheduling for your appointments. Select your slot and confirm in just a few clicks.</p>
                        <div className='Hero-Buttons flex flex-col sm:flex-row gap-4'>
                            <button className='bg-[#006BFF] text-white rounded-lg p-3 text-base font-medium'><a href=''> Book a Slot</a></button>
                            <button style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='bg-white text-[#0B3558] rounded-lg p-3 text-base font-medium'><a href=''> Get in Touch</a></button>
                        </div>

                        <div className='Build-Using flex flex-wrap  gap-4 bg--300 text-sm  opacity-60 mt-5'>
                           {buildUsingData.map((tech, index) => (
                           <div key={index} className="flex gap-1 md:gap-2 items-center">
                           <img src={tech.image} alt={tech.name} className={tech.size} />
                            <span className="font-semibold text--700">{tech.name}</span>
                            </div>
                            ))}
                     </div>
                   </div>
                   <div className='Hero-Image Second-child '>
                        <img src='/images/hero-img.jpg' alt='hero-image' className='rounded-2xl sm:scale-75 md:scale-90'/>
                   </div>
             </div>
    </section>
  )
}

export default Hero
