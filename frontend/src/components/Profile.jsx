import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, PenIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialogue from './UpdateProfileDialogue';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Footer from './shared/Footer';

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user = {} } = useSelector(store => store.auth); 

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-52 bg-white border border-gray-200 rounded-2xl my-5 p-5'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl mb-2'>{user?.fullname}</h1>
              <p className='text-sm'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><PenIcon /></Button>
        </div>
        <div className='m-3 flex flex-col gap-2'>
          <div className='flex items-center gap-3'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className='flex items-center gap-3 mt-2'>
            {
              user?.profile?.skills.length ? 
                user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : 'NA'
            }
          </div>
        </div>

        <div className='grid w-full m-w-sm items-center gap-1.5 mt-2'>
          <Label className='text-md font-bold'>Resume</Label>
          {
            user?.profile?.resume ? (
              <a 
                target='_blank' 
                rel='noopener noreferrer' 
                href={user?.profile?.resume} 
                className='text-blue-500 w-full hover:underline'
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )
          }
        </div>
      </div>
      <div className='max-w-4xl mx-80 bg-white rounded-lg'>
        <h1 className='font-bold text-lg my-2'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
      <Footer/>
    </div>
  );
}

export default Profile;
