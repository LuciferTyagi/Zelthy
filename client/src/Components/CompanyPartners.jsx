import React from 'react'
import Marquee from "react-fast-marquee";
import { companyLogos } from '../Utils/Constant';
const CompanyPartners = () => {
  return (
    <section className='Company-Partner-Section w-full bg--800 py-20'>
    <div className='Comapnies-Partner-Wrapper container mx-auto md:w-[1440px] flex flex-col bg--700 gap-18   '>
        <h2 className='text-center text-2xl md:text-4xl  text-[#0B3558] font-semibold'>Companies We Work With</h2>
        <div className="marquee-container bg--300 overflow-hidden flex flex-col gap-10 sm:gap-16 mt-5">
      <Marquee gradient={true} speed={50} direction='right '>
        {companyLogos.slice(0,5).map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.name}
            className="company-logo w-28 md:w-48 object-contain mr-16 md:mr-36"
          />
        ))}
      </Marquee>
      <Marquee gradient={true} speed={50} direction="left">
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
