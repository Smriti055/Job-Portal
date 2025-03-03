import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 
                   cursor-pointer transition-all duration-300 ease-in-out 
                   hover:shadow-2xl hover:scale-105 hover:border-gray-300"
      >
        {/* Company Name & Logo */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name}</h1>
          <img
            src={job?.company?.logo || "https://via.placeholder.com/40"}
            alt="Company Logo"
            className="w-12 h-12 rounded-full border border-gray-300 object-cover"
          />
        </div>
        <p className="text-sm text-gray-500">📍 India</p>

        {/* Job Title & Description */}
        <div className="mt-3">
          <h1 className="font-bold text-lg text-[#6A38C2]">{job?.title}</h1>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job?.description}</p>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className="text-blue-700 font-semibold bg-blue-100">{job?.position} Positions</Badge>
          <Badge className="text-[#F83002] font-semibold bg-red-100">{job?.jobType}</Badge>
          <Badge className="text-[#7209B7] font-semibold bg-purple-100">{job?.salary} LPA</Badge>
        </div>
      </div>
    </div>
  );
}

export default LatestJobCards;
