"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const HackathonContestListing = () => {
  const router = useRouter();
  const { token, userType } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/hack-contests/unregistered`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.hack_contests);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch events. Please try again later.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching events.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [backendUrl, userType, token, apiKey]);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  const handleConfirmRegistration = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(
        `${backendUrl}/${userType}/hack-contests/${selectedEvent.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: `You have successfully registered for ${selectedEvent.title}.`,
          status: "success",
          duration: 3000,
        });
        setSelectedEvent(null);
        await fetchEvents(); // Refetch events after registration
      } else {
        const errorData = await response.json();
        toast({
          title: "Registration Failed",
          description: errorData.message || "Failed to register for the event.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration.",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleMyContestsClick = () => {
    router.push("/student/myHackContest");
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Hackathons & Contests</h1>
        <Button onClick={handleMyContestsClick} className="bg-purple-600 text-white">
          My Contests
        </Button>
      </div>

      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-purple-100 p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            <div className="mt-4 text-sm space-y-2">
              <p>
                <strong>Problem Statement:</strong> {event.problem_statement}
              </p>
              <p>
                <strong>Evaluation Criteria:</strong> {event.evaluation_criteria}
              </p>
              <p>
                <strong>Eligibility:</strong> {event.eligibility}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(event.start_date_time).toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(event.end_date_time).toLocaleString()}
              </p>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold text-gray-800">Organized By</h3>
              <p className="text-sm">
                <strong>Name:</strong> {event.company.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {event.company.email}
              </p>
            </div>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="text-black bg-purple-100 w-full py-2 rounded-lg hover:opacity-90 transition-opacity"
                    onClick={() => handleRegisterClick(event)}
                  >
                    Register Now
                  </Button>
                </DialogTrigger>
                {selectedEvent?.id === event.id && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Registration</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p>
                        Are you sure you want to register for{" "}
                        <strong>{event.title}</strong>?
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-green-600 text-white"
                        onClick={handleConfirmRegistration}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonContestListing;
