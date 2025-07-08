'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const Experience = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [experiences, setExperiences] = useState(studentData.experience || []);
  const [formData, setFormData] = useState({ position: '', company: '', duration: '' });

  const handleAddExperience = async () => {
    const updatedExperiences = [...experiences, formData];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/experience/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ experience: updatedExperiences }),
        }
      );

      if (!response.ok) throw new Error('Failed to update experience.');

      const updatedData = await response.json();
      setExperiences(updatedData.experience);
      onUpdate(updatedData);

      // Clear form after successful addition
      setFormData({ position: '', company: '', duration: '' });
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleRemoveExperience = async (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/experience/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ experience: updatedExperiences }),
        }
      );

      if (!response.ok) throw new Error('Failed to update experience.');

      const updatedData = await response.json();
      setExperiences(updatedData.experience);
      onUpdate(updatedData);
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold mb-4">Experience</h2>

      {/* Form for Adding New Experience */}
      <div className="mb-6 space-y-2">
        <Input
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          placeholder="Position"
          className="mb-2"
        />
        <Input
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Company"
          className="mb-2"
        />
        <Input
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="Duration"
          className="mb-4"
        />
        <Button onClick={handleAddExperience}>Add Experience</Button>
      </div>

      {/* List of Experience Cards */}
      {experiences.map((exp, index) => (
        <div key={index} className="mb-4 border rounded-md shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-semibold">{exp.position}</h3>
              <p>{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemoveExperience(index)}
              className="text-sm"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Experience;
