import { mentorsData } from "@/components/AdminDashboard/userManagement/mentor/data";
import MentorTable from "@/components/AdminDashboard/userManagement/mentor/MentorTable";
import MentorTop from "@/components/AdminDashboard/userManagement/mentor/MentorTop";

const Mentor = () => {
  return (
    <div>
      <MentorTop />
      <MentorTable mentor={mentorsData} />
    </div>
  );
};

export default Mentor;
