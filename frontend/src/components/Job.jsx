import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import Footer from './shared/Footer'

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  }

  return (
    <div className='p-6 rounded-xl shadow-xl bg-gradient-to-br from-white via-gray-100 to-gray-50 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl'>
      
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{job?.createdAt === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div>
          <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2 text-gray-900'>
          {job?.title}
        </h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-3 mt-4'>
        <Badge className='text-blue-700 font-semibold' variant="ghost">{job?.position} Positions</Badge>
        <Badge className='text-[#F83002] font-semibold' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-[#7209B7] font-semibold' variant="ghost">{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-4 mt-5'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="transition-colors hover:bg-gray-200">Details</Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5a1a94] transition-colors">Save for Later</Button>
      </div>
    </div>
  )
}

export default Job;
