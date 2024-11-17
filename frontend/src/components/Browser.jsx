import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import Footer from './shared/Footer'

function Browser() {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }
  },[]);
  return (
    <>
    <div>
        <Navbar/>
        <div className='mx-10 my-5'>
        <h1 className='font-bold text-lg'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
        {
            allJobs.map((job)=>{
                return (
                    <Job key={job._id} job={job}/>
                )
            })
        }
        </div>
        </div>
    </div>
    </>
  )
}

export default Browser