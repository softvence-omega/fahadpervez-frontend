import { createBrowserRouter } from "react-router-dom";

import authRoutes from "./AuthRoutes";
import homeRoutes from "./HomeRoutes";
import NotFound from "@/pages/NotFound";
import dashboardRoutes from "./DashboardRoutes";

const routes = createBrowserRouter([
  homeRoutes,
  dashboardRoutes,
  ...authRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
