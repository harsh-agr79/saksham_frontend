"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditAssignmentDialog } from "@/components/mentor/editAssignment.jsx";

export function AssignmentTable({ assignments }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Track the assignment being edited
  const [dialogOpen, setDialogOpen] = useState(false); // Track dialog state

  // Open dialog and set selected assignment
  const handleEditClick = (assignment) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  // Save updated assignment
  const handleSave = (updatedAssignment) => {
    console.log("Updated Assignment:", updatedAssignment);
    setDialogOpen(false);
  };

  return (
    <div>
      {/* Table */}
      <Table className = "bg-purple-100">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Assignment Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment, index) => (
            <TableRow key={assignment.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{assignment.title}</TableCell>
              <TableCell className="text-right">
                <EditAssignmentDialog
                  assignment={assignment}
                  onSave={handleSave}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
