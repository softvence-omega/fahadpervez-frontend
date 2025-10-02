import { LuUsers } from "react-icons/lu";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import DashBoardCard from "../reuseable/DashBoardCard";
import CommonSpace from "@/common/space/CommonSpace";
const dashboardStats = [
  {
    title: "Total Users",
    value: "1250",
    subtitle: "Up 15% this month",
    icon: LuUsers,
    subtitleColor: "text-[#000]",
    iconColor: "text-[#09090B]",
  },
  {
    title: "Daily Active Users",
    value: "34,200",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
    subtitle: "Up 25% this month",
  },
  {
    title: "Quiz Attempts",
    value: 320,
    subtitle: "Up 85% this month",

    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-[#000]",
  },
  {
    title: "Avg. Session Time",
    value: "42m",
    subtitle: "Up 18% this month",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-[#000]",
  },
];
const AnalyticTop = () => {
  return (
    <div>
      <DashboardTopSection
        title="Analytics & Reports"
        description="Comprehensive insights into platform performance and user engagement."
      />

      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, idx) => (
            <DashBoardCard key={idx} {...stat} />
          ))}
        </div>
      </CommonSpace>
    </div>
  );
};

export default AnalyticTop;
