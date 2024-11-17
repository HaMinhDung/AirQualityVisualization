const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Air Quality Alert: High PM2.5 Levels</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-10-30
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Warning: PM2.5 levels have exceeded safe limits. Limit outdoor activities and wear masks if necessary.
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Tip: Improve Indoor Air Quality</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-10-30
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            To reduce indoor air pollution, regularly ventilate your space and use air purifiers if possible.
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Weekly Air Quality Summary</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-10-30
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            This week, air quality levels fluctuated significantly. Ensure to stay informed about local air quality indices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
