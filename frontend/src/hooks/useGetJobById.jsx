import { setSingleJobs } from '@/redux/jobSlice';
import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

function useGetJobById(jobId) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}/`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJobs(res.data.job));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchSingleJob();
        }
    }, [jobId, dispatch]);

    return { loading }; // You can return job data if needed
}


export default useGetJobById;