"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const ApprenticeshipFormDialog = ({ onCreate }) => {
  const { token, userType } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "apprenticeship",
    location: "",
    start_date: "",
    end_date: "",
    application_deadline: "",
    domain_id: "",
    subdomains: "",
    special_requirements: "",
    skills_required: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/job/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            domain_id: parseInt(formData.domain_id, 10),
            subdomains: formData.subdomains.split(",").map(Number),
            skills_required: formData.skills_required.split(","),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create apprenticeship.");
      }

      if (onCreate) {
        onCreate();
        setOpen(false);
      }

      // Reset form state
      setFormData({
        title: "",
        description: "",
        type: "apprenticeship",
        location: "",
        start_date: "",
        end_date: "",
        application_deadline: "",
        domain_id: "",
        subdomains: "",
        special_requirements: "",
        skills_required: "",
      });
    } catch (err) {
      console.error("[CREATE_APPRENTICESHIP_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Apprenticeship</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Apprenticeship</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter Description"
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            />
          </div>

          {/* Application Deadline */}
          <div>
            <Label htmlFor="application_deadline">Application Deadline</Label>
            <Input
              id="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={(e) =>
                setFormData({ ...formData, application_deadline: e.target.value })
              }
            />
          </div>

          {/* Domain ID */}
          <div>
            <Label htmlFor="domain_id">Domain ID</Label>
            <Input
              id="domain_id"
              placeholder="Enter Domain ID"
              value={formData.domain_id}
              onChange={(e) => setFormData({ ...formData, domain_id: e.target.value })}
            />
          </div>

          {/* Subdomains */}
          <div>
            <Label htmlFor="subdomains">Subdomains (comma-separated)</Label>
            <Input
              id="subdomains"
              placeholder="Enter Subdomains"
              value={formData.subdomains}
              onChange={(e) => setFormData({ ...formData, subdomains: e.target.value })}
            />
          </div>

          {/* Special Requirements */}
          <div>
            <Label htmlFor="special_requirements">Special Requirements</Label>
            <textarea
              id="special_requirements"
              placeholder="Enter Special Requirements"
              className="w-full p-2 border rounded"
              value={formData.special_requirements}
              onChange={(e) =>
                setFormData({ ...formData, special_requirements: e.target.value })
              }
            />
          </div>

          {/* Skills Required */}
          <div>
            <Label htmlFor="skills_required">Skills Required (comma-separated)</Label>
            <textarea
              id="skills_required"
              placeholder="Enter Skills Required"
              className="w-full p-2 border rounded"
              value={formData.skills_required}
              onChange={(e) =>
                setFormData({ ...formData, skills_required: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              setFormData({
                title: "",
                description: "",
                type: "apprenticeship",
                location: "",
                start_date: "",
                end_date: "",
                application_deadline: "",
                domain_id: "",
                subdomains: "",
                special_requirements: "",
                skills_required: "",
              })
            }
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.location}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default ApprenticeshipFormDialog;
