import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode; // Icon prop
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="p-4 flex flex-col items-start gap-6 shadow-sm rounded-xl border border-slate-300 bg-white w-full max-w-sm sm:max-w-md md:max-w-lg">
      {/* Header */}
      <div className="flex w-full px-4 sm:px-6 justify-between items-center">
        <h3 className="text-[#0A0A0A] font-sans text-sm font-normal leading-5 truncate">
          {title}
        </h3>
        {icon && <div className="mt-1">{icon}</div>}
      </div>

      {/* Content */}
      <div className="flex w-full px-4 sm:px-6 flex-col items-start">
        <p className="text-[#0A0A0A] font-sans text-2xl font-semibold leading-5 truncate">
          {value}
        </p>
        {subtitle && (
          <span className="text-black font-sans text-xs font-normal mt-2 leading-4 truncate text-wrap">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
