
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center animate-enter'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm'>Smart Career Platform</span>
                <h1 className='text-4xl md:text-6xl font-bold leading-tight text-slate-900'>Search, Apply & <br /> Land Your <span className='text-cyan-700'>Next Big Role</span></h1>
                <p className='text-slate-600 max-w-2xl mx-auto'>Discover curated opportunities, filter faster, and track your job journey in one smooth dashboard.</p>
                <div className='flex w-full md:w-[55%] lg:w-[42%] border border-orange-100 bg-white rounded-full items-center gap-3 mx-auto p-2 shadow-[0_12px_35px_rgba(249,115,22,0.16)]'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-2 text-slate-700'

                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-orange-500 hover:bg-orange-600 px-5">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
