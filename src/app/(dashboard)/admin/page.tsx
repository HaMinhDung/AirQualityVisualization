"use client";
import DataCard from "@/components/DataCard";
import ECbLChart from "@/components/Energy_consumption_chart";
import ECbLChart2 from "@/components/Energy_consumption_chart_2";
import DataAnalyticsBar from "@/components/DataAnalyticsBar";

const AdminPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* DATA ANALYTICS BAR */}
      <div className="w-full">
        <DataAnalyticsBar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 p-4">
        {/* TOP LEFT: DATA CARDS */}
        <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[85%]"> 
          <DataCard type="Energy" data_number={1234} changes={5} />
          <DataCard type="Carbon" data_number={234} changes={-3} unit="kg" />
          <DataCard type="Waste" data_number={456} changes={8} unit="kg" />
          <DataCard type="Property" data_number={789} changes={-1} unit="m²" />
        </div>

        {/* TOP RIGHT: FIRST CHART */}
        <div className="bg-gray-200 rounded-lg shadow-lg p-3 h-[85%]">
          <ECbLChart />
        </div>

        {/* BOTTOM LEFT: LAST 3 DATA CARDS */}
        <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[85%]">
          <DataCard type="Lighting" data_number={567} changes={2} />
          <DataCard type="Cooling" data_number={890} changes={-4} />
          <DataCard type="Others" data_number={678} changes={3} />
          {/* Empty space for the last card */}
          <div className="w-full h-full" />
        </div>

        {/* BOTTOM RIGHT: SECOND CHART */}
        <div className="bg-gray-200 rounded-lg shadow-lg p-3 h-[85%]">
          <ECbLChart2 />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
