'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const Education = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [educations, setEducations] = useState(studentData.education || []);
  const [formData, setFormData] = useState({ degree: '', institution: '', year: '' });

  const handleAddEducation = async () => {
    const updatedEducations = [...educations, formData];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/education/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ education: updatedEducations }),
        }
      );

      if (!response.ok) throw new Error('Failed to update education.');

      const updatedData = await response.json();
      setEducations(updatedData.education);
      onUpdate(updatedData);

      // Clear form after successful addition
      setFormData({ degree: '', institution: '', year: '' });
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const handleRemoveEducation = async (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/education/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ education: updatedEducations }),
        }
      );

      if (!response.ok) throw new Error('Failed to update education.');

      const updatedData = await response.json();
      setEducations(updatedData.education);
      onUpdate(updatedData);
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold mb-4">Education</h2>

      {/* Form for Adding New Education */}
      <div className="mb-6 space-y-2">
        <Input
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          placeholder="Degree"
          className="mb-2"
        />
        <Input
          value={formData.institution}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          placeholder="Institution"
          className="mb-2"
        />
        <Input
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          placeholder="Year"
          className="mb-4"
        />
        <Button onClick={handleAddEducation}>Add Education</Button>
      </div>

      {/* List of Education Cards */}
      {educations.map((edu, index) => (
        <div key={index} className="mb-4 border rounded-md shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-semibold">{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemoveEducation(index)}
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

export default Education;
