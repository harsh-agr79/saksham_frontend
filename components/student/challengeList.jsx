'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";


const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth); // Get token from localStorage

  const router = useRouter();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/getcodingchallenges`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const data = await res.json();
        setChallenges(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleShowChallenge = (id) => {
    router.push(`/student/challengeList/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">List of Coding Challenges</h1>

      {loading && <p className="text-center">Loading challenges...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Challenge Title</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {challenges.length > 0 ? (
                challenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b border-gray-100">
                    <td className="py-2 px-4 capitalize">{challenge.title}</td>
                    <td className="py-2 px-4">
                      <Button
                        onClick={() => handleShowChallenge(challenge.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Show Challenge
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No challenges found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;
