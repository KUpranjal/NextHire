import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    const appliedJobs = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];
    return (
        <div className='mt-4'>
            <Table>
                <TableCaption className="text-slate-500">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-slate-700">Date</TableHead>
                        <TableHead className="text-slate-700">Job Role</TableHead>
                        <TableHead className="text-slate-700">Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.length <= 0 ? <span className='text-slate-600'>You haven't applied any job yet.</span> : appliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-500' : appliedJob?.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'} text-white`}>{(appliedJob?.status || "pending").toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
