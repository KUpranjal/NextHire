import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'

import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllAppliedJobs } from '@/redux/jobSlice'




const Profile = () => {
    const [open , setOpen]=useState(false);
    const dispatch = useDispatch();
    const{user}=useSelector(store=>store.auth)
    const isResume=true

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application || []));
                }
            } catch (error) {
                console.log(error);
                dispatch(setAllAppliedJobs([]));
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);

    return (
         <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-cyan-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto glass-card rounded-2xl my-6 p-8 animate-enter'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-semibold text-2xl text-slate-900'>{user?.fullname}</h1>
                            <p className='text-slate-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right border-orange-200 hover:bg-orange-50" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-slate-700'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-slate-700'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-semibold text-slate-900'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills?.length ? user?.profile?.skills.map((item, index) => <Badge key={index} className='bg-cyan-50 text-cyan-700 border border-cyan-100'>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-cyan-700 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto glass-card rounded-2xl p-6 animate-enter-delay'>
                <h1 className='font-bold text-xl text-slate-900 my-2'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
