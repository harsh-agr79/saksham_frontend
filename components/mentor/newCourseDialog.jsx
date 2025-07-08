"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NewCourseDialog = ({ onCourseAdded }) => {
  const { userType, token } = useSelector((state) => state.auth);

  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubdomains, setSelectedSubdomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); // State for dialog visibility
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    courseLevel: "",
    courseDomain: "",
    subdomains: [],
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`${backendUrl}/domains`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDomains(data || []);
        } else {
          console.error("Failed to fetch domains");
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [token, backendUrl, apiKey]);

  // Fetch subdomains when domain changes
  useEffect(() => {
    const fetchSubdomains = async () => {
      if (!selectedDomain) return;

      try {
        const response = await fetch(`${backendUrl}/subdomains/${selectedDomain}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubdomains(data || []);
        } else {
          console.error("Failed to fetch subdomains");
        }
      } catch (error) {
        console.error("Error fetching subdomains:", error);
      }
    };

    fetchSubdomains();
  }, [selectedDomain, token, backendUrl, apiKey]);

  // Handle course submission
  const handleSubmit = async () => {
    if (!formData.courseTitle || !formData.courseDomain || selectedSubdomains.length === 0) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/${userType}/course/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.courseTitle,
          description: formData.courseDescription,
          level: formData.courseLevel,
          domain_id: formData.courseDomain,
          subdomains: selectedSubdomains, // Send selected subdomain IDs
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Notify parent component to refresh courses
        if (onCourseAdded) {
          onCourseAdded();
        }

        // Reset the form
        setFormData({
          courseTitle: "",
          courseDescription: "",
          courseLevel: "",
          courseDomain: "",
          subdomains: [],
        });
        setSelectedSubdomains([]);
        setOpen(false); // Close the dialog
      } else {
        setMessage(data.message || "Failed to add course. Please try again.");
      }
    } catch (error) {
      console.error("[ADD_COURSE_ERROR]", error);
      setMessage("An error occurred while adding the course.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle subdomain selection
  const toggleSubdomainSelection = (subdomainId) => {
    setSelectedSubdomains((prev) =>
      prev.includes(subdomainId)
        ? prev.filter((id) => id !== subdomainId)
        : [...prev, subdomainId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          Add new Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Course Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input
              id="courseTitle"
              className="col-span-3"
              placeholder="Enter the Course Title"
              value={formData.courseTitle}
              onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
            />
          </div>

          {/* Course Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseDescription">Course Description</Label>
            <Input
              id="courseDescription"
              className="col-span-3"
              placeholder="Enter the Course Description"
              value={formData.courseDescription}
              onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
            />
          </div>

          {/* Course Level */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseLevel">Course Level</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, courseLevel: value })}
            >
              <SelectTrigger id="courseLevel">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Domain */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseDomain">Course Domain</Label>
            <Select
              onValueChange={(value) => {
                setSelectedDomain(value);
                setFormData({ ...formData, courseDomain: value });
              }}
            >
              <SelectTrigger id="courseDomain">
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Course Sub-Domains (Multi-Select) */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="courseSubDomain">Course Sub-Domains</Label>
            <div className="col-span-3 space-y-2">
              {subdomains.map((subdomain) => (
                <div key={subdomain.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`subdomain-${subdomain.id}`}
                    value={subdomain.id}
                    checked={selectedSubdomains.includes(subdomain.id)}
                    onChange={() => toggleSubdomainSelection(subdomain.id)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={`subdomain-${subdomain.id}`} className="text-sm">
                    {subdomain.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Course"}
          </Button>
        </DialogFooter>
        {message && <p className="text-red-600 mt-2">{message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default NewCourseDialog;
