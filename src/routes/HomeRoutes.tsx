import App from "@/App";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";

const homeRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "pricing",
      element: <Pricing />,
    },
    // {
    //   path: "/about",
    //   element: <About />,
    // },
    // {
    //   path: "/contact",
    //   element: <Contact />,
    // },
    // {
    //   path: "/services",
    //   element: <Services />,
    // },
  ],
};

export default homeRoutes;
