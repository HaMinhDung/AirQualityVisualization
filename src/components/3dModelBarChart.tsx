"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
  barColor: string;
}

const BarChartComponent = ({ data, title, barColor }: BarChartProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
          <YAxis tick={{ fill: "#6B7280" }} />
          <Tooltip
            contentStyle={{ borderRadius: "8px", borderColor: "#E5E7EB" }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar dataKey="value" fill={barColor} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
