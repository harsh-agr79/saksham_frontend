'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const RoadmapTable = () => {
  const roadmaps = [
    // "ai-data-scientist",
    "android",
    "frontend",
    "react",
    "angular",
    // "javascript",
    "typescript",
    "vue",
    "ux-design",
    "backend",
    "nodejs",
    "python",
    "full-stack",
    "game-developer",
    "server-side-game-developer",
    "blockchain",
    "mlops",
    "computer-science",
    "system-design",
    "cyber-security",
    "sql",
    "postgresql-dba",
    "devops",
    "qa",
    "software-architect",
    "technical-writer",
  ];

  const router = useRouter();

  // Function to handle navigation to the roadmap page
  const handleShowRoadmap = (roadmap) => {
    router.push(`/student/roadmaps/${roadmap}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Roadmaps</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Roadmap</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.map((roadmap) => (
              <tr key={roadmap} className="border-b border-gray-700">
                <td className="py-2 px-4 capitalize">{roadmap.replace(/-/g, ' ')}</td>
                <td className="py-2 px-4">
                  <Button
                    onClick={() => handleShowRoadmap(roadmap)}
                    className="text-white bg-purple-500 hover:bg-purple-600"
                  >
                    Show Roadmap
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoadmapTable;
