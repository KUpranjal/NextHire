import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

// const randomJobs = [1, 2,45];

const Browse = () => {
    const MotionDiv = motion.div;
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])
    return (
        <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-cyan-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-2xl my-10 text-slate-900'>Search Results ({allJobs.length})</h1>
                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        allJobs.map((job, index) => {
                            return (
                                <MotionDiv
                                    key={job._id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.24, delay: index * 0.02 }}
                                >
                                    <Job job={job}/>
                                </MotionDiv>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
