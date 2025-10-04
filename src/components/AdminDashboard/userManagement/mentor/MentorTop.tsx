import DashboardSearch from "../../reuseable/DashboardSearch";
import DashboardTopSection from "../../reuseable/DashboardTopSection";

const MentorTop = () => {
  return (
    <div>
      <DashboardTopSection
        title="User Management"
        description="Manage student and mentor profiles, track activity, and handle mentor-mentee matching."
      />
      <DashboardSearch className=" !rounded-none my-5" />
    </div>
  );
};

export default MentorTop;
