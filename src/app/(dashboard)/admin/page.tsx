"use client";

import { useState } from "react";
import Announcements from "@/components/Announcements";
import ECbLChart from "@/components/Energy_consumption_chart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import ECbLChart2 from "@/components/Energy_consumption_chart_2";
import Energygraph from "@/components/Energy_graph"; // Re-added FinanceChart

const AdminPage = () => {
  const [timePeriod, setTimePeriod] = useState("today");

  // Dummy data based on the time period (this could be dynamic in a real app)
  const getDataForTimePeriod = (period: string) => {
    switch (period) {
      case "today":
        return { gas: 1234, gasIntensity: 5, electric: 4567, water: 789 };
      case "week":
        return { gas: 2100, gasIntensity: 2, electric: 5300, water: 1200 };
      case "month":
        return { gas: 5000, gasIntensity: -3, electric: 8000, water: 3000 };
      case "year":
        return { gas: 60000, gasIntensity: -5, electric: 90000, water: 40000 };
      default:
        return { gas: 1234, gasIntensity: 5, electric: 4567, water: 789 };
    }
  };

  const data = getDataForTimePeriod(timePeriod);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* TIME PERIOD BUTTONS */}
        <div className="flex gap-4 mb-4">
          {["today", "week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded ${
                timePeriod === period ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {`${period.charAt(0).toUpperCase() + period.slice(1)}`}
            </button>
          ))}
        </div>

        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Gas Consumption" data_number={data.gas} changes={data.gasIntensity} />
          <UserCard type="Gas Use Intensity" data_number={data.gasIntensity} changes={-3} />
          <UserCard type="Electric Supply" data_number={data.electric} changes={8} />
          <UserCard type="Water Consumption" data_number={data.water} changes={-2} />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* CHART 1 */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <ECbLChart />
          </div>
          {/* CHART 2 */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <ECbLChart2 />
          </div>
        </div>

        {/* USER CARDS REPLACEMENT */}
        <div className="flex gap-4 justify-between flex-wrap mt-8">
          <UserCard type="Electric Consumption" data_number={data.electric} changes={5} />
          <UserCard type="Electric Use Intensity" data_number={data.gasIntensity} changes={-3} />
          <UserCard type="Water Use Intensity" data_number={data.water} changes={-2} />
        </div>

        {/* FINANCE CHART */}
        <div className="w-full h-[500px] mt-8">
          <Energygraph />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
