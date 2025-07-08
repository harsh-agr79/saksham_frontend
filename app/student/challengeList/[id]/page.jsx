'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { Card } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/student/Timer"; 
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";

const CodingChallengePage = () => {
  const params = useParams();
  const challengeId = params.id;

  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengeActive, setChallengeActive] = useState(false);
  const [solution, setSolution] = useState("");
  const [timer, setTimer] = useState(0);
  const { token } = useSelector((state) => state.auth); // Get token from Redux store

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/getcodingchallenge/${challengeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Data Cant Be shown, Time Exceeded or Already Submitted once");

        const data = await res.json();
        setChallengeData(data);

        // Convert timestamps to milliseconds
        const startTime = new Date(data.startdatetime).getTime();
        const endTime = new Date(data.enddatetime).getTime();
        const currentTime = Date.now();

        if (currentTime < startTime) {
          setChallengeActive(false);
          setTimer((endTime - startTime) / 1000);
        } else if (currentTime < endTime) {
          setChallengeActive(true);
          setTimer((endTime - currentTime) / 1000);
        } else {
          setChallengeActive(false);
          setTimer(0);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [challengeId]);

  useEffect(() => {
    if (timer > 0 && challengeActive) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setChallengeActive(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, challengeActive]);

  const handleEditorChange = (value) => {
    setSolution(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/submit-challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          challenge_id: challengeId,
          code: solution,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit challenge");
      }

      alert("Challenge submitted successfully!");
      setChallengeActive(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl p-6 bg-purple-100 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-black mb-4">Coding Challenge {challengeId}</h2>
        <p className="text-md text-gray-600 mb-4">{challengeData?.description || "Challenge not found."}</p>

        {/* Timer */}
        <Timer remainingTime={Math.max(0, Math.floor(timer))} />

        {/* Monaco Editor */}
        {challengeActive && (
          <Editor
            height="400px"
            language="python"
            value={solution}
            onChange={handleEditorChange}
            theme="vs-dark"
          />
        )}

        {/* Submit Button */}
        {challengeActive && (
          <Button onClick={handleSubmit} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
            Submit Solution
          </Button>
        )}

        {/* If Challenge is Over */}
        {!challengeActive && (
          <p className="mt-4 text-gray-500">
            {timer === 0 ? "Challenge time has ended." : "Challenge has not started yet."}
          </p>
        )}
      </Card>
    </div>
  );
};

export default CodingChallengePage;
