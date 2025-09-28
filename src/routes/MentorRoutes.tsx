import MentorLayout from "@/Layout/dashboard/MentorLayout";
import MentorDashboard from "@/pages/mentor/MentorDashboard";
import MentorEarnings from "@/pages/mentor/MentorEarnings";
import MentorMaterials from "@/pages/mentor/MentorMaterials";
import MentorQuestionBank from "@/pages/mentor/MentorQuestionBank";

const mentorRoutes = {
  path: "/mentor",
  element: <MentorLayout />,
  children: [
    {
      index: true,
      path: "dashboard",
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
      path: "materials",
      element: <MentorMaterials />,
    },
    {
      path: "earnings",
      element: <MentorEarnings />,
    },
  ],
};

export default mentorRoutes;
