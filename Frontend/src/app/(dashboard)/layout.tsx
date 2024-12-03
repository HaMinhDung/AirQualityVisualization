import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import ChatPopup from "@/components/ChatPopup";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      {/* TOP: Navbar */}
      <div>
        <Navbar />
      </div>

      {/* BELOW NAVBAR: Content Area */}
      <div className="flex flex-1">
        {/* LEFT: Menu Bar */}
        <div className="w-16 bg-white">
          <Menu />
        </div>

        {/* RIGHT: Main Content */}
        <div className="flex-1 bg-[#F7F8FA] overflow-auto">
          <div className="h-full w-full">{children}</div>
        </div>
      </div>

      {/* Chat Popup */}
      <ChatPopup />
    </div>
  );
}
