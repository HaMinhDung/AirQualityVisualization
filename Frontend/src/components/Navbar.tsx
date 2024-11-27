import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      {/* LEFT SIDE: Logo and Page Name */}
      <div className="flex items-center gap-4">
        <Image src="/vinuni_logo.png" alt="Vinuni Logo" width={32} height={32} />
        <span className="text-lg font-bold">Air quality visualization</span> {/* Replace "Dashboard" with the actual page name if dynamic */}
      </div>

      {/* RIGHT SIDE: Icons and User Info */}
      <div className="flex items-center gap-6">
        {/* Language Icon */}
        <div className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/language.png" alt="Language" width={20} height={20} />
        </div>

        {/* Announcement Icon with Notification Badge */}
        <div className="bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="Announcement" width={20} height={20} />
          <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
        </div>

        {/* User Information */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium">We Ain't Byte</span>
          <span className="text-[10px] text-gray-500">Admin</span>
        </div>

        {/* User Avatar */}
        <Image src="/avatar.png" alt="Avatar" width={36} height={36} className="rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;