"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function MyAppliedApprenticeships() {
  const [apprenticeships, setApprenticeships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, userType } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAppliedApprenticeships = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/jobs/applied`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch apprenticeships");
        }

        const data = await response.json();
        setApprenticeships(data.applied_jobs || []); // Ensure data is properly handled
      } catch (err) {
        console.error("Error fetching apprenticeships:", err);
        setError("Failed to fetch apprenticeships.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedApprenticeships();
  }, [token, userType]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading your applied apprenticeships...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Applied Apprenticeships</h1>
      {apprenticeships.length === 0 ? (
        <p className="text-center text-gray-500">You have not applied for any apprenticeships yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apprenticeships.map(({ job_listing, status }) => (
            <ApprenticeshipCard key={job_listing.id} apprenticeship={job_listing} status={status} />
          ))}
        </div>
      )}
    </div>
  );
}

const ApprenticeshipCard = ({ apprenticeship, status }) => {
  const {
    title,
    description,
    location,
    type,
    start_date,
    end_date,
    application_deadline,
    skills_required = [],
    special_requirements,
  } = apprenticeship;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>Type:</strong> {type}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Application Deadline:</strong> {new Date(application_deadline).toLocaleDateString()}
        </p>
        <p>
          <strong>Special Requirements:</strong> {special_requirements || "None"}
        </p>
        
      </div>
      <div className="mb-4">
        <strong>Skills Required:</strong>
        <ul className="list-disc pl-6 text-gray-600">
          {skills_required.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
        <p>
          <strong>Status:</strong> {status}
        </p>
    </div>
  );
};
