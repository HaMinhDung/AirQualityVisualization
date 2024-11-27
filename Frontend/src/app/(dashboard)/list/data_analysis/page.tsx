"use client";
import Analysis_chart from "@/components/Analysis_chart"; // Import the AttendanceChart component

const AnalysisTab = () => {
  const chartTitles = [
    "PM2.5",
    "CO2",
    "TVOC",
    "Temperature",
    "Humidity",
    "Wind Speed",
    "Pressure",
    "Light Intensity",
  ];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Render 8 Attendance Charts with different titles */}
      {chartTitles.map((title, index) => (
        <Analysis_chart key={index} title={title} />
      ))}
    </div>
  );
};

export default AnalysisTab;
