import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Footer from './shared/Footer';

function JobDescription() {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true); // Update local state
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJobs(updateSingleJob)); // Real-time UI update

                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJobs(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 p-5">
            <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                {/* Job Title and Apply Button Section */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-800 hover:text-purple-600 transition-all duration-300">{singleJob?.title}</h1>
                        <div className="flex items-center gap-3 mt-3">
                            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position}</Badge>
                            <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className="text-[#7209B7] font-bold" variant="ghost">{singleJob?.salary} lpa</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transform hover:scale-105 transition-all duration-300'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Job Description Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Job Description</h2>
                    <div className="space-y-4 text-gray-700">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Role: </h3>
                            <p>{singleJob?.title}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Location: </h3>
                            <p>{singleJob?.location}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Description: </h3>
                            <p>{singleJob?.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Experience: </h3>
                            <p>{singleJob?.experience} years</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Salary: </h3>
                            <p>{singleJob?.salary} lpa</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Total Applicants: </h3>
                            <p>{singleJob?.applications?.length}</p>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-bold">Posted Date: </h3>
                            <p>{singleJob?.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription;
