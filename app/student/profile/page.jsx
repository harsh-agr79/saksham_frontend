"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Profile from "@/components/profile/profileComp.jsx";
import Education from "@/components/profile/education.jsx";
import Experience from "@/components/profile/experience.jsx";
import Skills from "@/components/profile/skills.jsx";
import Hobbies from "@/components/profile/hobby.jsx";
import Domains from "@/components/profile/domain.jsx";

const ProfilePage = () => {
  const { user, userType, token } = useSelector((state) => state.auth);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/profile/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data.");

        const data = await response.json();
        console.log(data);
        setStudentData({
          ...data,
          education: JSON.parse(data.education) || [],
          experience: JSON.parse(data.experience) || [],
          skills: JSON.parse(data.skills) || [],
          hobbies: JSON.parse(data.hobbies) || [],
          domains: JSON.parse(data.domains) || [],
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user.id, userType, token]);

  const handleUpdate = (updatedData) => {
    setStudentData(updatedData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!studentData) return <div>Profile not found.</div>;

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 border">
        <Profile studentData={studentData} onUpdate={handleUpdate} />
        <Education studentData={studentData} onUpdate={handleUpdate} />
        <Experience studentData={studentData} onUpdate={handleUpdate} />
        <Skills studentData={studentData} onUpdate={handleUpdate} />
        <Hobbies studentData={studentData} onUpdate={handleUpdate} />
        <Domains studentData={studentData} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfilePage;
