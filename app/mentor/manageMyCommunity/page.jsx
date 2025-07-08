'use client';

import { useState, useEffect } from "react";
import CommunityCard from "@/components/mentor/communityCard";
import CreateCommunityDialog from "@/components/mentor/createCommunityForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ManageMyCommunity = () => {
  const router = useRouter();
  const { token, userType } = useSelector((state) => state.auth); // Access token and user type
  const [communities, setCommunities] = useState([]); // Community data state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls dialog visibility

  // Fetch communities for the logged-in user
  const fetchCommunities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch communities.");
      }

      const data = await response.json();
      console.log(data);
      setCommunities(data.communities || []); // Assume the API returns a `communities` array
    } catch (err) {
      console.error("Error fetching communities:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch communities on initial load
  useEffect(() => {
    fetchCommunities();
  }, [token, userType]);

  // Add a new community
  const handleCreate = async (newCommunity) => {
    try {
      await fetchCommunities();
    } catch (err) {
      console.error("Error creating community:", err);
      // alert("Failed to create community. Please try again.");
    }
  };

  const handleEdit = async (newCommunity) => {
    try {
      await fetchCommunities();
    } catch (err) {
      console.error("Error creating community:", err);
      // alert("Failed to create community. Please try again.");
    }
  };

  // View a community
  const handleView = (id) => {
    router.push(`/mentor/community/${id}`);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading communities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage My Communities</h1>
        <CreateCommunityDialog onSave={handleCreate} />
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onSave={handleEdit}
            onView={() => handleView(community.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageMyCommunity;
