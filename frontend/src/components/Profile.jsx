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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-sm text-gray-600 mt-2">{user?.profile?.bio || 'Bio not available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-transparent border-2 border-gray-300 hover:bg-gray-200 rounded-full p-2" variant="outline">
            <PenIcon />
          </Button>
        </div>

        {/* Contact Details Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={20} />
            <span>{user?.email || 'Email not available'}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact size={20} />
            <span>{user?.phoneNumber || 'Phone number not available'}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex items-center gap-3 mt-2">
            {user?.profile?.skills?.length ? 
              user.profile.skills.map((item, index) => (
                <Badge key={index} className="text-blue-700 font-medium">{item}</Badge>
              )) : 'No skills listed'}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mb-6">
          <Label className="text-md font-semibold">Resume</Label>
          {user?.profile?.resume ? (
            <a 
              href={user?.profile?.resume} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg mb-5">
        <h1 className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialogue open={open} setOpen={setOpen} />

      <Footer />
    </div>
  );
}

export default Profile;
