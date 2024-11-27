import React from "react";

const DataAnalyticsBar = () => {
  return (
    <div className="bg-white py-2 border-b shadow-md">
      <div className="flex flex-col gap-4 px-4 max-w-[calc(100%-4rem)] mx-auto">
        {/* Title */}
        <div className="text-left text-base font-bold text-gray-700">
          Data Analytics
        </div>

        {/* Top Buttons (Underline Only) */}
        <div className="flex gap-6"> {/* Increased gap to space out buttons */}
          {["Energy Analytics", "Asset Analytics", "Carbon Emissions", "Property Analytics", "Commercial Waste"].map((btn, idx) => (
            <button
              key={idx}
              className="text-sm font-medium text-gray-700 border-b-2 border-gray-300 hover:border-gray-500 transition"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Time Buttons (Rectangle, No Gaps, Left-Aligned) */}
        <div className="flex">
          {["Today", "Yesterday", "Last 7 Days", "This Month", "Last 30 Days", "This Year", "Custom"].map((btn, idx) => (
            <button
              key={idx}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 transition border border-gray-300"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataAnalyticsBar;
