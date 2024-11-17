import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () =>{
    dispatch(setSearchedQuery(query));
    navigate('/browser');
  }
  return (
    <div className='text-center'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h2 className='my-4 text-4xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h2>
        <p><span className='text-red-600 font-semibold'>Job Junction:</span> Bridging Aspirations and Opportunities!</p>
        <div className='flex w-[40%] shadow-lg border mt-5 border-gray-200 py-1 px-2 rounded-full items-center gap-4 mx-auto'>
            <input 
            type="text"
            placeholder='Find your dream Jobs'
            onChange={(e)=>setQuery(e.target.value)}
            className='outline-none border-none w-full' />

            <Button onClick={searchJobHandler} className='rounded-r-;g'>
                <Search className='h-5 w-5'/>
            </Button>
        </div>
    </div>
  )
}

export default HeroSection