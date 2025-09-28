import { Outlet } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import MentorNavbar from "./MentorNavbar";

const MentorLayout: React.FC = () => {
  return (
    <div>
      <MentorNavbar />
      <main>
        <CommonWrapper>
          <Outlet />
        </CommonWrapper>
      </main>
    </div>
  );
};

export default MentorLayout;
