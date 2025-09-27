import React from "react";
// import { Clock } from "lucide-react";

interface OverviewCardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, title, subtitle, stats }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center">
          {/* {icon || <div className="w-6 h-6 bg-blue-500 rounded-full"></div>} */}
          <img src={icon} className="w-full h-full" alt="alt" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-gray-900">{title}</div>
          {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
        </div>
      </div>
      {stats && (
        <div className="grid grid-cols-3 gap-4 text-sm">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-semibold text-gray-900 text-nowrap text-center">{s.value}</div>
              <div className="text-gray-600 text-nowrap text-center">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewCard;
