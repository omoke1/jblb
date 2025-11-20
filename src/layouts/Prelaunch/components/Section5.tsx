import { Icon } from "@iconify/react/dist/iconify.js";
import { FAQ_LIST } from "./faq";
import { useState } from "react";

const Section5 = () => {
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
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-fit p-2 px-4 bg-bgColor text-white">
            <p>FAQ</p>
          </div>
          <h2 className="text-center">The Future of YieldSport™</h2>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          {FAQ_LIST.map((faq, i) => (
            <Card key={i} question={faq.question} answer={faq.answer} />
          ))}
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
  question: string;
  answer: string;
}

const Card = ({ question, answer }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[80vw] lg:w-[50vw] bg-bgColor border-2 border-white/20 p-4 flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <p className="font-bold">{question}</p>
        <Icon
          icon={isOpen ? "ph:minus-fill" : "material-symbols-light:add-box"}
          width={30}
          className="text-white cursor-pointer size-10"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && <p>{answer}</p>}
    </div>
  );
};

export default Section5;
