import GridBackground from "./GridBackground";
import { logo, waitlistImageSet } from "../../../assets/images";
import { WaitlistForm } from "./WaitlistForm";

const HeroSection = () => {
  return (
    <div className="flex justify-center px-[4%] pb-20 w-full overflow-hidden">      
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
      <div className="relative z-10 flex flex-col items-center">
        <div className="md:w-[70%] text-center mt-20 flex flex-col justify-center items-center">
          <img src={logo} alt="logo" className="relative size-[80px]"/>
          <img src={logo} alt="logo" className="relative size-[30px] left-[30vw]"/>
          <div className="flex items-start text-primary">
            <h2 >The World's First YieldSport™</h2>
          </div>
          <h1 className="font-panchang text-white ">
            Get Early Access to JBLB 
          </h1>
          <div className=" flex flex-col gap-4">
            <p className="font-extralight mt-8 text-bodyTextDim">We're almost ready. Join the prelaunch waitlist and be among the first to enter the world of YieldSport™.</p>
            {/* form */}
            <div className="flex flex-wrap w-full justify-center">
              <WaitlistForm />
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={waitlistImageSet} alt="waitlist" className="min-w-[70px] w-[15vw] max-w-[80px]  contain"/>
              <p className="font-extralight text-left">Join 200+ Web3 Guru on the waitlist</p>
            </div>
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
