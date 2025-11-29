import { Icon } from "@iconify/react/dist/iconify.js";

export const Footer = () => {
  

  return (
      <div className=" overflow-x-hidden absolute z-[10] border-t-1 border-borderColor bottom-0 w-full text-bodyText/50 flex flex-col justify-center items-center flex-wrap gap-2 pt-4 pb-2">
        
        <p className="whitespace-nowrap">© 2025 JBLB • All rights reserved.</p>

        <div className="flex gap-2">
          {/* <div className="p-2 bg-bgColor hover-pointer">
            <Icon icon="ic:baseline-discord" className="size-6 text-white" />
          </div> */}
          <div className="p-2 bg-bgColor border-1 border-borderColor hover-pointer" onClick={() => window.open("https://x.com/jblbGeng", "_blank")}>
            <Icon icon="prime:twitter" className="size-6 text-white" />
          </div>
          <div className="p-2 bg-bgColor border-1 border-borderColor hover-pointer" onClick={() => window.open("https://t.me/jblbplayers", "_blank")}>
            <Icon icon="file-icons:telegram" className="size-6 text-white" />
          </div>
        </div>
      </div>
  );
};
