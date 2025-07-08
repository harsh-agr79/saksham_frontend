"use client";

import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux"; // For auth state
import { useToast } from "@/hooks/use-toast"; // For notifications

const MyHackContest = () => {
  const { token, userType } = useSelector((state) => state.auth); // Authentication state
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState({
    description: "",
    link: "",
  });
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch registered hack contests
  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`${backendUrl}/${userType}/hack-contests/registered`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.hack_contests);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch registered hack contests. Please try again later.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching hack contests.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Submit details for a hack contest
  const handleSubmit = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(
        `${backendUrl}/${userType}/hack-contests/${selectedEvent.hack_contest.id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submissionDetails),
        }
      );

      if (response.ok) {
        toast({
          title: "Submission Successful",
          description: `Your submission for ${selectedEvent.hack_contest.title} has been saved.`,
          status: "success",
          duration: 3000,
        });
        setSubmissionDetails({ description: "", link: "" });
        setSelectedEvent(null); // Close dialog
        await fetchRegistrations(); // Refetch registrations to update submission status
      } else {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: errorData.message || "Failed to submit details. Please try again.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting details.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Fetch registrations on component mount
  useEffect(() => {
    fetchRegistrations();
  }, [backendUrl, userType, token, apiKey]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        My Registered Hackathons and Contests
      </h1>

      {registrations.length === 0 ? (
        <p className="text-center text-gray-600">No registered hack contests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((registration) => {
            const event = registration.hack_contest;
            const company = event.company;

            return (
              <div
                key={registration.id}
                className="p-6 bg-purple-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Problem Statement:</strong> {event.problem_statement}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Evaluation Criteria:</strong> {event.evaluation_criteria}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Eligibility:</strong> {event.eligibility}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Start Date:</strong>{" "}
                  {new Date(event.start_date_time).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>End Date:</strong>{" "}
                  {new Date(event.end_date_time).toLocaleString()}
                </p>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-bold text-gray-800">Organized By</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {company.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {company.email}
                  </p>
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={registration.has_submitted}
                        className={`${
                          registration.has_submitted
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "text-white hover:opacity-90"
                        } w-full py-2 rounded-lg`}
                        onClick={() => setSelectedEvent(registration)}
                      >
                        {registration.has_submitted ? "Already Submitted" : "Submit"}
                      </Button>
                    </DialogTrigger>
                    {!registration.has_submitted && selectedEvent?.id === registration.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit for {event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Describe your submission"
                            value={submissionDetails.description}
                            onChange={(e) =>
                              setSubmissionDetails((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                          <Input
                            placeholder="Add file link"
                            value={submissionDetails.link}
                            onChange={(e) =>
                              setSubmissionDetails((prev) => ({
                                ...prev,
                                link: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white w-full"
                          >
                            Submit
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyHackContest;
