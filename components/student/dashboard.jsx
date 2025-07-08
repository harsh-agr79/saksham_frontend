'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // Use recharts for graph

const Dashboard = () => {
  const [streak, setStreak] = useState(5); // Example coding streak
  const challengesCompleted = 10;
  const totalChallenges = 50;

  // Example data for graph (coding streak progress)
  const data = [
    { day: 'Mon', challenges: 5 },
    { day: 'Tue', challenges: 2 },
    { day: 'Wed', challenges: 6 },
    { day: 'Thu', challenges: 4 },
    { day: 'Fri', challenges: 7 },
    { day: 'Sat', challenges: 5 },
    { day: 'Sun', challenges: 4 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome back, Harshit!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Profile & Progress Card */}
        <Card className="p-6 shadow-lg bg-purple-100 rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <p className="text-gray-600">Coding Streak: {streak} days</p>
          <p className="text-gray-600 mb-4">Challenges Completed: {challengesCompleted}/{totalChallenges}</p>
          <Progress value={(challengesCompleted / totalChallenges) * 100} className="w-full mb-4" />
          
          {/* Graph showing coding streak progress */}
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="challenges" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recommended Challenges Card */}
        <Card className="p-6 shadow-lg bg-purple-100 rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Recommended Challenges</h2>
          <ul className="space-y-4 w-full">
            <li className="flex justify-between w-full">
              <span>Challenge 1: Reverse a String</span>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start</Button>
            </li>
            <li className="flex justify-between w-full">
              <span>Challenge 2: Find Maximum in Array</span>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start</Button>
            </li>
            <li className="flex justify-between w-full">
              <span>Challenge 3: Binary Search</span>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start</Button>
            </li>
          </ul>
        </Card>

        {/* Learning Path Card */}
        <Card className="p-6 shadow-lg bg-purple-100 rounded-lg flex flex-col items-center">
          <h2 className="text-xl  font-semibold mb-4">Your Learning Path</h2>
          <p className="text-gray-600 mb-2 text-center">You're on Module 3: Algorithms</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Continue Learning</Button>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;
