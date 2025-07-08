import React from "react";
import TooltipComponent from "./TooltipComponent";

const WeekColumn = ({ week }) => {

  // console.log(week)

  const getColor = (count) => {
    // console.log(count);
      if (count > 7) return "bg-green-700"; // Highest activity
      if (count > 5) return "bg-green-600";
      if (count > 3) return "bg-green-500";
      if (count > 1) return "bg-green-400";
      return "bg-gray-200"; // No activity (default)
    };

  return (
    <div className="flex flex-col gap-1">
      {week.map((day, dayIndex) => (
        <TooltipComponent
          key={dayIndex}
          date={day.date}
          count={day.count}
          color={getColor(day.count)}
        />
      ))}
    </div>
  );
};

export default WeekColumn;
