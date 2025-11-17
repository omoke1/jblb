import { playNow } from "../../../assets/images";
import { Button } from "../../../components/ButtonAlt";

const Section6 = () => {
  return (
    <div className="border-t-1 border-white/10 py-20 relative flex justify-center w-full overflow-hidden">
        <div className=" relative inset-0 pointer-events-none">
          <div
            className="absolute top-[25%] left-[70vw] animate-pulse-stars"
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
      <div className="w-full md:w-[60%] relative flex flex-col gap-4 items-center h-fit text-center">
        <h2>Your Legacy in the Yield League Starts Now.</h2>
        <p className="text-bodyText/50">Forge your club, accumulate your CValue, and write your name into the annals of the first YieldSport™. Will you be a player, a founder, or a legend?</p>
        
          <img src={playNow} alt="play now" className="h-8 mx-4 relative top-2.5 left-[15%] md:left-[50%]"/>
        <div className="mt-2 flex flex-wrap justify-center items-center">
          <Button title="LAUNCH YOUR CLUB"/>
          <Button title="PLAY NOW ON DAPP" className="bg-primary text-black"/>
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

export default Section6;
