'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import BadgePool from "@/components/student/BadgeComponent";

const Profile = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: studentData.name });
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    if (profileImage) formDataToSend.append('profile_image', profileImage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/profile/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
          credentials: 'include', // Include cookies if your backend supports it
        }
      );

      if (!response.ok) throw new Error('Failed to update profile.');

      const updatedData = await response.json();
      onUpdate(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold">Profile</h2>
      <span>{formData.name}</span>
      <div className=' p-2'>
        <BadgePool/>
        
      </div>
      
      
      {/* <Input type="file" accept="image/*" onChange={handleFileChange} /> */}
      {/* <Button onClick={handleUpdate}>Save</Button> */}
    </div>
    </div>
    </div>
  );
};

export default Profile;
