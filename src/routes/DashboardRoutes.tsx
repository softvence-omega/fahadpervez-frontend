// DashboardRoutes.tsx
import DashboardLayout from "@/Layout/dashboard/DashboardLayout";
import AITutor from "@/pages/dashboard/AI Tutor/AITutor";
import ClinicalCaseGenerator from "@/pages/dashboard/ClinicalCaseGenerator";
import CommunityEvent from "@/pages/dashboard/CommunityEvent";
import Courses from "@/pages/dashboard/Courses";
import CreateNotes from "@/pages/dashboard/downloadNotes/CreateNotes";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DiagramExplorer from "@/pages/dashboard/DiagramExplorer";
import DownloadNotes from "@/pages/dashboard/downloadNotes/DownloadNotes";
import FlashcardPage from "@/pages/dashboard/flashcard/FlashcardPage";
import GamifiedLearning from "@/pages/dashboard/GamifiedLearning";
import McqBank from "@/pages/dashboard/McqBank";
import QuizGenerator from "@/pages/dashboard/quizGenerator/QuizGenerator";
import QuizCollection from "@/pages/dashboard/quizGenerator/QuizCollection";
import AllGeneratedQuiz from "@/pages/dashboard/quizGenerator/AllGeneratedQuiz";
import FlashCardGenerator from "@/pages/dashboard/flashcard/FlashCardGenerator";
import FlashCardCollection from "@/pages/dashboard/flashcard/FlashCardCollection";
import AllGeneratedFlashCard from "@/pages/dashboard/flashcard/AllGeneratedFlashCard";
import ClinicalCaseDetails from "@/components/dashboard/clinical-case/ClinicalCaseDetails";
import QuizPage from "@/pages/dashboard/quizGenerator/QuizPage";
import Quiz from "@/pages/dashboard/quizGenerator/Quiz";
import AnswerOverview from "@/pages/dashboard/quizGenerator/AnswerOverview";
import SolveFlashCard from "@/pages/dashboard/flashcard/SolveFlashCard";
import AllCommunities from "@/components/dashboard/community-event/AllCommunities";
import CareerResourcePage from "@/pages/dashboard/careerResource/CareerResourcePage";
import MyResource from "@/pages/dashboard/careerResource/MyResource";
import StudyPlan from "@/pages/dashboard/study plan/StudyPlan";
import CreateStudyPlan from "@/pages/dashboard/study plan/CreateStudyPlan";
import MyPlan from "@/pages/dashboard/study plan/MyPlan";
import WeeklyPlan from "@/pages/dashboard/study plan/WeeklyPlan";
import StudentProfile from "@/pages/dashboard/student profile/StudentProfile";

const dashboardRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardHome />,
    },
    {
      path: "community-event",
      element: <CommunityEvent />,
    },
    {
      path: "all-communities",
      element: <AllCommunities />,
    },
    {
      path: "ai-tutor",
      element: <AITutor />,
    },
    {
      path: "mcq-bank",
      element: <McqBank />,
    },
    {
      path: "quiz-generator",
      element: <QuizGenerator />,
    },
    {
      path: "clinical-case-generator",
      element: <ClinicalCaseGenerator />,
    },
    {
      path: "clinical-case/:id",
      element: <ClinicalCaseDetails />,
    },
    {
      path: "diagram-explorer",
      element: <DiagramExplorer />,
    },
    {
      path: "courses",
      element: <Courses />,
    },
    {
      path: "gamified-learning",
      element: <GamifiedLearning />,
    },
    {
      path: "download-notes",
      element: <DownloadNotes />,
    },
    {
      path: "create-note",
      element: <CreateNotes />,
    },
    {
      path: "quiz-page",
      element: <QuizPage />,
    },
    {
      path: "quiz-collection",
      element: <QuizCollection />,
    },
    {
      path: "all-generated-quiz",
      element: <AllGeneratedQuiz />,
    },
    {
      path: "quiz/:id",
      element: <Quiz />,
    },
    {
      path: "quiz-answer-overview/:id",
      element: <AnswerOverview />,
    },
    {
      path: "flashcard-page",
      element: <FlashcardPage />,
      children: [],
    },
    {
      path: "flashcard-generator",
      element: <FlashCardGenerator />,
    },
    {
      path: "flashcard-collection",
      element: <FlashCardCollection />,
    },
    {
      path: "all-flash-card",
      element: <AllGeneratedFlashCard />,
    },
    {
      path: "solve-flash-card/:id",
      element: <SolveFlashCard />,
    },
    {
      path: "resources",
      element: <CareerResourcePage />,
    },
    {
      path: "my-resources",
      element: <MyResource />,
    },
    {
      path: "study-plan",
      element: <StudyPlan />,
    },
    {
      path: "create-study-plan",
      element: <CreateStudyPlan />,
    },
    {
      path: "my-plan",
      element: <MyPlan />,
    },
    {
      path: "weekly-plan/:id",
      element: <WeeklyPlan />,
    },
    {
      path: "student-profile",
      element: <StudentProfile />,
    },
  ],
};

export default dashboardRoutes;
