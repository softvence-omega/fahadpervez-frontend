import React from "react";
import Header from "@/components/dashboard_new/Header";
import OverviewSection from "@/components/dashboard_new/OverviewSection";
import SmartStudyPlan from "@/components/dashboard_new/SmartStudyPlan";
import DailyChallenge from "@/components/dashboard_new/DailyChallenge";
import PerformanceBySubject from "@/components/dashboard_new/PerformanceBySubject";
import WeeklyLeaderboard from "@/components/dashboard_new/WeeklyLeaderboard";
import WeeklyHighlights from "@/components/dashboard_new/WeeklyHighlights";

const Dashboard: React.FC = () => {
  return (
    <div className="my-6 md:my-10">
      {/* Header */}
      <Header userName="Emma Harrison" goal="Anatomy" dailyTarget="2 hours" />

      {/* Overview Section */}
      <OverviewSection />

      {/* Smart Study Plan + Daily Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SmartStudyPlan />
        <DailyChallenge />
      </div>

      {/* Performance by Subject + Weekly Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceBySubject />
        <WeeklyLeaderboard />
      </div>

      {/* Highlights of the Week */}
      <div className="mb-6">
        <WeeklyHighlights />
      </div>
    </div>
  );
};

export default Dashboard;
