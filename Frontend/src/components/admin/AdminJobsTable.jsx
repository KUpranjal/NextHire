import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const navigate = useNavigate();

  // ✅ SAFE REDUX DEFAULTS
  const { allAdminJobs = [], searchJobByText = '' } = useSelector(
    store => store.job || {}
  );

  // ✅ DERIVED STATE USING useMemo
  const filteredJobs = useMemo(() => {
    return allAdminJobs.filter(job => {
      if (!searchJobByText) return true;

      const search = searchJobByText.toLowerCase();

      return (
        job?.title?.toLowerCase().includes(search) ||
        job?.company?.name?.toLowerCase().includes(search)
      );
    });
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map(job => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {job?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-40">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
