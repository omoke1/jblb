import { Icon } from "@iconify/react/dist/iconify.js";

const Section2 = () => {
  return (
    <div className="border-t-1 mb-20 border-white/10 pt-20 relative flex justify-center  w-full overflow-hidden">
        <div className=" relative inset-0 pointer-events-none">
            <div
                className="absolute top-[5%] left-[40vw] animate-pulse-stars"
                style={{ animationDelay: "1.5s" }}
                >
                    <div className="relative w-1.5 h-1.5">
                    <div className="absolute inset-0 bg-[#A9EF2E] blur-[0.5px] opacity-70"></div>
                    <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
                </div>
            </div>
        </div>

      {/* Content */}
      <div className="w-full relative flex flex-col md:flex-row gap-4 justify-between items-center h-fit">
        <div className="w-full md:w-[49%]  flex flex-col gap-4 items-start justify-start py-14">
            <h2>🏆 The YieldSport™ Arena in Numbers</h2>
            <p>Stop just farming. Start competing. <span className="text-white/40">JBLB is a new competitive ecosystem where your DeFi strategy becomes your playing field.</span> Create a Club, connect to yield farms, and battle against others. <span className="text-white/40">Your skill in building token baskets and generating yield is now a sport.</span></p>
        </div>
        {/* Cards */}
        <div className="w-full md:w-[49%] flex flex-col gap-4 items-end">
            <div className="flex gap-4 justify-center  flex-wrap">
                <Card title="Total Value Locked (TVL)" value="$142.8M" />
                <Card title="Active Battles" value="2,451"  />
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
                <Card title="$Clubs Created" value="18,492"  />
                <Card title="$JBLB Price" value="$3.42" increase="4.15" />
            </div>
            </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes pulse-stars {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-pulse-stars {
          animation: pulse-stars 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};


interface CardProps {
  title: string;
  value: string;
  increase?: string;
  decrease?: string;
}

const Card = ({ title, value, increase, decrease }: CardProps) => {
  return (
    <div className="w-[230px] h-[120px] p-4 py-6 flex flex-col justify-between items-start gap-2 bg-bgColor ">
      {/* Left Section */}
      <div className="flex justify-start items-center gap-2">
        <p className="text-white/50 !font-extralight">{title}</p>

        {/* Increase or Decrease */}
        {increase && (
          <div className="w-fit text-green-500 border-1 border-green-500 flex items-center px-1 ">
            <Icon icon="iconamoon:trend-up-light" width={12} className="mr-1" /> <p className="!text-xs !font-normal">{increase}</p>
          </div>
        )}

        {decrease && (
          <div className="w-fit text-red-500 border-1 border-red-500 flex items-center px-1 ">
            <Icon icon="iconamoon:trend-down-bold" width={12} className="mr-1" /> <p className="!text-xs !font-normal">{decrease}</p>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <p className="text-white font-semibold">{value}</p>
        {decrease && <Icon icon="emojione-monotone:down-arrow" width={16} className="rotate-45 text-red-500" />}
        
        {increase && <Icon icon="emojione-monotone:up-arrow" width={16} className="rotate-45 text-primary" />}
      </div>
    </div>
  );
};

export default Section2;
