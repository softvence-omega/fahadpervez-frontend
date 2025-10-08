import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full">
      {/* --- Tabs for large screens --- */}
      <div className="hidden xl:flex items-center justify-start gap-4 px-4 py-2 bg-white border-b border-slate-200 rounded-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              flex-1 min-w-fit text-center
              py-2
              text-sm lg:text-base font-medium
              transition-all duration-200 rounded-full
              ${
                activeIndex === index
                  ? "bg-gradient-to-tr from-[#0076F5] to-[#0058B8] text-white"
                  : "text-gray-700 hover:text-blue-600"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- Mobile: Hamburger Menu --- */}
      <div className="xl:hidden flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200 rounded-full">
        <span className="font-medium text-sm text-gray-900">
          {tabs[activeIndex].label}
        </span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* --- Mobile Menu Content --- */}
      {mobileMenuOpen && (
        <div className="xl:hidden flex flex-col gap-2 px-4 py-2 bg-white border-b border-slate-200 rounded-b-lg shadow-md">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 rounded-lg transition-all duration-200
                ${
                  activeIndex === index
                    ? "bg-gradient-to-tr from-[#0076F5] to-[#0058B8] text-white"
                    : "text-gray-700 hover:text-blue-600 hover:bg-slate-100"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* --- Tab Content --- */}
      <div className="w-full h-full bg-gray-50 mt-2 sm:mt-4 p-2 sm:p-4 rounded-lg">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
