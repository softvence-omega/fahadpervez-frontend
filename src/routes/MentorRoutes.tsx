// import MentorCommunityTabs from "@/components/mentorCommunity/MentorCommunityTabs";
import MentorLayout from "@/Layout/dashboard/MentorLayout";
import MentorCommunity from "@/pages/mentor/MentorCommunity";
import MentorDashboard from "@/pages/mentor/MentorDashboard";
import MentorEarnings from "@/pages/mentor/MentorEarnings";
import MentorMaterials from "@/pages/mentor/MentorMaterials";
import MentorQuestionBank from "@/pages/mentor/MentorQuestionBank";
import MentorSettings from "@/pages/mentor/MentorSettings";

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
      path: "materials",
      element: <MentorMaterials />,
    },
    {
      path: "earnings",
      element: <MentorEarnings />,
    },
    {
      path: "mentor-setting",
      element: <MentorSettings/>
    },
    {
      path:"mentor-community",
      element: <MentorCommunity/>
    }
  ],
};

export default mentorRoutes;
