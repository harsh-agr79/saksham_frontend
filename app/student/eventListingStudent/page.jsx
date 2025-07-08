"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // ShadCN toast for notifications
import { useSelector } from "react-redux";

const EventListingStudent = () => {
  const { token, userType } = useSelector((state) => state.auth); // Access authentication state
  const [events, setEvents] = useState([]);
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/events/unregistered`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      } else {
        console.error("Failed to fetch events.");
        toast({
          title: "Error",
          description: "Failed to fetch events. Please try again later.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
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
  }, [backendUrl, userType, token, apiKey, toast]);

  // Handle event registration
  const handleRegister = async (eventId, eventTitle) => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Registered successfully",
          description: `You have registered for the event: ${eventTitle}`,
          status: "success",
          duration: 3000,
        });
        await fetchEvents(); // Fetch updated events after successful registration
      } else {
        const errorData = await response.json();
        console.error("Failed to register for event:", errorData);
        toast({
          title: "Registration Failed",
          description: errorData.message || "Failed to register for the event.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Error",
        description: "An error occurred while registering for the event.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={index} className="border bg-purple-100 shadow-md">
            <CardHeader>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.type}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(event.datetime).toLocaleString()}
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {event.link}
                </a>
              </p>
              <p>
                <strong>Organized By:</strong> {event.organizedBy}
              </p>
              <p>
                <strong>Speaker/Host:</strong> {event.speaker}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegister(event.id, event.title)}>
                Register
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventListingStudent;
