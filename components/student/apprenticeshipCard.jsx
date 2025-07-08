"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ApprenticeshipCard = ({ apprenticeship }) => {
  const {
    id,
    title,
    description,
    location,
    type,
    start_date,
    end_date,
    application_deadline,
    skills_required,
    special_requirements,
  } = apprenticeship;

  const { token, userType } = useSelector((state) => state.auth); // Fetch token from Redux
  const [coverLetter, setCoverLetter] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAdditionalFilesChange = (e) => {
    if (e.target.files) {
      setAdditionalFiles([...additionalFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleApply = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("cover_letter", coverLetter);
    additionalFiles.forEach((file) => {
      formData.append("additional_files[]", file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/job/${id}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application.");
      }

      setSuccessMessage("Application submitted successfully!");
      setCoverLetter("");
      setAdditionalFiles([]);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-[#FFF5EE]">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Application Deadline:</strong> {new Date(application_deadline).toLocaleDateString()}
        </p>
        <p>
          <strong>Special Requirements:</strong> {special_requirements}
        </p>
      </div>
      <div className="mb-4">
        <strong>Skills Required:</strong>
        <ul className="list-disc pl-6 text-gray-600">
          {skills_required.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Apply Now</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                rows={4}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Write your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="additional_files" className="block text-sm font-medium text-gray-700">
                Upload Additional Files
              </label>
              <input
                id="additional_files"
                type="file"
                multiple
                className="w-full mt-2"
                onChange={handleAdditionalFilesChange}
              />
              {additionalFiles.length > 0 && (
                <ul className="mt-2 list-disc pl-6 text-gray-600">
                  {additionalFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleApply} disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprenticeshipCard;
