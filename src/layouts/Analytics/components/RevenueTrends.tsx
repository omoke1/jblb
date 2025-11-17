import KiachowRevenueTrend from "./KiachowRevenueTrend";
import { Dropdown } from "../../../components/Dropdown";

export const RevenueTrends = () => {

    const options = ["Today", "Last 7 Days", "Last 30 Days", "This Month", "Custom"];

    return (
    <div className="flex w-full flex-col">
        <div className="flex w-full gap-4 justify-between items-center">
            <p className="font-bold">Revenue Trends</p>
            <Dropdown options={options}/>
        </div>
        {/* Revenue Trends  */}
        <div>
            <KiachowRevenueTrend/>
        </div>
    </div>
  );
}
