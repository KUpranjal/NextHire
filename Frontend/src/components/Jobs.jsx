import React, { useMemo } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const MotionDiv = motion.div;
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const filterJobs = useMemo(() => {
        if (!searchedQuery) return allJobs;
        return allJobs.filter((job) => {
            return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        });
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-cyan-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4 pb-8'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='lg:w-[300px]'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span className='text-slate-600'>Job not found</span> : (
                            <div className='flex-1 lg:h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <MotionDiv
                                                initial={{ opacity: 0, y: 22 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.25 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </MotionDiv>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs
