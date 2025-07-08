'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const Hobbies = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [hobbies, setHobbies] = useState(studentData.hobbies || []);
  const [formData, setFormData] = useState({ hobby: '' });

  const handleAddHobby = async () => {
    const updatedHobbies = [...hobbies, formData.hobby];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/hobbies/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hobbies: updatedHobbies }),
        }
      );

      if (!response.ok) throw new Error('Failed to update hobbies.');

      const updatedData = await response.json();
      setHobbies(updatedData.hobbies);
      onUpdate(updatedData);

      // Clear the form after successful addition
      setFormData({ hobby: '' });
    } catch (error) {
      console.error('Error updating hobbies:', error);
    }
  };

  const handleRemoveHobby = async (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/hobbies/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hobbies: updatedHobbies }),
        }
      );

      if (!response.ok) throw new Error('Failed to update hobbies.');

      const updatedData = await response.json();
      setHobbies(updatedData.hobbies);
      onUpdate(updatedData);
    } catch (error) {
      console.error('Error updating hobbies:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold mb-4">Hobbies</h2>

      {/* Form for Adding a New Hobby */}
      <div className="mb-6">
        <Input
          value={formData.hobby}
          onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
          placeholder="Enter a hobby"
          className="mb-2 "
        />
        <Button onClick={handleAddHobby}>Add Hobby</Button>
      </div>

      {/* List of Hobbies */}
      <ul className="list-disc pl-6 space-y-2">
        {hobbies.map((hobby, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{hobby}</span>
            <Button
              variant="destructive"
              onClick={() => handleRemoveHobby(index)}
              className="text-sm"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Hobbies;
