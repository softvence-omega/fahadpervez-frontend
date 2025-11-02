import { useState } from "react";
import DashboardSearch from "../../reuseable/DashboardSearch";
import DashboardTopSection from "../../reuseable/DashboardTopSection";
import AddMentorTypeModal from "./AddMentorTypeModal";

const MentorTop = () => {
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  return (
    <div>
      <DashboardTopSection
        title="User Management"
        description="Manage student and mentor profiles, track activity, and handle mentor-mentee matching."
        buttonText="Add Mentor"
        action={() => setIsMentorModalOpen(true)}
      />
      <DashboardSearch className=" !rounded-none my-5" />
      <AddMentorTypeModal
        open={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default MentorTop;
