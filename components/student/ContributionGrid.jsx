import React, { useState, useEffect } from "react";
import WeekColumn from "./WeekColumn"; // Assuming this component will handle displaying each week's data
import { useSelector } from "react-redux";

// The function to generate the full year of data starting from today to one year back
const generateFullYearData = async (token) => {
  const today = new Date();
  const oneYearAgo = new Date();
  
  // Set the start date to one year back from today
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Set the dates to the right format (YYYY-MM-DD)
  const startDate = oneYearAgo;
  const endDate = today;

  const fullYearData = [];

  try {
    // Make GET request to fetch the contributions
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/getcontribution`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json(); // Assuming your API returns the data in the expected format

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const existingEntry = data.find((entry) => entry.date === dateStr);

      fullYearData.push({
        date: dateStr,
        count: existingEntry ? existingEntry.count : 0, // Default to 0 if missing
      });

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } catch (error) {
    console.error("Error fetching contributions:", error);
  }
  // console.log(fullYearData)
  return fullYearData;
};

export default function ContributionGrid() {
  const [contributions, setContributions] = useState([]);
  const { token } = useSelector((state) => state.auth); // Assuming you're using Redux for state management

  useEffect(() => {
    const fetchAndGenerateData = async () => {
      if (token) {
        const generatedData = await generateFullYearData(token);
        setContributions(generatedData); // Set the generated data
      }
    };

    fetchAndGenerateData();
  }, [token]);

  // console.log(contributions)

  // Group by weeks
  const weeks = [];
  let currentWeek = [];
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Activity on Saksham</h2>
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <WeekColumn key={weekIndex} week={week} />
        ))}
      </div>
    </div>
  );
}
