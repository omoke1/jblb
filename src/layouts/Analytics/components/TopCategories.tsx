import React from "react";

export const TopCategories = () => {
  const categories = [
    { name: "Fast Food", percentage: 40, amount: "$4,000" },
    { name: "Drinks", percentage: 25, amount: "$2,500" },
    { name: "Local Dishes", percentage: 20, amount: "$2,000" },
    { name: "Snacks", percentage: 10, amount: "$1,000" },
    { name: "Desserts", percentage: 5, amount: "$500" },
  ];

  return (
    <div className="flex w-full sm:max-w-full flex-col">
      <div className="flex w-full gap-4 justify-between items-center">
        <p className="font-bold">Top Categories</p>
        <p className="font-bold text-primary cursor-pointer">View All</p>
      </div>

      {/* Top Categories */}
      <div className="flex flex-col gap-4 py-4">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            name={cat.name}
            percentage={cat.percentage}
            amount={cat.amount}
          />
        ))}
      </div>
    </div>
  );
};

interface CategoryCardProps {
  name: string;
  percentage: number;
  amount: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, percentage, amount }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between mb-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm font-bold">{amount}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
    </div>
  );
};
export default TopCategories;