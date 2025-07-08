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

const EventTable = ({ events }) => {
  return (
    <div className="bg-[#FFF5EE] overflow-x-auto border rounded-md shadow-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold text-left">Event Type</TableCell>
            <TableCell className="font-bold text-left">Title</TableCell>
            <TableCell className="font-bold text-left">Description</TableCell>
            <TableCell className="font-bold text-left">Date & Time</TableCell>
            <TableCell className="font-bold text-left">Link</TableCell>
            <TableCell className="font-bold text-left">Speaker/Host</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="text-sm">{event.type}</TableCell>
                <TableCell className="text-sm">{event.title}</TableCell>
                <TableCell className="text-sm">{event.description || "N/A"}</TableCell>
                <TableCell className="text-sm">
                  {new Date(event.datetime).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Link
                  </a>
                </TableCell>
                <TableCell className="text-sm">{event.speaker || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No events listed yet. Add a new event to get started!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventTable;
