import Image from "next/image";
import Link from "next/link";

const smartRetailItems = [
  { icon: "/shop.png", label: "Store Insights", href: "/smart-retail/store-insights" },
  { icon: "/inventory.png", label: "Inventory", href: "/smart-retail/inventory" },
  { icon: "/sales.png", label: "Sales", href: "/smart-retail/sales" },
];

const SmartRetailMenu = () => {
  return (
    <div className="w-48 mt-4 text-sm flex flex-col gap-2">
      <span className="text-gray-400 font-light my-4">SMART RETAIL</span>
      {smartRetailItems.map((item) => (
        <Link href={item.href} key={item.label} className="flex items-center gap-4 text-gray-500 py-2 px-2 rounded-md hover:bg-lamaSkyLight">
          <Image src={item.icon} alt={item.label} width={20} height={20} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SmartRetailMenu;
