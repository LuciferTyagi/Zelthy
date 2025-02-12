import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthCard = ({ title, subtitle, buttonText, redirectText, redirectLink, redirectHref ,isLogin }) => {
  const[name ,  setName] = useState("");
  const[email , setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "http://localhost:8000/api/auth/login" : "http://localhost:8000/api/auth/register";
    try {
      const response = await axios.post(endpoint, { username:name, email });

      
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        navigate("/slot"); 
      } else {
        navigate("/log-in"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} className='bg-white dark:bg-[#1E1E1E] rounded-lg p-4 md:p-8 flex flex-col gap-5 text-center'>
    <h1 className='text-3xl md:text-5xl text-[#0B3558] dark:text-white font-bold leading-snug'>{title}</h1>
    <p className='text-[#476788] dark:text-[#B0B0B0] text-sm md:text-lg font-medium'>{subtitle}</p>
    {error && <p className="text-red-500">{error}</p>}
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} type='text'  placeholder='Enter your good name'  className='outline-none  rounded-md p-2 md:p-3  placeholder:text-zinc-300 placeholder:text-sm font-medium'/>
          <input onChange={(e) => setEmail(e.target.value)} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} type='email' placeholder='Enter your email' className='outline-none  rounded-md     p-2 md:p-3  placeholder:text-zinc-300 placeholder:text-sm font-medium'/>
          <button className='bg-[#006BFF] dark:bg-white dark:text-black font-medium text-white p-2 md:p-3 rounded-md text-sm md:text-base'>{buttonText}</button>
    </form>
    <div className='flex items-center gap-3'>
          <div className='h-[1px] w-full bg-black/20'/>
          <p className='text-[#476788] dark:text-[#B0B0B0] text-sm md:text-base'>OR</p>
          <div className='h-[1px] w-full bg-black/20'/>

    </div>
    <p className='text-[#476788] dark:text-[#B0B0B0] text-sm md:text-base'>{redirectText}{" "} <a href={redirectHref} className='text-[#006BFF]  font-medium'>{redirectLink}</a></p>
</div>
  )
}

export default AuthCard
