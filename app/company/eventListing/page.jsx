"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // For authentication state
import EventTable from "@/components/company/eventTable";
import AddEventDialog from "@/components/company/addEventDialog";

const EventListingPage = () => {
  const { token, userType } = useSelector((state) => state.auth); // Access token and userType
  const [events, setEvents] = useState([]);
  const [customEventTypes, setCustomEventTypes] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Default Event Types
  const eventTypes = [
    "Webinar",
    "Live Mentoring Session",
    "Talk on Specific Topic",
    "Workshop",
    "Bootcamp",
    "Guest Lecture",
    "Tech Talk",
    "Internship Drive",
    ...customEventTypes,
  ];

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/events`, {
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
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Initial fetch on page load
  useEffect(() => {
    fetchEvents();
  }, [backendUrl, userType, token, apiKey]);

  // Add a custom event type
  const handleAddCustomEventType = (type) => {
    if (type && !eventTypes.includes(type)) {
      setCustomEventTypes((prev) => [...prev, type]);
    }
  };

  // Add a new event via API
  const handleAddEvent = async (newEvent, closeDialog) => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
  
      console.log("Response status:", response.status);
  
      if (response.ok) {
        console.log("Event added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to add event:", errorData.details);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      await fetchEvents(); // Always fetch the updated list of events
      if (closeDialog) closeDialog(); // Close the dialog if provided
    }
  };
  


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Event Listing</h1>
        <p className="text-gray-600 mt-2">
          Manage and view your registered events, including descriptions.
        </p>
      </div>

      {/* Add Event Button */}
      <div className="flex justify-end">
        <AddEventDialog
          onAddEvent={handleAddEvent}
          onAddCustomEventType={handleAddCustomEventType}
          eventTypes={eventTypes}
        />
      </div>

      {/* Event Table */}
      <EventTable events={events} />
    </div>
  );
};

export default EventListingPage;
