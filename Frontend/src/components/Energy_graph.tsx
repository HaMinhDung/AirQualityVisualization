"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { format } from "date-fns"; // Make sure you install date-fns
import Calendar, { CalendarType } from "react-calendar"; // Install react-calendar package for the mini calendar

// Sample data for water, electricity, and gas usage in KWh
const data = [
  { name: "Jan", water: 4000, electricity: 2400, gas: 1000 },
  { name: "Feb", water: 3000, electricity: 1800, gas: 1200 },
  { name: "Mar", water: 3500, electricity: 2200, gas: 950 },
  { name: "Apr", water: 2800, electricity: 1900, gas: 1050 },
  { name: "May", water: 3300, electricity: 2100, gas: 1100 },
  { name: "Jun", water: 2900, electricity: 2000, gas: 900 },
  { name: "Jul", water: 3700, electricity: 2300, gas: 1000 },
  { name: "Aug", water: 3600, electricity: 2400, gas: 1050 },
  { name: "Sep", water: 3400, electricity: 2300, gas: 1150 },
  { name: "Oct", water: 3200, electricity: 2200, gas: 1000 },
  { name: "Nov", water: 3100, electricity: 2100, gas: 1100 },
  { name: "Dec", water: 3000, electricity: 2000, gas: 1200 },
];

const EnergyGraph = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Handle the change in calendar date selection
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date)) {
      setStartDate(date[0]);
      setEndDate(date[1]);
    } else {
      setStartDate(date);
      setEndDate(date);
    }
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Filter data based on the date range
  const filteredData = data.filter((entry, index) => {
    const monthIndex = new Date(entry.name + " 2024").getMonth();
    if (startDate && endDate) {
      return (
        monthIndex >= startDate.getMonth() && monthIndex <= endDate.getMonth()
      );
    }
    return true; // Show all data if no range is selected
  });

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Energy Consumption over this year</h1>
        <div className="relative">
          <Image
            src="/moreDark.png"
            alt="More Options"
            width={20}
            height={20}
            onClick={toggleCalendar}
          />
          {showCalendar && (
            <div className="absolute right-0 top-6 p-4 bg-white shadow-lg rounded-md z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span>From: </span>
                  <button className="border px-2 py-1 rounded">
                    {startDate ? format(startDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span>To: </span>
                  <button className="border px-2 py-1 rounded">
                    {endDate ? format(endDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </button>
                </div>
                <Calendar
                  value={[startDate, endDate]}
                  onChange={handleDateChange}
                  calendarType="iso8601"
                  selectRange
                  tileClassName="text-black"
                  minDate={new Date("01/01/2024")}
                  maxDate={new Date("12/31/2024")}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={20} label={{ value: "KWh", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="water"
            stroke="#A0E1FF"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="electricity"
            stroke="#FFD700"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="gas"
            stroke="#FF6347"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyGraph;
