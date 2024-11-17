import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useGetAllCompanies() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompanies = async () => {
            console.log("Fetching companies...");

            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                console.log("Response received:", res);

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    console.error("Fetch was not successful:", res.data);
                }
            } catch (error) {
                // Improved error handling
                if (error.response) {
                    console.error("Error fetching companies:", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error setting up the request:", error.message);
                }
            }
        };

        fetchAllCompanies();
    }, [dispatch]); // Add dispatch to dependency array
}

export default useGetAllCompanies;
