"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tools", label: "Tools" },
    { path: "/for-students", label: "For Students" },
    { path: "/news", label: "News & Insights" },
  ];

  return (
    <nav className="bg-slate-200 shadow sticky top-0 z-50 py-2">
      <CommonWrapper>
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-12 md:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">
                <img src="/logo1.svg" alt="Logo" className="h-16" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 text-[#09090B] font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-[#0058B8] px-3 py-2 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons (Desktop) */}
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
              <Link
                key={link.path}
                to={link.path}
                className="block text-[#09090B] hover:text-[#0058B8] px-3 py-2 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Buttons (Mobile) */}
            <div className="mt-4 space-y-2">
              <button className="w-full bg-white px-4 py-2 rounded-[6px] text-[#0058B8] font-medium">
                Registration
              </button>
              <button className="w-full text-white px-4 py-2 rounded-[6px] bg-[#0058B8] font-medium">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
