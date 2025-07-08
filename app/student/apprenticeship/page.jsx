"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ApprenticeshipCard from "@/components/student/apprenticeshipCard.jsx";

export default function ApprenticeshipPage() {
  const { token, userType } = useSelector((state) => state.auth); // Fetch auth details from Redux
  const [apprenticeships, setApprenticeships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApprenticeships = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/jobs/active`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch apprenticeships.");
      }

      const data = await response.json();
      setApprenticeships(data.jobs);
    } catch (err) {
      console.error("[FETCH_APPRENTICESHIPS_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchApprenticeships();
    }
  }, [token]);

  if (loading) {
    return <p className="p-6">Loading apprenticeships...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchApprenticeships}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Available Apprenticeships</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apprenticeships.length > 0 ? (
          apprenticeships.map((apprenticeship) => (
            <ApprenticeshipCard key={apprenticeship.id} apprenticeship={apprenticeship} />
          ))
        ) : (
          <p>No apprenticeships available at the moment.</p>
        )}
      </div>
    </div>
  );
}
