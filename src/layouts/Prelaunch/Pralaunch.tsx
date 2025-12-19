import { bgMain } from "../../assets/images";
import { Footer } from "./components/Footer";
import HeroSection from "./components/HeroSectionAlt";
import Faq from "./components/Faq.tsx";
import Solution from "./components/Solution.tsx";
import Video from "./components/Video.tsx";
import { useNavigate } from "react-router-dom";
import { ParticleButton } from "../../components/ui/particle-button";

const Prelaunch = () => {
  const navigate = useNavigate();

  return (
    <div
        className="bg-[#000004] absolute fit w-full  opacity-100  bg-center text-white"
        
      >
        <div
          className="w-[7vw] border-r-2 border-borderColor z-[50] absolute left-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
          style={{ backgroundImage: `url(${bgMain})` }}
        ></div>
        <div
          className="border-l-2 border-borderColor w-[7vw] absolute z-[50] right-0 top-0 h-full opacity-70 bg-repeat-y bg-top"
          style={{ backgroundImage: `url(${bgMain})` }}
        ></div>
        
        {/* Hub Button - Top Right */}
        <div className="fixed top-6 right-6 z-[100]">
          <ParticleButton
            onClick={() => navigate("/hub")}
            onSuccess={() => navigate("/hub")}
            className="px-6 py-3 text-sm"
          >
            Hub
          </ParticleButton>
        </div>
        
          <Footer />

        <div className=" px-2 mx-[7vw] relative mb-[40vh]">
          
          <HeroSection />
          <Video />
          <Solution />
          <Faq/>
        </div>
              
      </div>
  );
};

export default Prelaunch;