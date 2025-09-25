"use client";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import CommonWrapper from "@/common/CommonWrapper";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "hero", label: "Home" },
    { to: "tools", label: "Tools" },
    { to: "study-plan", label: "Study Plan" },
    { to: "ai-tools", label: "AI Tools" },
    { to: "mentors", label: "Mentors" },
  ];

  return (
    <nav className="bg-slate-200 shadow sticky top-0 z-50 py-2">
      <CommonWrapper>
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-12 md:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo1.svg" alt="Logo" className="h-16" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 text-[#09090B] font-medium">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust for sticky navbar height
                  className="hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex space-x-4">
              <button className="bg-white px-4 py-2 rounded-[6px] text-[#0058B8] font-medium cursor-pointer">
                Registration
              </button>
              <button className="text-white px-8 py-2 rounded-[6px] bg-[#0058B8] font-medium cursor-pointer">
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-slate-100 border-t border-blue-400/20">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className="block text-[#09090B] hover:text-[#0058B8] px-3 py-2 rounded-md font-medium cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
