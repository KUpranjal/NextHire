import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const AdminJobs = () => {
  const MotionDiv = motion.div;
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector(store => store.job);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='rounded-2xl bg-gradient-to-r from-cyan-800 via-sky-700 to-blue-700 p-6 md:p-8 text-white shadow-lg'
        >
          <p className='text-xs uppercase tracking-[0.2em] text-cyan-100'>Admin Workspace</p>
          <div className='mt-2 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold'>Manage Job Posts</h1>
              <p className='text-sm text-cyan-100 mt-1'>Create openings, monitor applicants, and keep listings updated.</p>
            </div>
            <div className='rounded-xl bg-white/10 border border-white/20 px-4 py-3'>
              <p className='text-xs text-cyan-100'>Live Job Posts</p>
              <p className='text-2xl font-semibold'>{Array.isArray(allAdminJobs) ? allAdminJobs.length : 0}</p>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className='bg-white border border-slate-200 shadow-sm rounded-2xl p-5 md:p-6 mt-6'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 my-1'>
          <Input
            className="w-full md:w-72"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable />
        </MotionDiv>
      </div>
    </div>
  )
}

export default AdminJobs
