import { createBrowserRouter } from "react-router-dom";

// Layouts / Pages
import Prelaunch from "../layouts/Prelaunch/Pralaunch";
import Congratulations from "../layouts/Prelaunch/Congratulations";
import Dashboard from "../layouts/Prelaunch/Dashboard";

// Route paths
export const ProviderRoutePaths = {
  Root: "/",
  Index: "/dashboard",
  SignIn: "/login",
  SignUp: "/register",
  Provider: "/provider",
  User: "/user",
  ResetPassword: "/reset-password",
  WaitlistCongratulations: "/waitlist/congratulations",
  WaitlistDashboard: "/waitlist/dashboard",
  ErrorPage: "*",

  Dashboard: {
    Index: "/dashboard",
    Overview: "/dashboard/overview",
  },
};

export const ProviderRouter = createBrowserRouter([
  {
    path: ProviderRoutePaths.Root,
    Component: Prelaunch,
  },

  {
    path: ProviderRoutePaths.WaitlistCongratulations,
    Component: Congratulations,
  },

  {
    path: ProviderRoutePaths.WaitlistDashboard,
    Component: Dashboard,
  },
]);
