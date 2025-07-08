"use client";

import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { compileCode } from "@/actions/compile";
// Dummy game data
const gameFiles = [
  {
    id: "security-hacking",
    title: "Security Hacking",
    challenges: [
      {
        level: 1,
        title: "Firewall Breach",
        description: "Find the weakest security node in the firewall.",
        task: "Return the index of the lowest number in a list.",
        data: "[9, 7, 4, 8, 2, 6]",
        defaultCode: "function solve(data) {\n  return data.indexOf(Math.min(...data));\n}",
        solution: "4", // Expected Output
        xp: 50,
      },
      {
        level: 2,
        title: "Decrypt NeuroCorp’s Code",
        description: "Reverse an encrypted string.",
        task: "Write a function to reverse a string.",
        data: "gnidoc evol I",
        defaultCode: 'function solve(data) {\n  return data.split("").reverse().join("");\n}',
        solution: '"I love coding"', // Expected Output
        xp: 75,
      },
      {
        level: 3,
        title: "Data Encryption",
        description: "Encrypt a string by shifting each character by 1 in the alphabet.",
        task: "Write a function to shift each character in a string by 1.",
        data: "hello",
        defaultCode: "function solve(data) {\n  return data.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');\n}",
        solution: '"ifmmp"', // Expected Output
        xp: 100,
      }
    ]
  },
  {
    id: "data-science",
    title: "Data Science",
    challenges: [
      {
        level: 1,
        title: "Matrix Sum",
        description: "Find the sum of all elements in a 2D matrix.",
        task: "Write a function to sum all elements in a 2D array.",
        data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        defaultCode: "function solve(data) {\n  return data.flat().reduce((sum, num) => sum + num, 0);\n}",
        solution: "45", // Expected Output
        xp: 50,
      },
      {
        level: 2,
        title: "Array Sorting",
        description: "Sort an array of numbers in ascending order.",
        task: "Write a function to sort an array of numbers.",
        data: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
        defaultCode: "function solve(data) {\n  return data.sort((a, b) => a - b);\n}",
        solution: "[1,1,2,3,3,4,5,5,5,6,9]", // Expected Output
        xp: 75,
      },
      {
        level: 3,
        title: "Prime Number Finder",
        description: "Find the nth prime number.",
        task: "Write a function to find the nth prime number.",
        data: 5,
        defaultCode: "function solve(data) {\n  function isPrime(num) {\n    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)\n      if (num % i === 0) return false;\n    return num > 1;\n  }\n  let count = 0, num = 2;\n  while (count < data) {\n    if (isPrime(num)) count++;\n    num++;\n  }\n  return num - 1;\n}",
        solution: "11", // Expected Output
        xp: 100,
      },
      {
        level: 4,
        title: "Data Filtering",
        description: "Filter out all even numbers from an array.",
        task: "Write a function to filter even numbers.",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        defaultCode: "function solve(data) {\n  return data.filter(num => num % 2 === 0);\n}",
        solution: "[2,4,6,8,10]", // Expected Output
        xp: 125,
      },
      {
        level: 5,
        title: "Data Aggregation",
        description: "Calculate the average of an array of numbers.",
        task: "Write a function to calculate the average.",
        data: [10, 20, 30, 40, 50],
        defaultCode: "function solve(data) {\n  return data.reduce((sum, num) => sum + num, 0) / data.length;\n}",
        solution: "30", // Expected Output
        xp: 150,
      },
    ],
  },
  {
    id: "algorithm-mastery",
    title: "Algorithm Mastery",
    challenges: [
      {
        level: 1,
        title: "Fibonacci Sequence",
        description: "Generate the nth Fibonacci number.",
        task: "Write a function to generate the nth Fibonacci number.",
        data: 6,
        defaultCode: "function solve(data) {\n  if (data <= 1) return data;\n  return solve(data - 1) + solve(data - 2);\n}",
        solution: "8", // Expected Output
        xp: 50,
      },
      {
        level: 2,
        title: "Binary Search",
        description: "Implement a binary search algorithm.",
        task: "Write a function to perform binary search on a sorted array.",
        data: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 7 },
        defaultCode: "function solve(data) {\n  let left = 0, right = data.array.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (data.array[mid] === data.target) return mid;\n    if (data.array[mid] < data.target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
        solution: "6", // Expected Output
        xp: 75,
      },
      {
        level: 3,
        title: "String Compression",
        description: "Compress a string by counting consecutive characters.",
        task: "Write a function to compress a string.",
        data: "aabcccccaaa",
        defaultCode: "function solve(data) {\n  let compressed = '';\n  let count = 1;\n  for (let i = 0; i < data.length; i++) {\n    if (data[i] === data[i + 1]) {\n      count++;\n    } else {\n      compressed += data[i] + count;\n      count = 1;\n    }\n  }\n  return compressed.length < data.length ? compressed : data;\n}",
        solution: '"a2b1c5a3"', // Expected Output
        xp: 100,
      },
      {
        level: 4,
        title: "Palindrome Checker",
        description: "Check if a string is a palindrome.",
        task: "Write a function to check if a string is a palindrome.",
        data: "racecar",
        defaultCode: "function solve(data) {\n  return data === data.split('').reverse().join('');\n}",
        solution: "true", // Expected Output
        xp: 125,
      },
      {
        level: 5,
        title: "Anagram Checker",
        description: "Check if two strings are anagrams of each other.",
        task: "Write a function to check if two strings are anagrams.",
        data: { str1: "listen", str2: "silent" },
        defaultCode: "function solve(data) {\n  const normalize = (str) => str.split('').sort().join('');\n  return normalize(data.str1) === normalize(data.str2);\n}",
        solution: "true", // Expected Output
        xp: 150,
      },
    ],
  },
];

