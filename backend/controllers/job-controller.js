import { Job } from "../models/job-model.js";

//jobs posted by admins
export const postJob = async (req, res) =>{
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;

        const userId = req.userId;

        if(!title || !description || !requirements || !salary || !location || !jobType ||!experience || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company:companyId,
            created_by:userId

        });
        return res.status(201).json({
            message: "New Job Created Successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
//students
export const getAllJobs = async(req, res) =>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
//students
export const getJobById = async(req, res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(400).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

//for admins to know kitne jobs create kara
export const getAdminJobs = async(req, res) =>{
    try {
        const adminId = req.userId;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(400).json({
                message: "Jobs not found",
                success:true
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

//updateJob
export  const jobUpdate = async(req, res)=>{
    try {
        const {title, description, requirements, salary, experienceLevel, location, jobType, position } = req.body;
        const updateData = {};
        if(title){
           updateData.title = title;
        }
        if(description){
            updateData.description = description;
         }
         if(requirements){
            if (requirements) updateData.requirements = requirements.split(",");          }
         if(salary){
            updateData.salary = salary;
         }
         
         if(experienceLevel){
            updateData.experienceLevel = experienceLevel;
         }
         if(location){
            updateData.location = location;
         }
         if(jobType){
            updateData.jobType = jobType;
         }
         if(position){
            updateData.position = position;
         }

         const jobUpdated = await Job.findByIdAndUpdate(req.params.id, updateData, {new: true});
         if (!jobUpdated) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job information updated successfully",
            success: true,
            jobUpdated, // Optionally return the updated company data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}