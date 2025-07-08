"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // For notifications

const ManageHackathon = () => {
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("id");

  const { token, userType } = useSelector((state) => state.auth);
  const [hackathon, setHackathon] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState("");
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch Hackathon Details and Submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/${userType}/hack-contests/${hackathonId}/submissions`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHackathon({
          title: data.hackathon?.title,
          description: data.hackathon?.description,
          problem_statement: data.hackathon?.problem_statement,
          evaluation_criteria: data.hackathon?.evaluation_criteria,
          eligibility: data.hackathon?.eligibility,
        });
        setSubmissions(data.submissions || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch submissions.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching submissions.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Save Marks
  const handleSaveMarks = async () => {
    if (!selectedSubmission) return;

    try {
      const response = await fetch(
        `${backendUrl}/${userType}/hack-contests/submissions/${selectedSubmission.id}/evaluate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ marks }),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: `Marks saved successfully for the submission.`,
          status: "success",
          duration: 3000,
        });
        setSubmissions((prev) =>
          prev.map((submission) =>
            submission.id === selectedSubmission.id
              ? { ...submission, marks }
              : submission
          )
        );
        setSelectedSubmission(null);
      } else {
        toast({
          title: "Error",
          description: "Failed to save marks.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving marks.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (hackathonId) {
      fetchSubmissions();
    }
  }, [hackathonId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Hackathon</h1>

      {/* hackathon && (
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold">{hackathon.title}</h2>
          <p className="text-sm text-gray-600">{hackathon.description}</p>
          <p className="text-sm">
            <strong>Problem Statement:</strong> {hackathon.problem_statement}
          </p>
          <p className="text-sm">
            <strong>Evaluation Criteria:</strong> {hackathon.evaluation_criteria}
          </p>
          <p className="text-sm">
            <strong>Eligibility:</strong> {hackathon.eligibility}
          </p>
        </div>
      ) */}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Student Submissions</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Link</th>
              <th className="border border-gray-300 px-4 py-2">Marks</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {submission.student_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {submission.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={submission.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Submission
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {submission.marks !== null ? submission.marks : "Not Evaluated"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setMarks(submission.marks || "");
                          }}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Evaluate
                        </button>
                      </DialogTrigger>
                      {selectedSubmission?.id === submission.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Evaluate Submission</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>
                              Evaluating submission for{" "}
                              <strong>{submission.student_id}</strong>
                            </p>
                            <Input
                              type="number"
                              placeholder="Enter marks"
                              value={marks}
                              onChange={(e) => setMarks(e.target.value)}
                            />
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSaveMarks}>Save Marks</Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No submissions found for this hackathon.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHackathon;
