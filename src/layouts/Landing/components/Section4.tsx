import { partner1, partner2, partner3, partner4 } from "../../../assets/images";

const Section4 = () => {
  return (
    <div className="border-t-1 border-white/10 py-20 relative flex justify-center w-full overflow-hidden">
        <div className=" relative inset-0 pointer-events-none">
          <div
            className="absolute top-[15%] left-[30vw] animate-pulse-stars"
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
      <div className="w-full relative flex flex-col gap-8 sm:flex-row justify-start sm:justify-between items-center h-fit">
        <div className="w-full sm:w-[39%]">
          <div className="w-fit p-2 px-4 bg-bgColor text-white mb-4"><p>PARTNERS</p></div>
          <h2 className="">Built on the Best of Web3</h2>
        </div>
        <div className="w-full sm:w-[59%] flex justify-start sm:justify-end gap-4 sm:gap-[4%] overflow-x-scroll px-2">
          <img src={partner1} alt="partner1" className="h-12 object-contain"/>
          <img src={partner2} alt="partner2" className="h-12 object-contain"/>
          <img src={partner3} alt="partner3" className="h-12 object-contain"/>
          <img src={partner4} alt="partner4" className="h-12 object-contain"/>
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

export default Section4;
