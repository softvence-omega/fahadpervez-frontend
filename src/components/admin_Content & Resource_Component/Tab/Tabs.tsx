import React, { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Tab Buttons */}
      <div
        className="
          flex 
          overflow-x-auto 
          no-scrollbar
          gap-2 sm:gap-4 
          px-2 sm:px-4 
          py-2 
          shadow-sm 
          border 
          rounded-2xl 
          border-slate-300 
          bg-white
          w-fit  
        "
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              px-3 sm:px-4 py-2  cursor-pointer
              rounded-2xl text-sm sm:text-base font-medium 
              whitespace-nowrap transition
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

      {/* Tab Content */}
      <div className="w-full  bg-gray-50 rounded-lg">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
