import React from 'react'
import { buildUsingData } from '../../Utils/Constant'
import { motion } from "motion/react"
const Hero = () => {
  const headingVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
  
  const paragraphVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const buttonVariants = {
    hidden: {  opacity: 0 },
    visible: {  opacity: 1 }
  };
  return (
    <section className='relative bg-white dark:bg-black w-full py-20'>
            <div class="absolute inset-0 -z-1 h-full w-full bg-whitee dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

             <div className='Hero-Container Parent w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg--400 px-4 '>
                   <div className='Hero-Information First-Child flex flex-col gap-5 bg--400 z-10 sm:max-w-[600px] lg:max-w-full mx-auto'>
                        <motion.h1 variants={headingVariants} initial="hidden" animate="visible" transition={{duration:0.7}} className='text-4xl md:text-5xl text-zinc-700 dark:text-white font-bold'>Book Your Slot with Ease!</motion.h1>
                        <motion.p variants={paragraphVariants} initial="hidden" animate="visible" transition={{duration:0.7}} className=' text-base md:text-xl text-zinc-500 dark:text-zinc-300 font-medium'>Hassle-free scheduling for your appointments. Select your slot and confirm in just a few clicks.</motion.p>
                        <div className='Hero-Buttons flex flex-col sm:flex-row gap-4'>
                            <button className='bg-[#006BFF] dark:bg-white dark:text-black  text-white rounded-lg p-3 text-base font-medium'><a href=''> Book a Slot</a></button>
                            <button style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='bg-white dark:bg-black dark:border dark:text-white text-[#0B3558] rounded-lg p-3 text-base font-medium'><a href=''> Get in Touch</a></button>
                        </div>

                        <div className='Build-Using flex flex-wrap  gap-4 bg--300 text-sm   mt-5'>
                           {buildUsingData.map((tech, index) => (
                           <div key={index} className="flex gap-1 md:gap-2 items-center">
                           <motion.img whileHover={{scale:1.4, rotate:360}} transition={{ type: "spring", stiffness: 150 }} src={tech.image} alt={tech.name} className={tech.size} />
                            <span className="font-semibold text-zinc-700 opacity-60">{tech.name}</span>
                            </div>
                            ))}
                     </div>
                   </div>
                   <div className='Hero-Image Second-child z-10 sm:max-w-[600px] lg:max-w-full mx-auto '>
                        <motion.img initial={{opacity:0}} animate={{opacity:1}}  transition={{duration:2}} src='/images/hero-img.jpg' alt='hero-image' className='rounded-2xl xl:scale-95'/>
                   </div>
             </div>
    </section>
  )
}

export default Hero
