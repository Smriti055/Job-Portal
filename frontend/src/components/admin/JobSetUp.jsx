import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import useGetJobById from '@/hooks/useGetJobById';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';

function JobSetUp() {
    const params = useParams();
    useGetJobById(params.id);
    
    const { singleJob } = useSelector(store => store.job);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: 0,
        location: "",
        jobType: "",
        experience: 0, // Keep it as a number
        position: 0,
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: name === "experience" || name === "salary" ? Number(value) : value // Convert to number for specific fields
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!input.title || !input.description) {
                toast.error("Title and Description are required.");
                return;
            }
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, {
                ...input,
                experienceLevel: input.experience // Send experienceLevel to the API
            }, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                location: singleJob.location || "",
                salary: singleJob.salary || 0, // Ensure this is a number
                jobType: singleJob.jobType || "",
                position: singleJob.position || 0,
                experience: singleJob.experienceLevel || 0, // Set to experienceLevel
                requirements: singleJob.requirements.join(", ") || "" // Join if it's an array
            });
        }
    }, [singleJob, params.id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate(-1)}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Job SetUp</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full my-4'>Update</Button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default JobSetUp;
