import React from "react";

export const PeakHours = () => {
  const hours = [
    { label: "Morning (6AM - 11AM)", percentage: 30, amount: "1,200 Orders" },
    { label: "Afternoon (11AM - 4PM)", percentage: 40, amount: "1,600 Orders" },
    { label: "Evening (4PM - 9PM)", percentage: 20, amount: "800 Orders" },
    { label: "Night (9PM - 12AM)", percentage: 10, amount: "400 Orders" },
  ];

  return (
    <div className="flex w-full sm:max-w-full flex-col">
      <div className="flex w-full gap-4 justify-between items-center">
        <p className="font-bold">Peak Hours</p>
        <p className="font-bold text-primary cursor-pointer">View All</p>
      </div>

      {/* Peak Hours */}
      <div className="flex flex-col gap-4 py-4">
        {hours.map((hour, idx) => (
          <HourCard
            key={idx}
            label={hour.label}
            percentage={hour.percentage}
            amount={hour.amount}
          />
        ))}
      </div>
    </div>
  );
};

interface HourCardProps {
  label: string;
  percentage: number;
  amount: string;
}

const HourCard: React.FC<HourCardProps> = ({ label, percentage, amount }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between mb-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm font-bold text-end">{amount}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-green-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
    </div>
  );
};
export default PeakHours;