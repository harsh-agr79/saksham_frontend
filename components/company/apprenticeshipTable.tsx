'use client';

import { Button } from "@/components/ui/button";

// Define the type for a single apprenticeship
interface Apprenticeship {
  id: number;
  title: string;
  location: string;
}

// Define the props for the ApprenticeshipTable component
interface ApprenticeshipTableProps {
  apprenticeships: Apprenticeship[];
  onManage: (id: number) => void;
}

const ApprenticeshipTable: React.FC<ApprenticeshipTableProps> = ({ apprenticeships, onManage }) => {
  if (!apprenticeships || apprenticeships.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No apprenticeships available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6 bg-[#FFF5EE]">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-4 text-left">ID</th>
            <th className="border border-gray-300 p-4 text-left">Title</th>
            <th className="border border-gray-300 p-4 text-left">Location</th>
            <th className="border border-gray-300 p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apprenticeships.map((apprenticeship) => (
            <tr key={apprenticeship.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-4">{apprenticeship.id}</td>
              <td className="border border-gray-300 p-4">{apprenticeship.title}</td>
              <td className="border border-gray-300 p-4">{apprenticeship.location}</td>
              <td className="border border-gray-300 p-4">
                <Button
                  onClick={() => onManage(apprenticeship.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Manage
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprenticeshipTable;
