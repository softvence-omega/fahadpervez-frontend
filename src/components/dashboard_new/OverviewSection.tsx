import React from "react";
import OverviewCard from "./OverviewCard";

import { useGetGoalOverviewQuery } from "@/store/features/goal/goal.api";

const OverviewSection: React.FC = () => {
  const { data: overviewData } = useGetGoalOverviewQuery();

  // dynamic data mapping
  const overallAccuracy = overviewData?.data?.progress?.overall ?? 0;
  // const totalStudyTime = overviewData?.data?.timeCount?.todayStudy ?? 0;
  // sum up all time counts for total study time
  // const totalStudyTime = overviewData?.data?.timeCount
  //   ? Object.values(overviewData.data.timeCount).reduce(
  //       (a: number, b: number) => a + b,
  //       0
  //     )
  //   : 0;
  const currentStreak = overviewData?.data?.steak ?? 0;

  const dynamicOverview = [
    {
      icon: "/image/dashboard_new/Background.svg",
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
      ], },
    {
      icon: "/image/dashboard_new/Background1.svg",
      title:  `${overviewData?.data?.timeCount?.todayStudy ?? 0} hrs`,//`${(totalStudyTime / 60).toFixed(1)} hrs`, // assuming api returns minutes? If hours, remove /60. Usually "timeCount" is seconds or minutes. Assuming minutes for now based on "30 minutes" in dummy.
      subtitle: "Total Study Time",
      stats: [
        {
          label: "Quiz Test",
          value: `${overviewData?.data?.timeCount?.mcq ?? 0} hrs`,
        },
        {
          label: "Clinical Case",
          value: `${overviewData?.data?.timeCount?.clinicalCase ?? 0} hrs`,
        },
        {
          label: "OSCE",
          value: `${overviewData?.data?.timeCount?.osce ?? 0} hrs`,
        },
      ],
    },
    {
      icon: "/image/dashboard_new/Background2.svg",
      title: `${currentStreak < 10 ? `0${currentStreak}` : currentStreak}`,
      subtitle: "Current Streak",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dynamicOverview.map((card, i) => (
          <OverviewCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
