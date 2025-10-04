import CommonSpace from "@/common/space/CommonSpace";

import { LuUsers } from "react-icons/lu";
import DashboardTopSection from "../../../reuseable/DashboardTopSection";
import DashBoardCard from "../../../reuseable/DashBoardCard";

const dashboardStats = [
  {
    title: "Active Mentorship",
    value: 1250,
    subtitle: "Up 15% this month",
    icon: LuUsers,
    subtitleColor: "text-green-500",
    iconColor: "text-[#09090B]",
  },
  {
    title: "Completion Rate",
    value: "84%",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
    subtitle: "Up 25% this month",
  },
  {
    title: "Avg. Session Rating",
    value: 4.6,
    subtitle: "Excellent feedback",
    star: true,
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-[#000]",
  },
  {
    title: "Total Sessions",
    value: 87,
    subtitle: "This academic year",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-[#000]",
  },
];

const MentorOverviewTop = () => {
  return (
    <div>
      <DashboardTopSection
        title="Mentorship  Administration"
        description="Configure programs, track progress, and manage mentor-mentee relationships."
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

export default MentorOverviewTop;
