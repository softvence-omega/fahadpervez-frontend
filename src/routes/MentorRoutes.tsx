import MentorLayout from "@/Layout/dashboard/MentorLayout";
import MentorDashboard from "@/pages/mentor/MentorDashboard";
import MentorEarnings from "@/pages/mentor/MentorEarnings";
import MentorMaterials from "@/pages/mentor/MentorMaterials";
import MentorQuestionBank from "@/pages/mentor/MentorQuestionBank";
import MentorSessionDetails from "@/pages/mentor/MentorSessionDetails";
import RecentTransaction from "@/pages/mentor/RecentTransaction";

const mentorRoutes = {
  path: "/mentor",
  element: <MentorLayout />,
  children: [
    {
      index: true,
      element: <MentorDashboard />,
    },
    {
      path: "question-bank",
      element: <MentorQuestionBank />,
    },
    {
      path: "classes",
      element: <MentorQuestionBank />,
    },
    {
      path: "session-details/:id",
      element: <MentorSessionDetails />,
    },
    {
      path: "materials",
      element: <MentorMaterials />,
    },
    {
      path: "earnings",
      element: <MentorEarnings />,
    },
    {
      path: "recent-transaction",
      element: <RecentTransaction />,
    },
  ],
};

export default mentorRoutes;
