import { Application } from "../models/application-model.js";
import { Job } from "../models/job-model.js";


export const applyJob = async (req, res) =>{
    try {

        const userId = req.userId;
        const jobId = req.params.id;

        if(!jobId){
            return res.send(400).json({
                message: "Job Id is required",
                success:false
            })
        };

        //check if the user has applied already
        const exisitingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(exisitingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success:false
            });
        }

        //check if job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            });
        }

        //new application
        const newApplication = await Application.create({
            job:jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied Successfully",
            success:true
        });
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJob = async(req, res) =>{
    try {
        const userId = req.userId;
        const application =  await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(404).json({
                message: "No Applications",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        });

    } catch (error) {
        console.log(error)
    }
}

// admin dekhega kitne user ne apply kiya
export const getApplicants = async(req, res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });

        if(!job){
            return res.status(404).json({
                message: 'Job not found',
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
} 

export const updateStatus = async(req, res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: 'Status required',
                success:false
            })
        }

        //find application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: 'Application not found',
                success:false
            })
        };

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: 'Status updated Successfully',
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}