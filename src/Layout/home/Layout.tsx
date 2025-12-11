import FaviconUpdater from "@/components/FaviconUpdater";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div>
      <FaviconUpdater />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
