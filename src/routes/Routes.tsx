import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Login from "@/pages/authPage/Login";
import Signup from "@/pages/authPage/Signup";
import Form from "@/pages/Form";
import Services from "@/pages/Services";
import VerificationOTP from "@/pages/authPage/VerificationOTP";
import SetPassword from "@/pages/authPage/SetPassword";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/form",
        element: <Form />,
      },

      {
        path: "/admin",
        element: <AdminRoute />, // This will check if the user is an admin
        children: [
          { path: "", element: <AdminDashboard /> }, // Admin Dashboard
        ],
      },
    ],

  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verification-otp",
    element: <VerificationOTP />,
  },
  {
    path: "/set-password",
    element: <SetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
