"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSelector } from "react-redux";

const ApplicantRow = ({ applicant, actionText, onAction }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token, userType } = useSelector((state) => state.auth);

  const handleAction = async () => {
    setLoading(true);
    setError("");

    try {
      let endpoint = "";

      // Determine the endpoint based on actionText
      if (actionText === "Shortlist") {
        endpoint = `/job/${applicant.id}/shortlist`;
      } else if (actionText === "Select") {
        endpoint = `/job/${applicant.id}/select`;
      } else {
        throw new Error("Invalid action");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update applicant status.");
      }

      // Trigger the provided callback after successful action
      if (onAction) {
        onAction(applicant);
      }
    } catch (err) {
      console.error(`[ACTION_${actionText.toUpperCase()}_ERROR]`, err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-[#FFF5EE] flex justify-between items-center p-4 border mb-2">
      <div>
        <p className="font-medium">{applicant.student.name}</p>
      </div>
      <div className="flex gap-2">
        {/* Submission Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-600 text-white hover:bg-gray-700">Submission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Cover Letter */}
              <div>
                <h2 className="text-lg font-bold">Cover Letter</h2>
                <p className="text-gray-700">{applicant.cover_letter}</p>
              </div>
              {/* Additional Files */}
              <div>
                <h2 className="text-lg font-bold">Files</h2>
                {applicant.additional_files.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {applicant.additional_files.map((file, index) => (
                      <li key={index}>
                        <a
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          File {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No files submitted.</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Action Button (Shortlist/Select) */}
        {onAction && actionText && (
          <Button
            onClick={handleAction}
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : actionText}
          </Button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ApplicantRow;
