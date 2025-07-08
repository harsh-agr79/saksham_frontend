"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SubmissionDialog = ({
  coverLetter,
  files,
}: {
  coverLetter: string;
  files: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Submission</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submission</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Cover Letter Section */}
          <div>
            <h2 className="text-lg font-bold">Cover Letter</h2>
            <p className="text-gray-700">{coverLetter}</p>
          </div>

          {/* Files Section */}
          <div>
            <h2 className="text-lg font-bold">Files</h2>
            {files && files.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file}
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
  );
};

export default SubmissionDialog;
