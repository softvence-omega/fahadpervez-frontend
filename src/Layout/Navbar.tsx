// import UserAvatar from "@/ui/UserAvatar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "@/hooks/useRedux";
// import { logout } from "@/store/Slices/AuthSlice/authSlice";

import Logo from "../assets/home/Logo.png"
import CommonWrapper from "@/common/CommonWrapper";


const Navbar: React.FC = () => {
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <nav className="bg-[#E2E8F0] shadow-lg py-3">
      <CommonWrapper>
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">
                <img src={Logo} alt="" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 text-[#09090B]">
              <Link
                to="/"
                className="hover:text-[#0058B8] px-3 py-2 rounded-md font-medium"
              >
                Home
              </Link>
              <Link
                to="/tools"
                className="hover:text-[#0058B8] px-3 py-2 rounded-md font-medium"
              >
                Tools
              </Link>
              <Link
                to="/for-students"
                className="hover:text-[#0058B8] px-3 py-2 rounded-md font-medium"
              >
                For Students
              </Link>
              <Link
                to="/news"
                className="hover:text-[#0058B8] px-3 py-2 rounded-md font-medium"
              >
                News & Insights
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* right side button */}
            <div>

              <div className="space-x-6">
                <button className="bg-white px-4 py-2 rounded-[6px] text-[#0058B8] font-medium cursor-pointer">Registration</button>
                <button className="text-white px-8 py-2 rounded-[6px] bg-[#0058B8] font-medium cursor-pointer">Login</button>

              </div>

              {/* <Popover>
              <PopoverTrigger>
                <UserAvatar userName="Akash" />
              </PopoverTrigger>
              <PopoverContent className="mr-3 bg-website-color-darkGray border-none text-white">
                <Button
                  onClick={handleLogout}
                  className="bg-website-color-lightGray text-black w-full"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover> */}
            </div>

          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
