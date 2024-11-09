"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const locationData = [
  { name: "Fendi", count: 20, fill: "#FF6384" },
  { name: "2F", count: 25, fill: "#36A2EB" },
  { name: "3F", count: 15, fill: "#FFCE56" },
  { name: "4F", count: 10, fill: "#4BC0C0" },
  { name: "B2", count: 20, fill: "#9966FF" },
  { name: "B1", count: 10, fill: "#FF9F40" },
];

const ECbLChart2 = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Energy Consumption by Location</h1>
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={32}
            data={locationData}
          >
            <RadialBar dataKey="count" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Display Total Consumption in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-lg font-semibold">1,234 KWh</h2>
        </div>
      </div>
      {/* LEGEND */}
      <div className="flex justify-center gap-4 mt-4">
        {locationData.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-1">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <h1 className="font-bold">{item.count}</h1>
            <h2 className="text-xs text-gray-500">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ECbLChart2;
