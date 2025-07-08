"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ApprenticeshipFormDialog from "@/components/company/apprenticeshipFormDialog";
import ApprenticeshipTable from "@/components/company/apprenticeshipTable";

export default function ApprenticeshipsPage() {
  const router = useRouter();
  const { userType, token } = useSelector((state) => state.auth); // Get the auth token from Redux
  const [apprenticeships, setApprenticeships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApprenticeships = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/job`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Bearer token
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Add x-api-key
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch apprenticeships.");
      }

      const data = await response.json();
      console.log(data);
      setApprenticeships(data.job_listings);
    } catch (err) {
      console.error("[FETCH_APPRENTICESHIPS_ERROR]", err);
      setError("Failed to load apprenticeships. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    fetchApprenticeships();
  };

  useEffect(() => {
    fetchApprenticeships();
  }, [token]); // Re-fetch data if the token changes

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Apprenticeship Listings</h1>
        <p className="text-center text-gray-500 mt-4">Loading apprenticeships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Apprenticeship Listings</h1>
        <p className="text-center text-red-500 mt-4">
          {error}
          <button onClick={fetchApprenticeships} className="ml-2 text-blue-600">
            Retry
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Apprenticeship Listings</h1>
      <ApprenticeshipFormDialog onCreate={handleCreate} />
      <ApprenticeshipTable
        apprenticeships={apprenticeships}
        onManage={(id) => router.push(`/company/manageApprenticeship/${id}`)}
      />
    </div>
  );
}
