import React from 'react'
import Header from './Header'
import Hero from './Hero'
import CompanyPartners from './CompanyPartners'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='font-[inter]'>
        <Header/>
        <Hero/>
        <CompanyPartners/>
        <Footer/>
    </div>
  )
}

export default Home
  