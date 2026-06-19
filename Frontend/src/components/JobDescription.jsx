import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'

const JobDescription = () => {
    const dispatch = useDispatch()
    const { id: jobId } = useParams()

    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

    const [isApplied, setIsApplied] = useState(false)
    const [loading, setLoading] = useState(true)

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const currentApplications = Array.isArray(singleJob?.application) ? singleJob.application : [];
                const updatedSingleJob = { ...singleJob, application: [...currentApplications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Failed to apply');
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))

                    const alreadyApplied = res.data.job.application?.some(
                        app => app.applicant === user?._id
                    )

                    setIsApplied(alreadyApplied)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (jobId) fetchSingleJob()
    }, [jobId, user?._id, dispatch])

    if (loading) {
        return <p className="text-center mt-10 text-slate-600">Loading job details...</p>
    }

    if (!singleJob) {
        return <p className="text-center mt-10 text-slate-600">Job not found</p>
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-cyan-50'>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-2xl p-6">
                    <div>
                        <h1 className="font-bold text-2xl text-slate-900">{singleJob.title}</h1>

                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="text-cyan-700 bg-cyan-50 border border-cyan-100 font-bold" variant="ghost">
                                {singleJob.position} Positions
                            </Badge>

                            <Badge className="text-orange-700 bg-orange-50 border border-orange-100 font-bold" variant="ghost">
                                {singleJob.jobType}
                            </Badge>

                            <Badge className="text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold" variant="ghost">
                                {singleJob.salary} LPA
                            </Badge>
                        </div>
                    </div>

                    <Button
                        disabled={isApplied}
                        onClick={isApplied ? undefined : applyJobHandler}
                        className={`rounded-lg ${
                            isApplied
                                ? 'bg-slate-500 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className="border-b-2 border-b-orange-100 font-semibold text-slate-900 py-4 mt-6">
                    Job Description
                </h1>

                <div className="my-4 space-y-2 glass-card rounded-2xl p-6">
                    <p>
                        <span className="font-bold">Role:</span>
                        <span className="pl-4 text-slate-700">{singleJob.title}</span>
                    </p>

                    <p>
                        <span className="font-bold">Location:</span>
                        <span className="pl-4 text-slate-700">{singleJob.location}</span>
                    </p>

                    <p>
                        <span className="font-bold">Description:</span>
                        <span className="pl-4 text-slate-700">{singleJob.description}</span>
                    </p>

                    <p>
                        <span className="font-bold">Experience:</span>
                        <span className="pl-4 text-slate-700">{singleJob.experienceLevel} yrs</span>
                    </p>

                    <p>
                        <span className="font-bold">Salary:</span>
                        <span className="pl-4 text-slate-700">{singleJob.salary} LPA</span>
                    </p>

                    <p>
                        <span className="font-bold">Total Applicants:</span>
                        <span className="pl-4 text-slate-700">{singleJob.application?.length || 0}</span>
                    </p>

                    <p>
                        <span className="font-bold">Posted Date:</span>
                        <span className="pl-4 text-slate-700">{new Date(singleJob.createdAt).toLocaleDateString()}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
