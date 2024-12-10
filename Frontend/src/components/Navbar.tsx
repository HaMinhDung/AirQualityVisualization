"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      {/* LEFT SIDE: Logo and Page Name */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Image src="/vinuni_logo.png" alt="Vinuni Logo" width={48} height={48} />
        </Link>
        <span className="text-lg font-bold select-none">Air Quality Visualization</span>
      </div>

      {/* RIGHT SIDE: User Info */}
      <div className="flex items-center gap-4">
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