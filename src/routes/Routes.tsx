import { createBrowserRouter } from "react-router-dom";

import authRoutes from "./AuthRoutes";
import homeRoutes from "./HomeRoutes";
import NotFound from "@/pages/NotFound";
import dashboardRoutes from "./DashboardRoutes";
import mentorRoutes from "./MentorRoutes";

import adminRoutes from "./AdminRoutes";
import UnauthorizedPage from "@/common/UnauthorizedPage";

const routes = createBrowserRouter([
  homeRoutes,
  dashboardRoutes,
  mentorRoutes,

  adminRoutes,

  ...authRoutes,
  {
    path: "unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
