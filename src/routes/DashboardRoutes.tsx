// DashboardRoutes.tsx
import DashboardLayout from "@/Layout/dashboard/DashboardLayout";
import AITutor from "@/pages/dashboard/AITutor";
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
import QuizPage from "@/pages/dashboard/quizGenerator/QuizPage";
import AllGeneratedQuiz from "@/pages/dashboard/quizGenerator/AllGeneratedQuiz";
import FlashCardGenerator from "@/pages/dashboard/flashcard/FlashCardGenerator";
import FlashCardCollection from "@/pages/dashboard/flashcard/FlashCardCollection";
import AllGeneratedFlashCard from "@/pages/dashboard/flashcard/AllGeneratedFlashCard";
import ClinicalCaseDetails from "@/components/dashboard/clinical-case/ClinicalCaseDetails";

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
      path: "ai-tutor",
      element: <AITutor />,
    },
    {
      path: "mcq-bank",
      element: <McqBank />,
    },
    {
      path: "flashcard-page",
      element: <FlashcardPage />,
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
      path: "all-generated-quiz",
      element: <AllGeneratedQuiz />,
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
  ],
};

export default dashboardRoutes;
