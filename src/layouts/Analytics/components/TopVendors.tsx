import React from "react";
import { Icon } from "@iconify/react";

export const TopVendors = () => {
  const vendors = [
    { name: "Tasty Bites", revenue: "$12,400", orders: 320, rank: 1 },
    { name: "FreshMart", revenue: "$9,800", orders: 280, rank: 2 },
    { name: "Urban Eats", revenue: "$7,600", orders: 210, rank: 3 },
    { name: "Golden Spoon", revenue: "$5,400", orders: 160, rank: 4 },
    { name: "Food Haven", revenue: "$4,200", orders: 120, rank: 5 },
  ];

  return (
    <div className="flex w-full sm:max-w-full flex-col">
      <div className="flex w-full gap-4 justify-between items-center">
        <p className="font-bold">Top Vendors</p>
        <p className="font-bold text-primary cursor-pointer">View All</p>
      </div>

      {/* Vendor List */}
      <div className="flex flex-col gap-3 py-4">
        {vendors.map((vendor, idx) => (
          <VendorCard
            key={idx}
            name={vendor.name}
            revenue={vendor.revenue}
            orders={vendor.orders}
            rank={vendor.rank}
          />
        ))}
      </div>
    </div>
  );
};

interface VendorCardProps {
  name: string;
  revenue: string;
  orders: number;
  rank: number;
}

const VendorCard: React.FC<VendorCardProps> = ({ name, revenue, orders, rank }) => {
  // Assign medal colors for top 3
  const medalColors: Record<number, string> = {
    1: "#FFD700", // gold
    2: "#C0C0C0", // silver
    3: "#CD7F32", // bronze
  };

  return (
    <div className="w-full flex items-center justify-between rounded-md p-3 border  border-bgColor hover:shadow-sm transition">
      <div className="flex items-center gap-3">
        {/* Vendor avatar/icon */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-primary">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm sm:text-base">{name}</p>
          <p className="text-xs text-gray-500">{orders} Orders</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="font-bold">{revenue}</p>
        {rank <= 3 && (
          <Icon
            icon="mdi:medal"
            color={medalColors[rank]}
            width={20}
            height={20}
            className="hidden sm:block"
          />
        )}
      </div>
    </div>
  );
};
export default TopVendors;