"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NewEventDialog = ({ onEventAdded }) => {
  const { token, userType } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problem_statement: "",
    evaluation_criteria: "",
    eligibility: "",
    start_date_time: "",
    end_date_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSubmit = async () => {
    if (!formData.title || !formData.start_date_time || !formData.end_date_time) {
      setMessage("Title, Start Date & Time, and End Date & Time are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/${userType}/hack-contests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          problem_statement: formData.problem_statement || null,
          evaluation_criteria: formData.evaluation_criteria || null,
          eligibility: formData.eligibility || null,
          start_date_time: formData.start_date_time,
          end_date_time: formData.end_date_time,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (onEventAdded) {
          onEventAdded(data);
        }
        setFormData({
          title: "",
          description: "",
          problem_statement: "",
          evaluation_criteria: "",
          eligibility: "",
          start_date_time: "",
          end_date_time: "",
        });
        setOpen(false);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add event.");
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
        <Button>Add New Hackathon / Contest</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Hackathon / Contest</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new event.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter the event title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter the event description (optional)"
            />
          </div>
          <div>
            <Label htmlFor="problem_statement">Problem Statement</Label>
            <Textarea
              id="problem_statement"
              value={formData.problem_statement}
              onChange={(e) =>
                setFormData({ ...formData, problem_statement: e.target.value })
              }
              placeholder="Describe the problem statement (optional)"
            />
          </div>
          <div>
            <Label htmlFor="evaluation_criteria">Evaluation Criteria</Label>
            <Textarea
              id="evaluation_criteria"
              value={formData.evaluation_criteria}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  evaluation_criteria: e.target.value,
                })
              }
              placeholder="Specify evaluation criteria (optional)"
            />
          </div>
          <div>
            <Label htmlFor="eligibility">Eligibility</Label>
            <Textarea
              id="eligibility"
              value={formData.eligibility}
              onChange={(e) =>
                setFormData({ ...formData, eligibility: e.target.value })
              }
              placeholder="Specify eligibility criteria (optional)"
            />
          </div>
          <div>
            <Label htmlFor="start_date_time">Start Date & Time</Label>
            <Input
              id="start_date_time"
              type="datetime-local"
              value={formData.start_date_time}
              onChange={(e) =>
                setFormData({ ...formData, start_date_time: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="end_date_time">End Date & Time</Label>
            <Input
              id="end_date_time"
              type="datetime-local"
              value={formData.end_date_time}
              onChange={(e) =>
                setFormData({ ...formData, end_date_time: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
        {message && <p className="text-red-600 mt-2">{message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default NewEventDialog;
