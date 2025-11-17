import { bgMain } from "../../assets/images";
import { Footer } from "../../components/Footer";
import HeroSection from "./components/HeroSectionAlt";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";

const Landing = () => {
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

          <Footer/>
        <div className="mx-[7vw] relative mb-[40vh]">
          <HeroSection />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5/>
          <Section6/>
        </div>
              
      </div>
  );
};

export default Landing;