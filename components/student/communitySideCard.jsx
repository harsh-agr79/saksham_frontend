"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export function CommunitySideCard() {
  const { id } = useParams(); // Fetch communityId from params
  const { userType, token } = useSelector((state) => state.auth); // Get Bearer token from Redux
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch community details
  useEffect(() => {
    const fetchCommunityDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/sidebar/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community details.");
        }

        const data = await response.json();
        setCommunityData(data);
      } catch (err) {
        console.error("[FETCH_COMMUNITY_DETAILS_ERROR]", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [id, token]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!communityData) {
    return <p className="text-center">No community data available.</p>;
  }

  const {
    description,
    members_count,
    posts_count,
    discussions_count,
    creator,
    mentors,
  } = communityData;

  return (
    <Card className="w-[350px] bg-purple-100">
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between p-1">
            <div>{members_count}</div>
            <div>{posts_count}</div>
          </div>
          <div className="flex justify-between p-1">
            <div>{discussions_count}</div>
          </div>
        </div>

        {/* Group Created By */}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Group Created By</h3>
          <p className="text-gray-600">{creator.name}</p>
        </div>

        {/* Mentors */}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Mentors</h3>
          <div className="flex flex-col gap-4 mt-2">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mentor.profile_image} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{mentor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
