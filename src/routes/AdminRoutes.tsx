import AdminLayout from "@/Layout/dashboard/AdminLayout";
import PlatformPerformance from "@/pages/AdminDashboard/analyticAndReport/PlatformPerformance";
import CreateEvents from "@/pages/AdminDashboard/communityAndEvents/CreateEvents";
import UploadContent from "@/pages/AdminDashboard/contentAndResourse/UploadContent";
import AdminDashboard from "@/pages/AdminDashboard/dashboard/AdminDashboard";
import MentorsOverview from "@/pages/AdminDashboard/mentorshipManagement/MentorsOverview";
import Transaction from "@/pages/AdminDashboard/mentorshipManagement/Transaction";
import CreatePlan from "@/pages/AdminDashboard/planManagement/CreatePlan";
import Setting from "@/pages/AdminDashboard/settings/Setting";
import Mentor from "@/pages/AdminDashboard/userManagement/Mentor";
import Professional from "@/pages/AdminDashboard/userManagement/Professional";
import Student from "@/pages/AdminDashboard/userManagement/Student";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: "students",
      element: <Student />,
    },
    {
      path: "professional",
      element: <Professional />,
    },
    {
      path: "mentor",
      element: <Mentor />,
    },
    {
      path: "upload-content",
      element: <UploadContent />,
    },
    {
      path: "mentors-overview",
      element: <MentorsOverview />,
    },
    {
      path: "transaction",
      element: <Transaction />,
    },
    {
      path: "create-events",
      element: <CreateEvents />,
    },
    {
      path: "create-plan",
      element: <CreatePlan />,
    },
    {
      path: "platform-performance",
      element: <PlatformPerformance />,
    },
    {
      path: "settings",
      element: <Setting />,
    },
  ],
};

export default adminRoutes;
