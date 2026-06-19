
import React from 'react'
import { Badge } from './ui/badge'

const LatestJobsCard = ({job}) => {
  return (
    <div className='p-5 rounded-2xl glass-card cursor-pointer hover:-translate-y-1 transition-all duration-300'>
        <div>

        <h1 className='font-semibold text-lg text-slate-900'>{job?.company?.name}</h1>
        <p className='text-sm text-slate-500'>{job?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 text-slate-900'>{job?.title}</h1>
            <p className='text-sm text-slate-600 line-clamp-2'>{job?.description}</p>

        </div>
         <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-cyan-700 bg-cyan-50 font-bold border border-cyan-100'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-orange-700 bg-orange-50 font-bold border border-orange-100'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-emerald-700 bg-emerald-50 font-bold border border-emerald-100'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
    </div>
  )
}

export default LatestJobsCard
