import React, { useState } from 'react'
import { faqData } from '../Utils/Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import {motion , AnimatePresence} from 'framer-motion'
const Faq = () => {
const[activeQuestion , setActiveQuestion] = useState(null);
  return (
    <div className='w-full  flex items-center justify-center  py-10'>
         <div className='w-full mx-auto max-w-[1400px] dark:bg-[#1E1E1E] p-8 rounded-lg shadow-lg'>
                <h2 className='text-3xl text-zinc-700 font-semibold dark:text-white'>FAQ</h2>
                {faqData.map((q) =>(
                    <div key={q.id} className=' mb-4 last:mb-0'>
                    <button onClick={() => setActiveQuestion(activeQuestion === q.id ? null: q.id)} className='w-full text-left  focus:outline-none py-4 bg-transparent border-b border-zinc-700/20 dark:border-white/20  flex justify-between items-center'>
                      <p className='text-base text-zinc-700 dark:text-white font-semibold hover:underline'>{q.question}</p>
                        {activeQuestion === q.id ? (
                            <FontAwesomeIcon icon={faX} className='dark:text-white'/>
                        ) : (<FontAwesomeIcon icon={faPlus} className='dark:text-white'/>)}
                    </button>
                    <AnimatePresence>
                        {activeQuestion === q.id && (
                        <motion.div
                        className='mt-2 text-gray-600 dark:text-[#B0B0B0]'
                        initial={{opacity:0 , height:0}}
                        animate={{opacity:1 , height:'auto'}}
                        exit={{opacity:0 , height:0}}
                        >
                            <p className='text-sm font-medium'>{q.answer}</p>
                        </motion.div>
                        )}


                    </AnimatePresence>
                    </div>
                ))}
         </div>
    </div>
  )
}

export default Faq