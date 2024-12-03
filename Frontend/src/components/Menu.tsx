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
        icon: "/3d-model.png", 
        label: "3D Model", 
        href: "#",
        dropdown: [
          { icon: "/3d-display.png", label: "Display 3D Models", href: "/3dmodel/display" },
          { icon: "/3d-manage.png", label: "Manage 3D Models", href: "/3dmodel/manage" },
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
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const isDropdownVisible = (itemLabel: string) => {
    return hoveredItem === itemLabel || clickedItem === itemLabel;
  };

  return (
    <div className="fixed h-full bg-white border-r w-48">
      {/* Menu Items */}
      {menuItems.map((section) => (
        <div className="flex flex-col" key={section.title}>
          <span className="text-gray-400 font-light my-4 pl-4">
            {section.title}
          </span>
          <div className="flex flex-col">
            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <div 
                    key={item.label} 
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div 
                      className="flex items-center gap-4 text-gray-500 py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        if (item.dropdown) {
                          setClickedItem(clickedItem === item.label ? null : item.label);
                        } else if (item.href) {
                          window.location.href = item.href;
                        }
                      }}
                    >
                      <div className="w-5 h-5 relative flex-shrink-0">
                        <Image src={item.icon} alt="" fill style={{ objectFit: 'contain' }} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {item.dropdown && isDropdownVisible(item.label) && (
                      <div className="bg-gray-50 py-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex items-center gap-4 px-8 py-2 text-gray-500 hover:bg-gray-100"
                          >
                            <div className="w-5 h-5 relative flex-shrink-0">
                              <Image src={subItem.icon} alt={subItem.label} fill style={{ objectFit: 'contain' }} />
                            </div>
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
