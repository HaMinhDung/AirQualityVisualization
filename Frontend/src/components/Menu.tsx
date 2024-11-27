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
      { icon: "/building.png", label: "3D Model", href: "/list/3dmodel", visible: ["admin", "developer"] },
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
      { icon: "/3d-model.png", label: "Simulation", href: "/list/parents", visible: ["admin", "developer"] },
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
  const [expanded, setExpanded] = useState(false);
  const [dataAnalysisOpen, setDataAnalysisOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-300 fixed h-full bg-white border-r ${
        expanded ? "w-48" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-gray-200 p-2 rounded"
        >
          <Image src="/menu.png" alt="Toggle Menu" width={24} height={24} />
        </button>
      </div>

      {/* Menu Items */}
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          {expanded && (
            <span className="text-gray-400 font-light my-4 pl-4">
              {section.title}
            </span>
          )}
          {section.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <div key={item.label} className="relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 text-gray-500 py-2 px-4 rounded-md hover:bg-gray-100"
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                        setDataAnalysisOpen(!dataAnalysisOpen);
                      }
                    }}
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    {expanded && <span>{item.label}</span>}
                  </Link>
                  {/* Dropdown for Data Analysis */}
                  {item.dropdown && dataAnalysisOpen && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex items-center gap-4 text-gray-500 hover:bg-gray-100 p-2 rounded"
                        >
                          <Image src={subItem.icon} alt={subItem.label} width={20} height={20} />
                          {expanded && <span>{subItem.label}</span>}
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
