import { createBrowserRouter, } from "react-router-dom";
import Landing from "../layouts/Landing/LandingAlt";
import Prelaunch from "../layouts/Prelaunch/Pralaunch";

export const ProviderRoutePaths = {
  Root: "/", // added root
  Index: "/dashboard",
  SignIn: "/login",
  SignUp: "/register",
  Provider: "/provider",
  User: "/user",
  ResetPassword: "/reset-password",
  ErrorPage: "*",

  Dashboard: {
    Index: "/dashboard",
    Overview: "/dashboard/overview",

    // Properties(propertyId?: string) {
    //   return {
    //     Index: "/dashboard/properties",
    //   };
    // },
  },
};

export const ProviderRouter = createBrowserRouter([
  // {
  //   path: ProviderRoutePaths.Root, // handle localhost/
  //   loader() {
  //     return redirect(ProviderRoutePaths.Root);
  //   },
  // },
  {
    path: ProviderRoutePaths.Root,
    Component: Prelaunch,
  },
]);
