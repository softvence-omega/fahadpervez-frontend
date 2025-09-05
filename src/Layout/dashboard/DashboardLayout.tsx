import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import CommonWrapper from "@/common/CommonWrapper";

const DashboardLayout: React.FC = () => {
  return (
    <div>
      <DashboardNavbar />
      <main>
        <CommonWrapper>
          <Outlet />
        </CommonWrapper>
      </main>
    </div>
  );
};

export default DashboardLayout;
