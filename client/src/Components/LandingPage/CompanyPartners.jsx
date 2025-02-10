import React from 'react'
import Marquee from "react-fast-marquee";
import { companyLogos } from '../../Utils/Constant';
import { useSelector } from "react-redux";

const CompanyPartners = () => {
const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <section className='Company-Partner-Section w-full bg-white dark:bg-black py-20'>
    <div className='Comapnies-Partner-Wrapper container mx-auto md:w-[1440px] flex flex-col  gap-18   '>
        <h2 className='text-center text-2xl md:text-4xl  text-zinc-700 dark:text-white font-semibold'>Companies We Work With</h2>
        <div className="marquee-container bg--300 overflow-hidden flex flex-col gap-10 sm:gap-16 mt-5">
      <Marquee gradient={true} gradientColor={isDarkMode ? [0, 0, 0] : [255, 255, 255]} speed={50} direction='right ' className=''>
        {companyLogos.slice(0,5).map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.name}
            className="company-logo w-28 md:w-48 object-contain mr-16 md:mr-36"
          />
        ))}
      </Marquee>
      <Marquee gradient={true} gradientColor={isDarkMode ? [0, 0, 0] : [255, 255, 255]} speed={50} direction="left">
        {companyLogos.slice(5).map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.name}
            className="company-logo w-28 md:w-48 object-contain mr-16 md:mr-36"
          />
        ))}
      </Marquee>
    </div>
    </div>
    </section>
  )
}

export default CompanyPartners
