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
import QuizCollection from "@/pages/dashboard/quizGenerator/QuizCollection";
import AllGeneratedQuiz from "@/pages/dashboard/quizGenerator/AllGeneratedQuiz";
import FlashCardGenerator from "@/pages/dashboard/flashcard/FlashCardGenerator";
import FlashCardCollection from "@/pages/dashboard/flashcard/FlashCardCollection";
import AllGeneratedFlashCard from "@/pages/dashboard/flashcard/AllGeneratedFlashCard";
import QuizPage from "@/pages/dashboard/quizGenerator/QuizPage";
import Quiz from "@/pages/dashboard/quizGenerator/Quiz";
import AnswerOverview from "@/pages/dashboard/quizGenerator/AnswerOverview";

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
      children: [

      ]
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
