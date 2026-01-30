import React from "react";
import OverviewCard from "./OverviewCard";
import { Target, Clock, Flame } from "lucide-react";
import { useGetGoalOverviewQuery } from "@/store/features/goal/goal.api";

const OverviewSection: React.FC = () => {
  const { data: overviewData } = useGetGoalOverviewQuery();

  // dynamic data mapping
  const overallAccuracy = overviewData?.data?.progress?.overall ?? 0;
  const currentStreak = overviewData?.data?.steak ?? 0;

  const dynamicOverview = [
    {
      variant: "purple" as const,
      icon: <Target className="w-6 h-6 text-[#7F56D9]" />,
      title: `${Math.round(overallAccuracy)}%`,
      subtitle: "Overall Accuracy",
      stats: [
        {
          label: "Quiz Test",
          value: `${Math.round(overviewData?.data?.progress?.mcq ?? 0)}%`,
        },
        {
          label: "Clinical Case",
          value: `${Math.round(
            overviewData?.data?.progress?.clinicalCase ?? 0
          )}%`,
        },
        {
          label: "OSCE",
          value: `${Math.round(overviewData?.data?.progress?.osce ?? 0)}%`,
        },
      ],
    },
    {
      variant: "orange" as const,
      icon: <Clock className="w-6 h-6 text-[#D97706]" />,
      title: `${overviewData?.data?.timeCount?.todayStudy ?? 0} hrs`,
      subtitle: "Total Study Time",
      stats: [
        {
          label: "Quiz Test",
          value: `${overviewData?.data?.timeCount?.mcq ?? 0} minutes`,
        },
        {
          label: "Clinical Case",
          value: `${overviewData?.data?.timeCount?.clinicalCase ?? 0} minutes`,
        },
        {
          label: "OSCE",
          value: `${overviewData?.data?.timeCount?.osce ?? 0} minutes`,
        },
      ],
    },
    {
      variant: "green" as const,
      icon: <Flame className="w-6 h-6 text-[#16A34A]" />,
      title: `${currentStreak < 10 ? `0${currentStreak}` : currentStreak}`,
      subtitle: "Current Streak",
      footerText:
        "Study every day to build your streak and create a powerful learning habit",
    },
  ];



  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dynamicOverview.map((card, i) => (
          <OverviewCard
            key={i}
            {...card}
            className={i === 2 ? "md:col-span-2 lg:col-span-1 xl:col-span-2" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;

