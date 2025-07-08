"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export function CommunityDomain() {
  const { id } = useParams(); // Fetch communityId from params
  const { userType, token } = useSelector((state) => state.auth);
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Community Domain Data
  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!id) {
        setError("Community ID is missing.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}`, // Dynamic endpoint
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include Bearer token
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community data.");
        }

        const data = await response.json();
        console.log(data)
        setCommunityData(data);
      } catch (err) {
        console.error("[FETCH_COMMUNITY_ERROR]", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [id, userType, token]);

  const handleAction = async () => {
    if (!communityData || actionLoading) return;
  
    const endpoint =
      communityData.button_text === "Join"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/join`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/leave`;
  
    const method = communityData.button_text === "Join" ? "POST" : "DELETE";
  
    setActionLoading(true);
    setError("");
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(
          communityData.button_text === "Join"
            ? "Failed to join the community."
            : "Failed to leave the community."
        );
      }
  
      // Refetch community data to update button_text and other fields
      const updatedData = await response.json();
      window.location.reload();
      setCommunityData(updatedData);
    } catch (err) {
      console.error("[COMMUNITY_ACTION_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setActionLoading(false);
    }
  };
  

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
    name,
    description,
    profile_photo,
    cover_photo,
    button_text,
    creator,
  } = communityData;

  return (
    <Card className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg bg-[#FFF5EE]">
      {/* Background (Cover Photo) */}
      <div className="absolute inset-0">
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${cover_photo}`}
          alt="Cover Photo"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Avatar Overlap */}
      <CardContent className="relative flex justify-end items-center h-full">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 border-4 border-white shadow-lg">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile_photo}`}
            alt={name}
          />
          <AvatarFallback>{creator?.name?.charAt(0) || "C"}</AvatarFallback>
        </Avatar>
      </CardContent>

      {/* Bottom Text and Button */}
      <div className="absolute bottom-0 w-full bg-white p-4 flex justify-between items-center">
        <div>
          <div className="text-xl font-bold text-gray-800">{name}</div>
          {/* <p className="text-sm text-gray-500">{description}</p> */}
          {/* {creator && (
            <p className="text-xs text-gray-400">
              Created by {creator.name} ({creator.type})
            </p>
          )} */}
        </div>
        <Button
          className="text-sm"
          onClick={handleAction}
          disabled={actionLoading}
        >
          {actionLoading ? "Processing..." : button_text}
        </Button>
      </div>
    </Card>
  );
}
