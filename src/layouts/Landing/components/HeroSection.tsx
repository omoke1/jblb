import { Icon } from "@iconify/react/dist/iconify.js";
import { logo, bg, poweredBy2, poweredBy1 } from "../../../assets/images";
import { Button } from "../../../components/Button";
import { useState } from "react";
// import Card from "./Card";

const HeroSection = () => {
  const options = ['All', 'Starting Soon', 'Live Battles', 'Completed Battles', 'My Battles']; 
  const [selectedOption, setSelectedOption] = useState('All');
  
//   type CardStatus = "Starts" | "Live" | "Rewarded";

// interface CardProps {
//   time: string;
//   title: string;
//   status: CardStatus;
//   token: string;
//   tier: number;
//   pool: number;
//   players: number;
//   duration: string;
// }

// const cardData: CardProps[] = [
//   {
//     time: "02:15:30",
//     title: "Crypto Clash",
//     status: "Starts",
//     token: "Eth21H4",
//     tier: 3,
//     pool: 5000,
//     players: 10,
//     duration: "2h 30m",
//   },
//   {
//     time: "04:45:10",
//     title: "Battle Royale",
//     status: "Live",
//     token: "Btc9K2",
//     tier: 2,
//     pool: 3500,
//     players: 8,
//     duration: "1h 15m",
//   },
//   {
//     time: "01:10:05",
//     title: "Token Titans",
//     status: "Rewarded",
//     token: "SolX5",
//     tier: 1,
//     pool: 2500,
//     players: 12,
//     duration: "3h 00m",
//   },
// ];
  return (
    <div className="p-4 sm:px-[8vw] relative min-h-screen w-full overflow-hidden bg-black">      
      {/* Stars Animation */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute top-[10%] left-[15%] w-0.5 h-0.5 bg-white rounded-full animate-pulse-stars"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-[20%] left-[80%] w-px h-px bg-white rounded-full animate-pulse-stars"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[50%] left-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulse-stars"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-[70%] left-[30%] w-px h-px bg-white rounded-full animate-pulse-stars"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-[85%] left-[90%] w-0.5 h-0.5 bg-white rounded-full animate-pulse-stars"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      

      {/* Background Image (above glow) */}
      <div
        className="absolute fit sm:left-[15%] w-full sm:w-[70vw] h-[100vh] inset-0 bg-cover bg-center opacity-12 z-[3]"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>

      {/* Subtle White Center Glow */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-5 overflow-hidden">
        <div className="w-[60vw] h-[100vh] bg-white rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="mt-20 md:mt-10 relative z-[4] flex flex-col items-center justify-center min-h-screen ">
        {/* Background Logo (behind glow) */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 scale-75 z-0"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        ></div>
        {/* Glowing Effects */}
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 z-[2]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25)_0%,transparent_60%)] blur-3xl"></div>
          <div className="absolute inset-0 -translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] blur-3xl"></div>
        </div>
        <div className="z-10 fixed top-0 flex justify-between items-center w-full  p-4 sm:px-[8vw] pt-2">
          <img src={logo} alt="Logo" className="size-20  sm:size-32  " />
          <div className="flex gap-4 items-center justify-center h-fit">
            <Icon icon="mingcute:search-line" className="text-white text-3xl" />
            <Button title="Connect Wallet" icon="ion:wallet" secondary={true} rounded/>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-4 text-white text-lg sm:text-xl sm:w-[60vw] justify-center items-center text-center">
          <h1 className="text-4xl font-bold ">The Arena Where Crypto Meets Competition</h1>
          <p>Build your basket, challenge rivals, and earn JSparks in the ultimate Web3 strategy sport. Skill beats speculation.</p>
          <Button title="Start Your First Battle" rounded className="font-normal px-4"/>
          <p>Powered by:</p>
          <div className="flex ">
            <img src={poweredBy2} alt="Powered By 1" className="inline-block h-8 mx-2" />
            <img src={poweredBy1} alt="Powered By 2" className="inline-block h-8 mx-2" />
          </div>
        </div>
        {/* options */}
        <div className="w-[90%] overflow-x-scroll whitespace-nowrap sm:w-fit mt-32 bg-bgColor rounded-full p-4 flex gap-8 items-center text-bodyTextDim text-lg sm:text-xl z-[5]">
            {options.map((option, index) => (
              <div onClick={() => setSelectedOption(option)} key={index} className={`${selectedOption===option ? 'bg-[#0F0F0F] rounded-full text-bodyText shadow-[0_0_5px_2px_rgba(169,239,46,0.3)] p-2' : 'text-bodyTextDim'}  cursor-pointer hover:text-[--color-primary]`}>
                <p>{option}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-20 flex flex-wrap gap-6">
      {/* {cardData.map((card, index) => (
        <Card
          key={index}
          time={card.time}
          title={card.title}
          status={card.status}
          token={card.token}
          tier={card.tier}
          pool={card.pool}
          players={card.players}
          duration={card.duration}
        />
      ))} */}
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
