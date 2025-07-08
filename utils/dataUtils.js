const sampleData = {
  contributions: [
    { date: "2024-01-01", count: 3 },
    { date: "2024-01-02", count: 0 },
    { date: "2024-01-03", count: 5 },
    { date: "2024-01-04", count: 2 },
    { date: "2024-01-05", count: 8 },
    { date: "2024-01-06", count: 1 },
    { date: "2024-01-07", count: 0 },
    { date: "2024-01-08", count: 7 },
    { date: "2024-01-09", count: 4 },
    { date: "2024-01-10", count: 6 },
    { date: "2024-01-11", count: 2 },
    { date: "2024-01-12", count: 9 },
    { date: "2024-01-13", count: 0 },
    { date: "2024-01-14", count: 3 },
  ],
};

// Generate a full year (365 days), filling missing dates with count: 0
export const generateFullYearData = () => {
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-12-31");
  const fullYearData = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const existingEntry = sampleData.contributions.find(
      (d) => d.date === dateStr
    );

    fullYearData.push({
      date: dateStr,
      count: existingEntry ? existingEntry.count : 0, // Default to 0 if missing
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(fullYearData);Z
  return fullYearData;
};
