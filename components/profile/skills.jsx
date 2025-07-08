'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const Skills = ({ studentData, onUpdate }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState(studentData.skills || []);
  const [formData, setFormData] = useState({ skill: '' });

  const handleAddSkill = async () => {
    const updatedSkills = [...skills, formData.skill];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/skills/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ skills: updatedSkills }),
        }
      );

      if (!response.ok) throw new Error('Failed to update skills.');

      const updatedData = await response.json();
      setSkills(updatedData.skills);
      onUpdate(updatedData);

      // Clear the form after successful addition
      setFormData({ skill: '' });
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  const handleRemoveSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/skills/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ skills: updatedSkills }),
        }
      );

      if (!response.ok) throw new Error('Failed to update skills.');

      const updatedData = await response.json();
      setSkills(updatedData.skills);
      onUpdate(updatedData);
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-purple-100 shadow-md rounded-lg p-6 space-y-6 border">
    <div>
      <h2 className="text-lg font-semibold mb-4">Skills</h2>

      {/* Form for Adding a New Skill */}
      <div className="mb-6">
        <Input
          value={formData.skill}
          onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
          placeholder="Enter a skill"
          className="mb-2"
        />
        <Button onClick={handleAddSkill}>Add Skill</Button>
      </div>

      {/* List of Skills */}
      <ul className="list-disc pl-6 space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{skill}</span>
            <Button
              variant="destructive"
              onClick={() => handleRemoveSkill(index)}
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

export default Skills;
