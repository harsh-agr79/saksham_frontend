'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const RegisteredEvents = () => {
  const { token, userType } = useSelector((state) => state.auth); // Access authentication state
  const [registrations, setRegistrations] = useState([]);
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch registered events from the API
  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/events/registered`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations); // Update the state with fetched registrations
      } else {
        console.error("Failed to fetch registered events.");
        toast({
          title: "Error",
          description: "Failed to fetch registered events. Please try again later.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching registered events:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching registered events.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchRegisteredEvents();
  }, [backendUrl, userType, token, apiKey]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">My Registered Events</h1>
      {registrations.length === 0 ? (
        <p className="text-center text-gray-600">No registered events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((registration) => {
            const event = registration.event;
            const company = event.company;
            return (
              <Card key={registration.id} className="shadow-lg hover:shadow-xl transition-shadow bg-purple-100 rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">{event.title}</CardTitle>
                  <p className="text-sm text-gray-500">{event.type}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p className="text-sm">
                      <strong>Speaker:</strong> {event.speaker}
                    </p>
                    <p className="text-sm">
                      <strong>Date & Time:</strong>{" "}
                      {new Date(event.datetime).toLocaleString()}
                    </p>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <h4 className="text-sm font-bold text-gray-800">Company Details</h4>
                      <p className="text-sm">
                        <strong>Name:</strong> {company.name}
                      </p>
                      <p className="text-sm">
                        <strong>Email:</strong> {company.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="text-black font-semibold py-2 px-4 rounded hover:opacity-90 transition-opacity w-full text-center"
                  >
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Now
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
