import FaviconUpdater from "@/components/FaviconUpdater";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SocketTracker from "@/common/SocketTracker";

const Layout: React.FC = () => {
  return (
    <div>
      <FaviconUpdater />
      <SocketTracker />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
