import { logo, avatar, bgMain } from "../../assets/images";
import { Button } from "../../components/ButtonAlt.tsx";
import { Footer } from "./components/Footer.tsx";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const Congratulations = () => {
  const screenWidth = useScreenWidth();
  const pageRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (pageRef.current) {
      try {
        const canvas = await html2canvas(pageRef.current, {
          useCORS: true,
          scrollY: -window.scrollY, // captures page in current scroll position
        });
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "congratulations.png";
        link.click();
      } catch (error) {
        console.error("Error capturing page:", error);
      }
    }
  };

  return (
    <div
      ref={pageRef}
      className="bg-[#000004] absolute fit w-full opacity-100 bg-center text-white flex flex-col items-center pb-40"
    >
      <div
        className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <div
        className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
        style={{ backgroundImage: `url(${bgMain})` }}
      ></div>
      <Footer />

      <div className="inset-0 pointer-events-none">
        {/* Stars */}
        {[
          { top: "10%", left: "60vw", delay: "0.8s", size: 2 },
          { top: "20%", left: "40vw", delay: "1.5s", size: 1.5 },
          { top: "50%", left: "10vw", delay: "2.2s", size: 3 },
          { top: "70%", left: "25vw", delay: "0.3s", size: 1 },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute animate-pulse-stars"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          >
            <div className={`relative w-${star.size} h-${star.size}`}>
              <div className="absolute inset-0 bg-[#A9EF2E] blur-[1px] opacity-80"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-14 w-[80vw] mt-4 max-w-[750px] flex-col text-center items-center p-6">
        {/* logos */}
        <div className="w-full flex flex-col gap-2 justify-center">
          <img src={logo} alt="Logo" className="h-16" />
          <div className="hidden sm:flex w-full justify-end">
            <img src={logo} alt="Logo" className="h-10" />
          </div>
        </div>

        {/* content card */}
        <div className="w-full max-w-[400px]">
          <div
            className="bg-bgColor border-2 border-b border-dotted border-primary w-full p-[20px] -mt-8 flex flex-col py-16 gap-8 justify-center items-center"
            style={{
              clipPath: `polygon(
                0% 0%,
                100% 0%,
                100% calc(100% - 50px),
                calc(100% - 8vw) 100%,
                8vw 100%,
                0% calc(100% - 50px)
              )`,
            }}
          >
            {/* Avatar */}
            <div className="p-4 bg-primary/10 flex flex-col justify-center rounded-full">
              <img
                src={avatar}
                alt="avatar"
                className="p-4 bg-primary/30 rounded-full min-w-[100px] max-w-[200px] w-[20vw] mx-auto"
              />
            </div>

            <div className="flex flex-col justify-between items-center">
              <h2>ALAO HERITAGE</h2>
              <p>
                ID NO: <span className="text-primary">JBLB-FOUNDER-2841</span>
              </p>
            </div>
          </div>

          <div
            className="bg-bgColor p-[20px] pt-[60px] border-2 border-t-0 border-primary w-full min-h-[150px] flex flex-col justify-center items-center gap-1"
            style={{
              clipPath: `polygon(
                8vw 0%,
                calc(100% - 8vw) 0%,
                100% 50px,
                100% 100%,
                0% 100%,
                0% 50px
              )`,
            }}
          >
            <div className="flex justify-around w-full gap-1">
              {Array.from({ length: screenWidth }).map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i === 4 || i === screenWidth - 4 ? "h-[70px]" : "h-[50px]"
                  } w-[0.8vw] bg-primary`}
                />
              ))}
            </div>
            <div className="flex relative top-[-2] gap-2 flex-wrap justify-center items-center">
              <p className="text-bodyTextDim">Powered by JBLB</p>
              <img src={logo} alt="Logo" className="size-6" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="sm:!text-2xl md:!text-3xl font-bold">
            Congratulations You're now <span className="text-primary">on the List!</span>
          </h2>
          <p className="text-bodyTextDim">
            <span className="text-white">Your spot is reserved.</span> You're now part of the{" "}
            <span className="text-white">inner circle</span> getting first access to the world's first
            YieldSport™.
          </p>
          <div className="flex justify-center gap-2 flex-wrap items-center">
            <Button
              title="SHARE ON X"
              icon="prime:twitter"
              className="bg-primary text-black px-4 py-2 whitespace-nowrap"
            />
            <Button
              title="DOWNLOAD"
              icon="material-symbols:download"
              className="bg-bgColor text-white px-4 py-2"
              onClick={downloadImage}
            />
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

export const useScreenWidth = () => {
  const [width, setWidth] = useState(() =>
    Math.round(window.innerWidth / 10) / 2
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const rounded = Math.round(Math.round(w / 10) / 2);
      setWidth(rounded);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default Congratulations;
