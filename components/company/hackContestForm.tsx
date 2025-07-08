"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EventFormProps {
  eventType: string;
  onCreate: (event: EventData) => void;
}

interface EventData {
  id: number;
  title: string;
  description: string;
  problemStatement: string;
  evaluationCriteria: string;
  eligibility: string;
  startDateTime: string;
  endDateTime: string;
}

const EventForm: React.FC<EventFormProps> = ({ eventType, onCreate }) => {
  const [formData, setFormData] = useState<Omit<EventData, "id">>({
    title: "",
    description: "",
    problemStatement: "",
    evaluationCriteria: "",
    eligibility: "",
    startDateTime: "",
    endDateTime: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ ...formData, id: Date.now() });
    setFormData({
      title: "",
      description: "",
      problemStatement: "",
      evaluationCriteria: "",
      eligibility: "",
      startDateTime: "",
      endDateTime: "",
    });
  };

  return (
    <div className="p-6 border rounded-md bg-[#FFF5EE]">
      <h2 className="text-xl font-bold">Post Hackathons/Contests</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={`Enter ${eventType.slice(0, -1)} title`}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        <div>
          <Label htmlFor="problemStatement">Problem Statement</Label>
          <Textarea
            id="problemStatement"
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            placeholder="Enter problem statement"
          />
        </div>
        <div>
          <Label htmlFor="evaluationCriteria">Evaluation Criteria</Label>
          <Textarea
            id="evaluationCriteria"
            name="evaluationCriteria"
            value={formData.evaluationCriteria}
            onChange={handleChange}
            placeholder="Enter evaluation criteria"
          />
        </div>
        <div>
          <Label htmlFor="eligibility">Eligibility</Label>
          <Input
            id="eligibility"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            placeholder="Enter eligibility criteria"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDateTime">Start Date & Time</Label>
            <Input
              id="startDateTime"
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="endDateTime">End Date & Time</Label>
            <Input
              id="endDateTime"
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit">Create {eventType.slice(0, -1)}</Button>
      </form>
    </div>
  );
};

export default EventForm;
