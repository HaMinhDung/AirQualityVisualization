"use client";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const locationData = [
  { name: "Fendi", count: 20 },
  { name: "2F", count: 25 },
  { name: "3F", count: 15 },
  { name: "4F", count: 10 },
  { name: "B2", count: 20 },
  { name: "B1", count: 10 },
];

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const total = locationData.reduce((sum, item) => sum + item.count, 0);

const ECbLChart2 = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold">Energy Consumption by Location</h1>
      </div>
      <div className="flex w-full h-[60%] mt-4">
        <div className="w-2/3 h-full flex justify-center items-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={locationData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                fill="#8884d8"
                cornerRadius={10}
              >
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-md font-semibold">1,234 KWh</h2>
          </div>
        </div>
        

        <div className="w-1/3 h-full flex flex-col justify-between pl-4">
          {locationData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between w-full mb-2"
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="ml-2 font-semibold">{item.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {((item.count / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ECbLChart2;
