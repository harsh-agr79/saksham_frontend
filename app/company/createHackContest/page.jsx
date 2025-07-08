"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"; // For accessing token and userType
import EventTable from "@/components/company/hackContestTable";
import EventFormDialog from "@/components/company/hackContestDialog.jsx";

export default function CreateEventsPage() {
  const { token, userType } = useSelector((state) => state.auth); // Get token and userType from Redux
  const [hackathons, setHackathons] = useState([]);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch hackathons on mount
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${backendUrl}/${userType}/hack-contests`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setHackathons(data.hack_contests);
        } else {
          console.error("Failed to fetch hackathons.");
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    };

    fetchHackathons();
  }, [backendUrl, userType, token, apiKey]);

  const handleCreateHackathon = async (newEvent) => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/hackathons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const data = await response.json();
        setHackathons((prev) => [...prev, data]);
      } else {
        const errorData = await response.json();
        console.error("Failed to create hackathon:", errorData);
        alert(errorData.message || "Failed to create hackathon.");
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
      alert("An error occurred while creating the hackathon.");
    }
  };

  const handleManageHackathon = (id) => {
    router.push(`/company/manageHackathon?id=${id}`);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Manage Hackathons</h1>

      {/* Create Button */}
      <div className="flex space-x-4">
        <EventFormDialog eventType="hackathons" onCreate={handleCreateHackathon} />
      </div>

      {/* Hackathons Table */}
      <EventTable
        title="Hackathons"
        events={hackathons}
        onManage={handleManageHackathon}
      />
    </div>
  );
}
