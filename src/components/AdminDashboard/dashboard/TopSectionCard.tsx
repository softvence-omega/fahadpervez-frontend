import CommonSpace from "@/common/space/CommonSpace";
import { HiOutlineBookOpen } from "react-icons/hi2";
import DashBoardCard from "../reuseable/DashBoardCard";
import DashboardTopSection from "../reuseable/DashboardTopSection";

import { LuUsers } from "react-icons/lu";
// import { useGetDashboardDataQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";

const dashboardStats = [
  {
    title: "Total Students",
    value: 1250,
    subtitle: "Up 15% this month",
    icon: LuUsers,
    subtitleColor: "text-green-500",
    iconColor: "text-[#09090B]",
  },
  {
    title: "Total Professionals",
    value: `24,200`,
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
    subtitle: "Up 25% this month",
  },
  {
    title: "Active Mentors",
    value: `200`,
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
    subtitle: "Up 25% this month",
  },
  {
    title: "Content Items",
    value: `500`,
    icon: HiOutlineBookOpen,
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
    subtitleColor: "text-green-500",
  },

  {
    title: "Engagement Rate",
    value: 87,
    subtitle: "Up 19.8% this month",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
  },
  {
    title: "Daily AI Requests",
    value: 87,
    subtitle: "Up 18% this month",
    icon: LuUsers,
    iconColor: "text-[#09090B]",
    subtitleColor: "text-green-500",
  },
];

const TopSectionCard = () => {
  // const { data, isError, isLoading, error, refetch, isSuccess } =
  //   useGetDashboardDataQuery(undefined);

  return (
    <div>
      <DashboardTopSection
        title="Dashboard"
        description="Overview of your business"
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

export default TopSectionCard;
