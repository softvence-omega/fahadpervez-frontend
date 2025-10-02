import { FC } from "react";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import CommonSpace from "@/common/space/CommonSpace";
import DashBoardCard from "../reuseable/DashBoardCard";
import { RiCalendarTodoLine } from "react-icons/ri";

interface EventTopProps {
  handleCreateEvent: () => void;
}

const dashboardStats = [
  {
    title: "Total Events",
    value: "03",
    subtitle: "+12.3% from last month",
    icon: RiCalendarTodoLine,
    subtitleColor: "text-[#000]",
    iconColor: "!text-[#14B8A6]",
  },
  {
    title: "Total Registrations",
    value: "12",

    icon: RiCalendarTodoLine,
    iconColor: "text-[#14B8A6]",
    subtitleColor: "text-[##15803D]",
    subtitle: "+12% from last month",
  },
  {
    title: "Total Revenue",
    value: "$15,500",
    subtitle: "01 New this month",

    icon: RiCalendarTodoLine,
    iconColor: "!text-[#14B8A6]",
    subtitleColor: "text-[#000]",
  },
];
const EventTop: FC<EventTopProps> = ({ handleCreateEvent }) => {
  return (
    <div>
      <DashboardTopSection
        title="Event Management"
        description="Create and manage online events, seminars, and workshops"
        buttonText="Create Events"
        action={() => handleCreateEvent()}
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

export default EventTop;
