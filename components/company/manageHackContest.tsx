"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ManageEventDialogProps, Event } from "@/components/company/hackContestData";

const ManageEventDialog: React.FC<ManageEventDialogProps> = ({
  eventType,
  eventData,
  onSave,
}) => {
  const [formData, setFormData] = useState<Event>(eventData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (onSave && typeof onSave === "function") {
      onSave(formData);
    } else {
      console.error("onSave prop is not provided or not a function.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Manage Hackathons/Contests
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-4 rounded-lg">
        <DialogHeader>
          <DialogTitle>Manage Hackathons/Contests</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={`Enter ${eventType} title`}
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
        </form>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageEventDialog;
