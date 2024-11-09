"use client";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Ref",
    count: 20,
    fill: "#FF6384",
  },
  {
    name: "Lighting",
    count: 25,
    fill: "#36A2EB",
  },
  {
    name: "PV System",
    count: 15,
    fill: "#FFCE56",
  },
  {
    name: "FAUs",
    count: 10,
    fill: "#4BC0C0",
  },
  {
    name: "Cooling",
    count: 20,
    fill: "#9966FF",
  },
  {
    name: "PV System - General",
    count: 10,
    fill: "#FF9F40",
  },
];

const ECbLChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Electric Consumption by Equipment System</h1>
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
            data={data}
          >
            <RadialBar dataKey="count" cornerRadius={10} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Display Total Consumption in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-lg font-semibold">1,234 KWh</h2>
        </div>
      </div>
    </div>
  );
};

export default ECbLChart;
