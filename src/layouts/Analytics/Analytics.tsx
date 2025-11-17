import {Button} from "../../components/Button";
import { StatCard } from "../../components/StatCard";
import { RevenueTrends } from "./components/RevenueTrends";
import { OrderVolume } from "./components/OrderVolume";
import { TopLocations } from "./components/TopLocations";
import { Dropdown } from "../../components/Dropdown";
import TopCategories from "./components/TopCategories";
import PeakHours from "./components/PeakHours";
import TopVendors from "./components/TopVendors";

const cardStyle = "rounded-md p-4 bg-white";
function Analytics() {
  return (
    <div>
      <SubHeader/>
      {/* Main */}
      <div className="p-4 px-8 flex flex-col gap-6">
        <div className="flex gap-4 justify-between flex-wrap">
          <StatCard title="Total Revenue" color="#22C55E" icon="bx:dollar" quantity="$12,240" percentage={25} comment="vs last period"/>
          <StatCard title="Avg. Order Value" color="#EAB308" icon="mdi:cart" decrease={true} quantity="$1,842" percentage={8.5} comment="vs last period"/>
          <StatCard title="Conversion Rate" color="#A855F7" icon="tabler:percentage" quantity="43.45%" percentage={15.3} comment="vs last period"/>
          <StatCard title="Customer Retentation" color="#3B82F6" icon="fa-solid:users" quantity="12.5%" percentage={3.2} comment="vs last period"/>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 w-full justify-between">
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <RevenueTrends/>
          </div>
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <OrderVolume/>
          </div>
        </div>

        {/* Recent orders and disputes */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 w-full justify-between">
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <TopCategories/>
          </div>
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <PeakHours/>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 w-full justify-between">
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <TopVendors/>
          </div>
          <div className={`${cardStyle} w-full lg:w-[49%]`}>
            <TopLocations/>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubHeader() {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="w-full flex justify-between items-center">
        <h1>Analytics Overview</h1>
        <div className="flex gap-2">
            <Dropdown options={["This Week", "This Month", "This Year"]}/>
            <Button title="Export Reports" className="" icon="material-symbols:download-rounded"/>
        </div>
      </div>
      {/* <p className="text-xs sm:text-sm">Track, manage, and monitor all customer orders on your platform in real time</p> */}
    </div>
  )
}

export default Analytics;
