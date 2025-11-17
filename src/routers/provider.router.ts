import { createBrowserRouter, redirect } from "react-router-dom";
import SignIn from "../layouts/SignInLayout/SignIn";
import SignUp from "../layouts/SignUpLayout/SignUp";
import Landing from "../layouts/Landing/LandingAlt";

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
    Component: Landing,
  },
  {
    path: ProviderRoutePaths.SignIn,
    Component: SignIn,
  },
  {
    path: ProviderRoutePaths.SignUp,
    Component: SignUp,
  },
]);
