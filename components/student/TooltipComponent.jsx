import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipComponent = ({ date, count, color }) => {
  console.log(date, count, color);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`w-4 h-4 rounded ${color}`} 
          tabIndex={0} // Ensures it's focusable for tooltip
          aria-label={`${date}: ${count} contributions`}
        />
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black border border-gray-300 shadow-md rounded-md p-2">
        <p>
          {date}: {count} contributions
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
