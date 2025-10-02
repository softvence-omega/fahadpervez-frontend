import MentorLayout from "@/Layout/dashboard/MentorLayout";
import MentorDashboard from "@/pages/mentor/MentorDashboard";
import MentorEarnings from "@/pages/mentor/MentorEarnings";
import MentorMaterials from "@/pages/mentor/MentorMaterials";
import MentorProfilePage from "@/pages/mentor/mentorProfilePages/MentorProfilePage";
import MentorReviewPage from "@/pages/mentor/mentorProfilePages/MentorReviewPage";
import MentorQuestionBank from "@/pages/mentor/questionBank/MentorQuestionBank";
import MentorSessionDetails from "@/pages/mentor/MentorSessionDetails";
import RecentTransaction from "@/pages/mentor/RecentTransaction";
import CreateQuestionBank from "@/pages/mentor/questionBank/CreateQuestionBank";
import CreateQuestion from "@/pages/mentor/questionBank/CreateQuestion";
import MentorClasses from "@/pages/mentor/mentorClasses/MentorClasses";

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
      path: "create-question-bank",
      element: <CreateQuestionBank />,
    },
    {
      path: "create-question",
      element: <CreateQuestion />,
    },
    {
      path: "classes",
      element: <MentorClasses />,
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
    {
      path: "mentor-profile",
      element: <MentorProfilePage />,
    },
    {
      path: "mentor-review",
      element: <MentorReviewPage />,
    },
  ],
};

export default mentorRoutes;
