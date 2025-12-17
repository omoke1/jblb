import { solutionImg1, solutionImg1Alt, solutionImg2, solutionImg2Alt, solutionImg3, solutionImg3Alt } from "../../../assets/images";

const Solution = () => {
  return (
    <div className="border-t-1 border-white/10 py-20 relative flex justify-center w-full overflow-hidden">
      
      {/* Stars animation */}
      <div className="absolute inset-0 pointer-events-none">
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
      <div className="w-full relative flex flex-col gap-8 items-center h-fit">
        <div className="w-full sm:w-[60%] text-center max-w-[800px] flex flex-col items-center gap-4">
          <div className="w-fit p-2 px-4 bg-bgColor border-1 border-borderColor text-white">
            <p>SOLUTION</p>
          </div>
          <h2 className="text-center">Your Legacy in the Yield League Starts Now.</h2>
          <p className="text-bodyTextDim">Forge your club, accumulate your CValue, and write your name into the annals of the first YieldSport™. Will you be a player, a founder, or a legend?</p>
        </div>

        <div className="hidden md:flex flex-wrap items-center justify-center mt-4">
          <img
            src={solutionImg1}
            alt="Solution Image 1"
            className="w-[40vw] sm:w-[300px] h-auto -mx-2"
          />
          <img
            src={solutionImg2}
            alt="Solution Image 2"
            className="w-[40vw] sm:w-[300px] h-auto -mx-2"
          />
          <img
            src={solutionImg3}
            alt="Solution Image 3"
            className="w-[40vw] sm:w-[300px] h-auto -mx-2"
          />
        </div>

        {/* for small screens */}
        <div className="flex md:hidden gap-10 flex-wrap items-center justify-center mt-4">
          <img
            src={solutionImg1Alt}
            alt="Solution Image 1"
            className="w-[60vw]  h-auto"
          />
          <img
            src={solutionImg2Alt}
            alt="Solution Image 2"
            className="w-[60vw]  h-auto"
          />
          <img
            src={solutionImg3Alt}
            alt="Solution Image 3"
            className="w-[60vw]  h-auto"
          />
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


export default Solution;
