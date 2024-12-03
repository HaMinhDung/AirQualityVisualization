"use client";

import { useState } from "react";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/admin", visible: ["admin", "user", "developer"] },
      { 
        icon: "/building.png", 
        label: "3D Model", 
        href: "#",
        dropdown: [
          { icon: "/3d-display.png", label: "Display 3D Models", href: "/list/3dmodel" },
          { icon: "/3d-manage.png", label: "Manage 3D Models", href: "/Upload" },
        ],
        visible: ["admin", "developer"] 
      },
      {
        icon: "/data.png",
        label: "Data",
        href: "#",
        dropdown: [
          { icon: "/analysis.png", label: "Data Analytics", href: "/data/analytics" },
          { icon: "/time_series.png", label: "Time-Series Analytics", href: "/data/time-series" },
          { icon: "/report.png", label: "Customized BI Reports", href: "/data/bi-reports" },
          { icon: "/waste_log.png", label: "Waste Log", href: "/data/waste-log" },
        ],
        visible: ["admin", "developer"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "user", "developer"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "user", "developer"] },
      { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "user", "developer"] },
    ],
  },
];

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed h-full bg-white border-r w-48">
      {/* Menu Items */}
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="text-gray-400 font-light my-4 pl-4">
            {section.title}
          </span>
          {section.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 text-gray-500 py-2 px-4 rounded-md hover:bg-gray-100"
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span>{item.label}</span>
                  </Link>
                  {/* Dropdown Menu */}
                  {item.dropdown && hoveredItem === item.label && (
                    <div className="absolute left-0 w-full bg-white shadow-lg rounded-md mt-1 py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex items-center gap-4 px-4 py-2 text-gray-500 hover:bg-gray-100"
                        >
                          <Image src={subItem.icon} alt={subItem.label} width={20} height={20} />
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;