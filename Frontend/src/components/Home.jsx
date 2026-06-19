import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const MotionSection = motion.section;
  useGetAllJobs()
  const {user} =useSelector(store=>store.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(user?.role=="recruiter"){
     navigate("/admin/companies")
    }
  },[navigate, user?.role])
  return (
    <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-cyan-50'>
        <Navbar/>
        <MotionSection
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='relative overflow-hidden'
        >
          <div className='absolute -top-24 -left-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl' />
          <div className='absolute top-24 -right-16 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl' />
          <div className='relative max-w-7xl mx-auto px-4 pt-10 pb-4'>
            <HeroSection/>
          </div>
        </MotionSection>
        <MotionSection
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className='max-w-7xl mx-auto px-4'
        >
          <div className='rounded-2xl border border-orange-100 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm'>
            <h2 className='text-xl md:text-2xl font-semibold text-slate-800 mb-3'>Explore Roles By Category</h2>
            <p className='text-sm text-slate-500 mb-1'>Pick a category and jump directly to matched opportunities.</p>
            <CategoryCarousel/>
          </div>
        </MotionSection>
        <MotionSection
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className='max-w-7xl mx-auto px-4 pb-10'
        >
          <LatestJobs/>
        </MotionSection>
        <Footer/>
    </div>
  )
}

export default Home
