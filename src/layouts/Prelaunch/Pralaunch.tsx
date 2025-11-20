import { bgMain } from "../../assets/images";
import { Footer } from "./components/Footer";
import HeroSection from "./components/HeroSectionAlt";
import Section5 from "./components/Section5";

const Prelaunch = () => {
  return (
    <div
        className="bg-[#000004] absolute fit w-full  opacity-100  bg-center text-white"
        
      >
        <div
          className="w-[5vw] absolute left-0 top-0 h-full opacity-50 bg-repeat-y bg-top"
          style={{ backgroundImage: `url(${bgMain})` }}
        ></div>
        <div
          className="w-[5vw] absolute right-0 top-0 h-full opacity-50 bg-repeat-y bg-top"
          style={{ backgroundImage: `url(${bgMain})` }}
        ></div>
        <Footer />
        <div className="mx-[7vw] relative mb-[40vh]">
          <HeroSection />
          <Section5/>
        </div>
              
      </div>
  );
};

export default Prelaunch;