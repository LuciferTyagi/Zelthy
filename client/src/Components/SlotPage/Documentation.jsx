import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { featureData } from '../../Utils/Constant'
import React from 'react'
import Faq from '../Faq'
import { useSelector } from 'react-redux'

const Documentation = () => {
  return (
    <div className='Documentation-Section w-full h-full '>
          <div className='Introduction flex flex-col gap-2 md:gap-4 bg--300'>
                <h1 className='text-3xl md:text-5xl font-bold text-blue-500 dark:text-white'>Zelthy Slot</h1>
                <p className='text-basse md:text-lg text-zinc-500 dark:text-[#B0B0B0] font-medium'>Zelthy Slot – A seamless and efficient slot booking platform that lets users set their availability and schedule appointments effortlessly across different <span className='text-blue-500'>time zones</span></p>
                <div className='Button-Container flex flex-wrap gap-2 md:gap-4'>
                    <button className='flex items-center justify-center gap-3 bg-[#006BFF] dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg'>Get Started <FontAwesomeIcon icon={faArrowRight} className=''/></button>
                    <button style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className='flex items-center justify-center gap-3 bg-transparent text-zinc-700 dark:text-white dark:border px-4 py-2 rounded-lg'>LinkedIn <FontAwesomeIcon icon={faLinkedin} className=''/></button>
                    <button className='flex items-center justify-center gap-3 bg-[#006BFF] dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg'>Github <FontAwesomeIcon icon={faGithub} className=''/></button>
                </div>
          </div>

          <div className='Why-Zelthy-Slot flex flex-col gap-4 mt-4 md:mt-8'>
               <h1 className='text-2xl md:text-4xl font-bold text-blue-500 dark:text-white'>Why Zelthy Slot?</h1>
               <ul className='flex flex-col gap-2 text-base text-zinc-500 dark:text-[#B0B0B0]'>
                    {featureData.map((feature , index) => (
                        <li key={index}>• {feature}</li>
                    ))}           
                </ul>
          </div>
          <Faq/>
    </div>
  )
}

export default Documentation
