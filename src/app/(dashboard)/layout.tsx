import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import DataAnalyticsBar from "@/components/DataAnalyticsBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      {/* TOP: Navbar */}
      <Navbar />

      {/* BELOW NAVBAR: Data Analytics Bar */}
      <div className="flex">
        <div className="w-16"> {/* Fixed width for collapsed menu */}
          <Menu />
        </div>
        <div className="flex-1">
          <DataAnalyticsBar />
        </div>
      </div>

      {/* MAIN: Content Area */}
      <div className="flex h-full">
        {/* LEFT SPACER FOR MENU */}
        <div className="w-16" /> {/* Reserve space for the menu */}
        
        {/* RIGHT: Main Content */}
        <div className="flex-1 bg-[#F7F8FA] overflow-scroll p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
