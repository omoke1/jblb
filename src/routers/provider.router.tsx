import { createBrowserRouter } from "react-router-dom";

// Layouts / Pages
import Prelaunch from "../layouts/Prelaunch/Pralaunch";
import Congratulations from "../layouts/Prelaunch/Congratulations";
import Dashboard from "../layouts/Prelaunch/Dashboard";

// DeFi Hub
import { DeFiHubLayout } from "../layouts/DeFiHub/DeFiHubLayout";
import { HubHome } from "../layouts/DeFiHub/HubHome";
import { BlockchainDetail } from "../layouts/DeFiHub/BlockchainDetail";
import { ProtocolDetail } from "../layouts/DeFiHub/ProtocolDetail";

// Error Handling
import { RouteErrorDisplay } from "../components/ErrorBoundary";
import { NotFoundPage } from "../components/NotFoundPage";

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
    errorElement: <RouteErrorDisplay />,
  },

  {
    path: ProviderRoutePaths.WaitlistCongratulations,
    Component: Congratulations,
    errorElement: <RouteErrorDisplay />,
  },

  {
    path: ProviderRoutePaths.WaitlistDashboard,
    Component: Dashboard,
    errorElement: <RouteErrorDisplay />,
  },

  {
    path: "/hub",
    Component: DeFiHubLayout,
    errorElement: <RouteErrorDisplay />,
    children: [
      {
        index: true,
        Component: HubHome,
      },
      {
        path: "blockchain/:id",
        Component: BlockchainDetail,
      },
      {
        path: "protocol/:id",
        Component: ProtocolDetail,
      },
    ],
  },

  {
    path: ProviderRoutePaths.ErrorPage,
    Component: NotFoundPage,
  },
]);
