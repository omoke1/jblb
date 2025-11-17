import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import {Footer} from "../../components/Footer";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex relative">
      {/* Left Section */}
      <div className="relative w-[50%] h-[150vh] bg-gradient-to-b from-primary via-[#6b6565] to-primary hidden sm:block overflow-hidden">
        {/* Background Image */}
        {/* <img src={bgImage} className="size-[65vh] w-full object-cover" alt="bg" /> */}

        {/* Black Overlay */}
        <div className="absolute inset-0 h-[150vh] bg-black/70"></div>

        {/* Content */}
        <div className="absolute top-0 left-0 p-[3vw] w-[70%] text-white">
          <div className="h-[65vh] flex flex-col gap-6 items-start">
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-white p-2 rounded-2xl">
                {/* <img src={logo} alt="logo" className="size-10" /> */}
              </div>
              <h1 className="text-white">EcoCycle</h1>
            </div>
            <h1>Manage your circular product business with ease</h1>
            <p>
              Join thousands of providers and users on the fastest-growing circular economy platform.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Insightful Reports */}
            <div className="flex gap-4">
              <Icon
                icon="fluent:data-trending-20-filled"
                color="white"
                width={50}
                className="bg-[#FFFFFF33] rounded-full p-2"
              />
              <div>
                <p className="font-extrabold text-xl pb-2">Insightful Reports</p>
                <p>
                  Get clear, data-driven reports to understand trends and make smarter
                  decisions.
                </p>
              </div>
            </div>

            {/* Cross-Device Access */}
            <div className="flex gap-4">
              <Icon
                icon="mdi:devices"
                color="white"
                width={50}
                className="bg-[#FFFFFF33] rounded-full p-2"
              />
              <div>
                <p className="font-extrabold text-xl pb-2">Cross-Device Access</p>
                <p>
                  Seamlessly manage your account from desktop, tablet, or mobile.
                </p>
              </div>
            </div>

            {/* Advanced Security */}
            <div className="flex gap-4">
              <Icon
                icon="mdi:shield-check"
                color="white"
                width={50}
                className="bg-[#FFFFFF33] rounded-full p-2"
              />
              <div>
                <p className="font-extrabold text-xl pb-2">Advanced Security</p>
                <p>
                  Bank-level encryption and safeguards keep your data protected at all
                  times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-[50%] min-h-screen bg-bgColor p-[5vw] flex flex-col gap-4">
        {children}
      </div>
      <Footer/>
    </div>
  );
}

export default AuthLayout;
