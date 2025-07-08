"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/leetcode/leetcode.json");
        const data = await response.json();
        setProblems(data);
        setFilteredProblems(data);
      } catch (error) {
        console.error("Failed to fetch problem data", error);
      }
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    let filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(search.toLowerCase())
    );

    if (difficultyFilter !== "All") {
      filtered = filtered.filter((problem) => problem.difficulty === difficultyFilter);
    }
    setFilteredProblems(filtered);
  }, [search, difficultyFilter, problems]);

  return (
    <div className="bg-purple-100 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">DSA Problems</h1>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="bg-purple-100 shadow-md rounded-lg p-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <div key={problem.id} className="p-4 border-b last:border-none">
              <h2 className="text-xl font-bold">{problem.title}</h2>
              <p className="text-gray-700 text-sm mb-2">{problem.problem_description.substring(0, 150)}...</p>
              <p className="text-sm text-gray-500">Difficulty: {problem.difficulty}</p>
              <p className="text-sm text-gray-500">Tags: {problem.topic_tags.replace(/'/g, "")}</p>
              <Link href={`/student/DSA/${problem.id}`}>
                <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded">Try Problem</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No problems found.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemsList;
