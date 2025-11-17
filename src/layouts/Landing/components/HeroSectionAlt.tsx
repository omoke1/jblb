import { logos} from "../../../assets/images";
import { Button } from "../../../components/ButtonAlt";
import GridBackground from "./GridBackground";
import Header from "./Header";

const HeroSection = () => {
  return (
    <div className="flex justify-center px-[4%] min-h-screen w-full overflow-hidden">      
    <div className=" relative inset-0 pointer-events-none">
      {/* Star 1 */}
      <div
        className="absolute top-[85%] left-[50vw] animate-pulse-stars"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-[#A9EF2E]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
        </div>
      </div>

      {/* Star 2 */}
      <div
        className="absolute top-[20%] left-[40vw] animate-pulse-stars"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="relative w-1.5 h-1.5">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[0.5px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
        </div>
      </div>

      {/* Star 3 */}
      <div
        className="absolute top-[50%] left-[10vw] animate-pulse-stars"
        style={{ animationDelay: "2.2s" }}
      >
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-90"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[1px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[1px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#A9EF2E]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
        </div>
      </div>

      {/* Star 4 */}
      <div
        className="absolute top-[70%] left-[25vw] animate-pulse-stars"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="relative w-1 h-1">
          <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-2.5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-2.5 h-[1px] bg-[#A9EF2E] -translate-x-1/2 -translate-y-1/2 -rotate-45 blur-[0.5px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#A9EF2E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
        </div>
      </div>
    </div>
      
      <div className="absolute inset-0 opacity-70">
        <GridBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center pt-16">
        <Header/>
        <div className="md:w-[70%] text-center mt-30 flex flex-col justify-center items-center">
          <h1 className="font-panchang text-white ">
            The World First <br/> 
          </h1>
          <div className="flex items-start text-primary">
            <h1 >YieldSport™</h1>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <p className="font-extralight mt-8">Where DeFi Yield Meets Competitive Strategy. Build Your Club, Craft Your Basket, and Compete for Real Yield.</p>
            <div className="flex flex-wrap w-full justify-center">
              <Button title="LAUCH YOUR CLUB" className="bg-black/80"/>
              <Button title="PLAY NOW ON DAPP" className="bg-primary text-black "/>
            </div>
            <img src={logos} alt="Logos" className=" w-auto size-[150px]"/>
          </div>
          
        </div> 
        

      </div>
      {/* Animations */}
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

export default HeroSection;