export default function Game() {
  const [games, setGames] = useState(gameFiles); // Stores all game data
  const [currentGame, setCurrentGame] = useState(null); // Current selected game
  const [level, setLevel] = useState(0); // Current level
  const [code, setCode] = useState(""); // Code in the editor
  const [message, setMessage] = useState(""); // Feedback message
  const [output, setOutput] = useState(""); // Code execution output
  const [xp, setXp] = useState(0); // Total XP earned

  // Load the first game by default on component mount
  useEffect(() => {
    setCurrentGame(games[0]); // Set the first game as default
    setCode(games[0].challenges[0].defaultCode); // Set default code for the first level
  }, [games]);

  // Run the code and check the solution
  async function executeCode() {
    // setLoading(true);

    // await contribute(); // Call contribute function before execution

    const requestData = {
      language: "javascript",
      version: "18.15.0", // Use a proper version if required
      files: [{ content: `${code}\nconsole.log(solve(${JSON.stringify(currentGame.challenges[level].data)}))`}],
    };

    console.log(requestData);

    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output.split("\n"));
      var op = result.run.output.split("\n")
      console.log(op[0], currentGame.challenges[level].solution);
      if (op[0] === currentGame.challenges[level].solution) {
        setMessage(`✅ Correct! +${currentGame.challenges[level].xp} XP`);
        setXp((prevXp) => prevXp + currentGame.challenges[level].xp);
      
        // Move to next level if possible
        if (level + 1 < currentGame.challenges.length) {
          setLevel(level + 1);
          setCode(currentGame.challenges[level + 1].defaultCode);
        } else {
          setMessage("🎉 You completed all levels!");
        }
      } else {
        setMessage("❌ Incorrect. Try again.");
      }
    } catch (error) {
      console.log(error)
    }
  }


  // Switch to a different game
  const switchGame = (gameId) => {
    const newGame = games.find((game) => game.id === gameId);
    setCurrentGame(newGame);
    setLevel(0);
    setCode(newGame.challenges[0].defaultCode);
    setMessage("");
    setOutput("");
  };

  if (!currentGame) {
    return <div>Loading games...</div>; // Show loading state while games are being fetched
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Choose a Game</h1>
        <div className="flex space-x-4 mb-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => switchGame(game.id)}
              className={`px-4 py-2 rounded ${
                currentGame.id === game.id
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-purple-300 hover:bg-gray-600"
              }`}
            >
              {game.title}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold text-yellow-400">
          Level {currentGame.challenges[level].level}: {currentGame.challenges[level].title}
        </h2>
        <p className="mt-2 text-gray-300">{currentGame.challenges[level].description}</p>
        <p className="mt-2 text-gray-300">🛠 {currentGame.challenges[level].task}</p>
        <pre className="mt-2 bg-gray-500 p-3 rounded text-sm">
          {JSON.stringify(currentGame.challenges[level].data, null, 2)}
        </pre>

        <div className="mt-4">
          <Editor
            height="200px"
            defaultLanguage="javascript"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            theme="vs-dark"
          />
        </div>

        <button
          onClick={executeCode}
          className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
        >
          Run Code
        </button>

        <p className="mt-3 text-lg font-semibold">{message}</p>
        <p className="mt-2 text-green-400">Output: {output}</p>
        <p className="mt-2 text-green-400">XP: {xp}</p>
      </div>
    </div>
  );
}
