"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EnvironmentTable = ({ environments }) => {
  const handleCopyLink = (id) => {
    const link = `https://sih-saksham.vercel.app/3denv/${id}`;
    
    // Check if Clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        // alert(`Link copied to clipboard: ${link}`);
      }).catch((err) => {
        console.error("Failed to copy text: ", err);
        // alert("Failed to copy the link. Please try again.");
      });
    } else {
      // Fallback for unsupported environments
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom
      textArea.style.left = "-9999px"; // Move off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        // alert(`Link copied to clipboard: ${link}`);
      } catch (err) {
        console.error("Fallback: Failed to copy text: ", err);
        // alert("Failed to copy the link. Please try again.");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };
  
  return (
    <div className=" bg-[#FFF5EE] overflow-x-auto border rounded-md shadow-sm">
      <Table>
        {/* Table Head */}
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold text-left">Title</TableCell>
            <TableCell className="font-bold text-left">3D Objects</TableCell>
            <TableCell className="font-bold text-left">Created At</TableCell>
            <TableCell className="font-bold text-left">Copy Link</TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {environments.map((env) => (
            <TableRow key={env.id}>
              <TableCell className="align-top">{env.title}</TableCell>
              <TableCell className="align-top">
                <ul className="space-y-2">
                  {env.objects.map((obj) => (
                    <li key={obj.id} className="flex items-center space-x-2">
                      <span>{obj.name}</span>
                      <a
                        href={obj.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="align-top">
                {new Date(env.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="align-top">
                <button
                  onClick={() => handleCopyLink(env.id)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Copy Link
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* No Data Message */}
      {environments.length === 0 && (
        <p className="text-center p-4 text-gray-500">No environments available.</p>
      )}
    </div>
  );
};

export default EnvironmentTable;
