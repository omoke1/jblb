import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../../../components/ButtonAlt";

const Section5 = () => {
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
      <div className="w-full relative flex flex-col gap-8 items-center h-fit">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-fit p-2 px-4 bg-bgColor text-white "><p>ROADMAP</p></div>
          <h2 className="text-center">The Future of YieldSport™</h2>
        </div>
        <div className="flex">
          <Button title="PHASE 1" className="py-2 px-1 sm:px-2 text-black bg-primary"/>
          <Button title="PHASE 2" className="py-2  px-1 sm:px-2 text-bodyTextDim"/>
          <Button title="PHASE 3" className="py-2  px-1 sm:px-2 text-bodyTextDim"/>
        </div>

        <div className="flex flex-wrap justify-center ">
          <Card 
            title="Phase 1: MVP"
            content={[
              "Club Launchpad & Core dApp",
              "CValue & JSparks System",
              "Basic Marketplace",]} 
            firstCard
          />
          <Card 
            title="DEX Integration (Q1 2026)"
            content={[
              "Cross-Chain Yield Battles",
              "Advanced Club Analytics",
              "DAO Governance Launch",]} 
          />
          <Card 
            title="YieldSport™ League (2026)"
            content={[
              "Professional JBLB Leagues",
              "Sponsor-Funded Prize Pools",
              "Club NFT Trophies & Collectibles",]} 
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

interface CardProps {
  title: string;
  content: string[];
  firstCard?: boolean;
}

const Card = ({ title, content,  firstCard }: CardProps) => {
  return (
    <div
      className={`w-[70vw] sm:min-w-[350px]  max-w-[350px] p-4 py-6 flex flex-col items-start justify-between h-full ${
        firstCard ? 'text-white' : 'text-bodyTextDim/50'
      }`}
    >
     
        <div className="flex justify-start items-center gap-2 mb-4 ">
          <p className="!font-bold !text-xl">{title}</p>
          {firstCard && <div className="text-pimary px-2 border-1 border-primary bg-[#A9EF2E33] flex gap-1 justify-center items-center">
              <Icon icon="material-symbols-light:square" className="size-6 text-primary"/>
              <p className="!text-sm">LIVE</p>
            </div>}
        </div>
        {content.map((text, index) => (
          <div key={index}  className="flex mb-2 gap-2 justify-center items-center">
            <Icon icon="material-symbols-light:square" className={`size-6 ${firstCard ? 'text-primary' : 'text-primary/50' }`}/>
            <p key={index}>{text}</p>
          </div>
          
        ))}
    </div>
  );
};

export default Section5;
