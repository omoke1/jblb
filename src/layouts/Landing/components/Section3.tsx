// import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../../../components/ButtonAlt";
import { icon1, icon2, icon3 } from "../../../assets/images";

const Section3 = () => {
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
      <div className="w-full relative flex flex-col gap-14 justify-between items-center h-fit">
        <h2 className="text-center">Your Gateway to the Yield League</h2>
        {/* Cards */}
        <div className="w-full flex flex-wrap gap-4 justify-center">
            <Card
              title="Create Your Club"
              content="Assemble your dream team of yield-generating tokens. Strategically select assets that align with your DeFi goals and risk tolerance."
              img={icon1}
              buttonName="EXPLORE THE TECH"
              buttonClassName="bg-primary text-black"
            />
            <Card
              title="Your Team, Your Legacy"
              content="Mint your JBLB Club NFT and become a founder. Attract players, build your club's CValue, and earn a share of all battle fees. This is your franchise in the Yield League."
              img={icon2}
              buttonName="LAUCH YOUR CLUB"
              buttonClassName=""
            />
            <Card
              title="Trade Your Legacy"
              content="Your Club is a dynamic, income-generating asset. List it on the marketplace for other investors to buy, or use the Quick Sale for instant liquidity from the JBLB Treasury."
              img={icon3}
              buttonName="BROWSE CLUBS"
              buttonClassName=""
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
  content: string;
  img: string;
  buttonName: string;
  buttonClassName?: string;
}

const Card = ({ title, content, img, buttonName, buttonClassName, }: CardProps) => {
  return (
    <div className="border-t-2 w-[70vw] max-w-[300px] h-[380px] border-1 border-bgColor ">
      {/* {firstCard && <div className="relative w-[50%] top-0 border-2 border-primary"></div>} */}
      <div className="p-4 py-6 flex flex-col items-start justify-between h-full ">
        <img src={img} alt={img} className="size-12 mb-4" />
        <p className="!font-bold !text-xl">{title}</p>
        <p>{content}</p>
        <Button title={buttonName} className={`py-4 ${buttonClassName}`}/>
      </div>
    </div>
  );
};

export default Section3;
