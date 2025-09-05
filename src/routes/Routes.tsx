import { createBrowserRouter } from "react-router-dom";

import authRoutes from "./AuthRoutes";
import homeRoutes from "./HomeRoutes";
import NotFound from "@/pages/NotFound";

const routes = createBrowserRouter([
  homeRoutes,

  ...authRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
