"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AddEventDialog = ({ onAddEvent, eventTypes }) => {
  const [open, setOpen] = useState(false);
  const { token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    link: "",
    datetime: "",
    speaker: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleAddEvent = async () => {
    if (
      !formData.type ||
      !formData.title ||
      !formData.link ||
      !formData.datetime ||
      !formData.speaker ||
      !formData.description
    ) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/${userType}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Notify parent component and reset form
        if (onAddEvent) {
          onAddEvent(data);
        }
        setFormData({
          type: "",
          title: "",
          link: "",
          datetime: "",
          speaker: "",
          description: "",
        });
        setOpen(false);
      } else {
        setMessage(data.message || "Failed to add event.");
      }
    } catch (error) {
      console.error("[ADD_EVENT_ERROR]", error);
      setMessage("An error occurred while adding the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Event Type */}
          <div>
            <Label htmlFor="type">Event Type</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>
                Select event type
              </option>
              {eventTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Event Title */}
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter event title"
            />
          </div>

          {/* Event Link */}
          <div>
            <Label htmlFor="link">Event Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              placeholder="Enter GMeet or YouTube link"
            />
          </div>

          {/* Event Date & Time */}
          <div>
            <Label htmlFor="datetime">Date & Time</Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, datetime: e.target.value }))
              }
            />
          </div>

          {/* Speaker/Host Name */}
          <div>
            <Label htmlFor="speaker">Speaker/Host Name</Label>
            <Input
              id="speaker"
              value={formData.speaker}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, speaker: e.target.value }))
              }
              placeholder="Enter speaker or host name"
            />
          </div>

          {/* Event Description */}
          <div>
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter a brief description of the event"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddEvent}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Adding..." : "Add Event"}
          </Button>
        </DialogFooter>
        {message && <p className="text-red-600 mt-2">{message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
