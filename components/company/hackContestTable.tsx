"use client";

import React from "react";

interface Event {
  id: string;
  title: string;
  start_date_time: string;
  end_date_time: string;
}

interface EventTableProps {
  title: string;
  events: Event[];
  onManage: (id: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({ title, events, onManage }) => {
  return (
    <div className="bg-[#FFF5EE] p-6 border rounded-md mb-8">
      <h2 className="text-xl font-bold">Hackathons/Contests</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="border border-gray-300 px-4 py-2">{event.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {event.start_date_time}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {event.end_date_time}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => onManage(event.id)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
