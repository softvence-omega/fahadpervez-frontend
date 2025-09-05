// src/routes/AuthRoutes.tsx
import Login from "@/pages/authPage/Login";
import SetPassword from "@/pages/authPage/SetPassword";
import Signup from "@/pages/authPage/Signup";
import VerificationOTP from "@/pages/authPage/VerificationOTP";

const authRoutes = [
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
];

export default authRoutes;
