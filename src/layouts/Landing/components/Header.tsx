import { useState } from "react";
import { Button } from "../../../components/ButtonAlt";
import { logo } from "../../../assets/images";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-black opacity-100 z-50">
      <div className="flex items-center justify-between mx-[7vw] lg:border-[0.5px] border-primary/10">
        
        {/* Left Section */}
        <div className="flex items-center">
          <div className="flex items-center px-6 cursor-pointer">
            <img src={logo} alt="Logo" className="h-16 w-16 shrink-0" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex">
            <Button title="HOME" className="border-y-0 text-white" />
            <Button title="MARKETPLACE" className="border-y-0 border-l-0 text-white" />
            <Button title="LEADERBOARD" className="border-y-0 border-l-0 text-white" />
            <Button title="BLOG" className="border-y-0 border-l-0 text-white" />
            <Button title="DOC" className="border-y-0 border-l-0 text-white" />
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex">
          <Button title="LAUNCHPAD" className="border-y-0 bg-primary/10 text-white" />
          <Button title="CONNECT WALLET" className="border-y-0 border-l-0 bg-primary text-black" />
        </div>

        {/* Mobile Toggle */}
        <Icon
          icon={isOpen ? "mdi:close" : "mdi:menu"}
          width={30}
          className="lg:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          lg:hidden bg-black border-t border-primary/10 overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 text-white">

          <button className="text-left">HOME</button>
          <button className="text-left">MARKETPLACE</button>
          <button className="text-left">LEADERBOARD</button>
          <button className="text-left">BLOG</button>
          <button className="text-left">DOC</button>

          <div className="h-[1px] bg-primary/20 my-2"></div>

          <Button title="LAUNCHPAD" className="bg-primary/10 text-white w-full" />
          <Button title="CONNECT WALLET" className="bg-primary text-black w-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
