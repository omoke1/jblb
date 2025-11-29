import { Icon } from "@iconify/react/dist/iconify.js";
import { playNowAlt } from "../../../assets/images";
import { useState, useRef } from "react";
import { waitlistVideo } from "../../../assets/videos";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="py-20  relative flex justify-center w-full overflow-hidden">
      
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
      <div className="w-full flex justify-center items-center h-fit">
        <div className="flex flex-col gap-2 bg-bgColor md:w-[60vw] max-w-[600px] p-4">
          <div className="flex items-start gap-1">
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
            <Icon icon="material-symbols:square" className="size-3 text-primary" />
          </div>

          {/* Video */}
          <div className="relative h-fit bg-bgColor">
            
            {/* Play Overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 z-20 bg-black/40 flex flex-col items-center justify-center cursor-pointer"
                onClick={handlePlay}
              >
                <img src={playNowAlt} alt="play now" className="relative h-3 sm:h-4 left-8 sm:left-14" />
                <div className=" top-[50px] inset-0 w-fit h-fit p-2 bg-bgColor opacity-60 text-white"> <Icon icon="ph:play-fill" width={30} className="" /> </div>
              </div>
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              src={waitlistVideo}
              className="relative w-full max-h-[280px]"
              loop
              muted
              controls={isPlaying}
              playsInline
            ></video>
          </div>
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

export default Video;
