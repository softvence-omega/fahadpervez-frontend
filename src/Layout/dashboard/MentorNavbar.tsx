import { useState } from "react";
import {
  Search,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Globe,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";

const MentorNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get current location to determine active route
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", href: "/mentor" },
    { name: "Question Bank", href: "/mentor/question-bank" },
    { name: "Materials", href: "/mentor/materials" },
    { name: "Classes", href: "/mentor/classes" },
    { name: "Earnings", href: "/mentor/earnings" },
    { name: "Settings", href: "/mentor/mentor-setting" },
    { name: "Community", href: "/mentor/mentor-community" },
  ];

  const profileItems = [
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Profile", icon: User, href: "/mentor/mentor-profile" },
    { name: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
    { name: "Logout", icon: LogOut, href: "#" },
  ];

  // Function to check if route is active
  const isActiveRoute = (href: string) => {
    if (href === "/mentor") {
      // For dashboard, only match exact path
      return location.pathname === "/mentor";
    }
    // For other routes, check if current path starts with the href
    return location.pathname.startsWith(href);
  };

  // Function to check if any route in "more" items is active

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <CommonWrapper>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/dashboard">
              <img src="/logo1.svg " className="h-16" alt="" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type to search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-main focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Language & Notifications */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span className="">En</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">EH</span>
                </div>
                <span className="hidden lg:block text-gray-700 font-medium">
                  Emma Harrison
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Profile & Settings
                      </p>
                    </div>
                    {profileItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <item.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-wrap gap-4 lg:items-center  lg:space-x-2 mt-2">
            {navigationItems.slice(0, 10).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 font-medium text-sm transition-colors duration-200 text-nowrap  ${
                  isActiveRoute(item.href)
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  isActiveRoute(item.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MentorNavbar;
