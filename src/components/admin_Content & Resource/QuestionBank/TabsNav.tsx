import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const tabs = [
  { name: "Question Bank", path: "/question-bank" },
  { name: "Flashcard", path: "/flashcard" },
  { name: "Clinical Case", path: "/clinical-case" },
  { name: "OSCE", path: "/osce" },
  { name: "Notes", path: "/notes" },
  { name: "Career Resource", path: "/career-resource" },
];

const TabsNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].path); // default first tab
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
    setOpen(false); // close drawer on mobile
  };

  return (
    <div className="relative px-2">
      {/* Desktop Tabs */}
      <div className="hidden sm:flex overflow-x-auto no-scrollbar border mb-6 p-2 rounded-2xl border-slate-300 bg-white">
        <div className="flex gap-2 flex-nowrap ">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex min-w-[6rem] sm:min-w-[7rem] md:min-w-[8rem] 
                h-8 sm:h-9 px-3 sm:px-4 justify-center items-center 
                rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base whitespace-nowrap transition ${
                  activeTab === tab.path
                    ? "bg-gradient-to-tr from-[#0076F5] to-[#0058B8] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex justify-start items-center mb-6">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side Drawer (mobile) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "220px" }}
      >
        {/* Header with Close */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Tabs inside drawer */}
        <div className="flex flex-col p-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex w-full px-4 py-2 rounded-lg text-sm ${
                activeTab === tab.path
                  ? "bg-gradient-to-tr from-[#0076F5] to-[#0058B8] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsNav;