import { Icon } from "@iconify/react/dist/iconify.js";

export const TopLocations = () => {

    return (
    <div className="flex w-full sm:max-w-full flex-col">
        <div className="flex w-full gap-4 justify-between items-center">
            <p className="font-bold">Top Locations</p>
            <p className="font-bold text-primary cursor-pointer">View All</p>
        </div>
        {/* Top Locations */}
        <div className="flex flex-col py-4">
            <LocationCard location="Lagos" percentage={45} amount="$4,500"/>
            <LocationCard location="Abuja" percentage={25} amount="$2,500"/>
            <LocationCard location="Port Harcourt" percentage={15} amount="$1,500"/>
            <LocationCard location="Kano" percentage={10} amount="$1,000"/>
            <LocationCard location="Ibadan" percentage={5} amount="$500"/>
        </div>
    </div>
  );
}

interface LocationCardProps {
  location: string;
  percentage: number;
  amount: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, amount, percentage }) => {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="w-full rounded-md flex p-4 gap-4 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Icon
          icon="material-symbols:circle"
          width={16}
          color={color}
        />
        <div className="flex flex-col text-black">
          <p className="font-bold text-sm sm:text-lg">{location}</p>
        </div>
      </div>
      <div className="flex flex-col text-black items-end">
          <p className="font-bold text-sm sm:text-lg">{amount}</p>
          <p className="font-bold text-bodyText text-xs sm:text-sm">{percentage}%</p>
        </div>
    </div>
  );
};
