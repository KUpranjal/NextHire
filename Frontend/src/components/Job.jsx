import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate=useNavigate()
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime)
    const currentTime=new Date()
    const timeDifference=currentTime-createdAt
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  
  return (
    <div className='p-5 rounded-2xl glass-card hover:-translate-y-1 transition-all duration-300'>
        <div className='flex items-center justify-between'>
            
        <p className='text-sm text-slate-500'>{daysAgoFunction(job?.createdAt)==0 ? "Today":`${daysAgoFunction(job?.createdAt)} days ago` } </p>
        <Button variant="outline" className="rounded-full border-orange-200 hover:bg-orange-50" size='icon'><Bookmark/></Button>
        </div>
       <div className='flex items-center gap-2 my-2'>

        <Button className="p-6" variant='outline' size='icon'><Avatar>
            <AvatarImage src="https://imgs.search.brave.com/yqo8kXDDA_8fF07-vLasmHJ0IVrsWtCiKi-_tazro98/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZmluZC1qb2It/bG9nby12ZWN0b3It/aWxsdXN0cmF0aW9u/XzUwOTM1NC01NjIu/anBnP3NlbXQ9YWlz/X2luY29taW5nJnc9/NzQwJnE9ODA" />
            </Avatar></Button>
            <div>
                <h1 className='font-semibold text-lg text-slate-900'>
                   {job?.company?.name}
                </h1>
                <p className='text-sm text-slate-500'>{job?.location}</p>
            </div>
       </div>
       <div className=' '> 
        <h1 className='font-bold text-lg my-2 text-slate-900'>{job?.title}</h1>
        <p className='text-sm text-slate-600 line-clamp-2'>{job?.description}</p>

       </div>
          <div  className='flex items-center gap-2 mt-4'>
                         <Badge className={'text-cyan-700 bg-cyan-50 font-bold border border-cyan-100'} variant="ghost">{job?.position} Positions</Badge>
                         <Badge className={'text-orange-700 bg-orange-50 font-bold border border-orange-100'} variant="ghost">{job?.jobType}</Badge>
                         <Badge className={'text-emerald-700 bg-emerald-50 font-bold border border-emerald-100'} variant="ghost">{job?.salary}LPA</Badge>
                     </div>
                     <div className='flex items-center gap-4 mt-4'>
                        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className='border-slate-300'>Details</Button>
                        <Button  className="bg-orange-500 hover:bg-orange-600">Save for Later</Button>
                     </div>
    </div>
  )
}

export default Job
