import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const Layout: React.FC = () => {
  return (
    <div>
      <DashboardNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
