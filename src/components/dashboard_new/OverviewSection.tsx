import React from "react";
import OverviewCard from "./OverviewCard";

const demoOverview = [
  {
    icon: "/image/dashboard_new/Background.svg",
    title: "82%",
    subtitle: "Overall Accuracy",
    stats: [
      { label: "Quiz Test", value: "82%" },
      { label: "Clinical Case", value: "75%" },
      { label: "OSCE", value: "75%" },
    ],
  },
  {
    icon: "/image/dashboard_new/Background1.svg",
    title: "4.5 hrs",
    subtitle: "Total Study Time",
    stats: [
      { label: "Quiz Test", value: "30 minutes" },
      { label: "Clinical Case", value: "12 minutes" },
      { label: "OSCE", value: "10 minutes" },
    ],
  },
  {
    icon: "/image/dashboard_new/Background2.svg",
    title: "04",
    subtitle: "Current Streak",
  },
];

const OverviewSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoOverview.map((card, i) => (
          <OverviewCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
