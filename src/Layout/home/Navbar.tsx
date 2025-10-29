import React, { useState } from "react";
import { scroller, Link as ScrollLink } from "react-scroll";
import CommonWrapper from "@/common/CommonWrapper";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout, selectUser } from "@/store/features/auth/auth.slice";
import Cookies from "js-cookie";

const navLinks = [
  { to: "hero", label: "Home", type: "scroll" },
  { to: "tools", label: "Tools", type: "scroll" },
  { to: "study-plan", label: "Study Plan", type: "scroll" },
  { to: "ai-tools", label: "AI Tools", type: "scroll" },
  { to: "mentors", label: "Mentors", type: "scroll" },
  { to: "/pricing", label: "Pricing", type: "route" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser); // get logged in user
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    Cookies.remove("accessToken"); // remove token
    navigate("/login"); // redirect
  };

  // Scroll logic that works even after navigation
  const handleScroll = (section: string) => {
    if (location.pathname !== "/") {
      // Go to home first
      navigate("/");
      // Wait a bit for the page to render, then scroll
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 500);
    } else {
      // Already on home, just scroll
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  return (
    <nav className="bg-slate-200 shadow sticky top-0 z-50 py-2">
      <CommonWrapper>
        <div className="px-4 sm:px- lg:px-0">
          <div className="flex items-center justify-between h-12 md:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-40 h-16 lg:h-20 " />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex md:justify-between text-[#09090B] font-medium">
              {navLinks.map((link) =>
                link.type === "scroll" ? (
                  <button
                    key={link.to}
                    onClick={() => handleScroll(link.to)}
                    className="hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer bg-transparent border-none whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-white px-8 py-2 rounded-[6px] bg-red-600 font-medium hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white px-4 py-2 rounded-[6px] text-[#0058B8] font-medium cursor-pointer"
                  >
                    Registration
                  </Link>
                  <Link
                    to="/login"
                    className="text-white px-8 py-2 rounded-[6px] bg-[#0058B8] font-medium cursor-pointer"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-blue-700 hover:text-blue-900 focus:outline-none"
              >
                {!isOpen ? <Menu size={28} /> : <X size={28} />}
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-100 border-t border-blue-400/20">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                className="block text-[#09090B] hover:text-[#0058B8] px-3 py-2 rounded-md font-medium cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}

            {/* Mobile Logout */}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-white px-4 py-2 rounded-md bg-red-600 font-medium hover:bg-red-700 cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
