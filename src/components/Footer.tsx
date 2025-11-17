import { Icon } from "@iconify/react/dist/iconify.js";
import { footerBg } from "../assets/images";

export const Footer = () => {
  const links = {
    LAUNCHPAD: "#",
    LEADERBOARD: "#",
    MARKETPLACE: "#",
    TOKENOMICS: "#",
    BLOG: "#",
    DOCS: "#",
  };

  const social = {
    TWITTER: "#",
    TELEGRAM: "#",
    DISCORD: "#",
    LINKEDIN: "#",
    FACEBOOK: "#",
  };

  return (
    <div
      className="
        w-full sm:text-white absolute bottom-0 sm:p-6 
        bg-no-repeat bg-center bg-contain flex flex-col justify-end
      "
      style={{ backgroundImage: `url(${footerBg})`,
        height: '400px',
    }}
    >
      <div className="flex justify-between items-start mx-[7vw]">
        
        <div className="flex gap-8 ml-auto">
          {/* links */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-bodyText/50">LINKS</p>
            {Object.entries(links).map(([label, url]) => (
              <a
                key={label}
                href={url}
                className="hover:text-primary transition"
              >
                {label}
              </a>
            ))}
          </div>

          {/* social */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-bodyText/50">SOCIAL</p>
            {Object.entries(social).map(([label, url]) => (
              <a
                key={label}
                href={url}
                className="hover:text-primary transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* second row */}
      <div className="mt-10 text-bodyText/50 flex justify-between items-baseline flex-wrap gap-4 mx-[7vw] pb-2">
        <p className="whitespace-nowrap">© 2025 JBLB • All rights reserved.</p>

        <div className="flex gap-2">
          <div className="p-2 bg-bgColor hover-pointer">
            <Icon icon="ic:baseline-discord" className="size-6 text-white" />
          </div>
          <div className="p-2 bg-bgColor hover-pointer">
            <Icon icon="prime:twitter" className="size-6 text-white" />
          </div>
          <div className="p-2 bg-bgColor hover-pointer">
            <Icon icon="file-icons:telegram" className="size-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
