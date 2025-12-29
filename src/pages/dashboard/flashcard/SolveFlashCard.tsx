import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeHelp } from "lucide-react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  useGetSingleFlashCardQuery,
  useGetSingleGeneratedFlashCardQuery,
} from "@/store/features/flashCard/flashCard.api";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import GlobalLoader2 from "@/common/GlobalLoader2";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Flashcard Generator", link: "/dashboard/flashcard-generator" },
];

export default function SolveFlashCard() {
  const { id } = useParams();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 🔥 Get flashcard data from navigate() state
  const stateFlashcardData = location.state?.flashCardData;
  const source = location.state?.source || "all";

  // console.log("SolveFlashCard State Data:", stateFlashcardData);
  // console.log("SolveFlashCard ID:", id);
  // console.log("SolveFlashCard Source:", source);

  // 🔥 Do NOT call API if we already have state data
  // Call standard API if source is 'all' (and no pre-loaded data)
  const { data: standardData, isLoading: isStandardLoading } =
    useGetSingleFlashCardQuery(id as string, {
      skip: !!stateFlashcardData || source === "generated",
    });

  // Call generated API if source is 'generated' (and no pre-loaded data)
  const { data: generatedData, isLoading: isGeneratedLoading } =
    useGetSingleGeneratedFlashCardQuery(id as string, {
      skip: !!stateFlashcardData || source !== "generated",
    });

  const isLoading = isStandardLoading || isGeneratedLoading;

  // 🔥 Final data from either source
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let flashCardData: any =
    stateFlashcardData ||
    (source === "generated" ? generatedData?.data : standardData?.data);

  // Handle case where it's a direct array (fallback for legacy/direct data)
  if (Array.isArray(flashCardData)) {
    flashCardData = {
      flashCards: flashCardData,
      title: "Generated Session",
      subject: "AI Generated",
    };
  }

  // console.log("Final FlashCard Data to Render:", flashCardData);

  if (!flashCardData && isLoading) return <GlobalLoader2 />;

  if (
    !flashCardData ||
    !flashCardData.flashCards ||
    flashCardData.flashCards.length === 0
  ) {
    return <p>No flashcards found.</p>;
  }

  // Convert API/state data into usable format
  const questions = flashCardData.flashCards.map((fc: any) => ({
    id: fc?.flashCardId,
    tag: fc?.difficulty,
    text: fc?.frontText,
    answer: fc?.backText,
    explanation: fc?.explanation,
    image: fc?.image,
  }));

  // Navigation functions
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Session Completed!
        </h1>
        <p className="text-gray-600 mb-4">
          You've reviewed all {questions?.length} flashcards.
        </p>
        <Button
          onClick={() => {
            setIsCompleted(false);
            setCurrentQuestion(0);
          }}
        >
          Restart Session
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-2 px-2">
      <div className="text-sm text-gray-600">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex items-start gap-3 mb-4">
        <Link to={"/dashboard/flashcard-page"} className="mt-0.5">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title={flashCardData?.title}
          titleColor="text-[#0A0A0A]"
          titleSize="text-xl"
          description="Flip the card to check the correct answer."
          descColor="text-[#4A5565]"
          descSize="text-sm"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        {/* <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">
          <h2 className="font-semibold mb-2">{flashCardData?.title}</h2>
          <p className="text-sm text-gray-600 mb-4">
            {questions.length} Flashcards • {flashCardData?.subject}
          </p>

          {questions.map((q: any, index: number) => (
            <div
              key={q?.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                index === currentQuestion
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => {
                setIsFlipped(false);
                setCurrentQuestion(index);
              }}
            >
              Card {index + 1}
            </div>
          ))}
        </div> */}

        <div
          className={`bg-white rounded-lg shadow transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-1/6" : "w-10"}
  `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-b-slate-300">
            {isSidebarOpen && (
              <div>
                <h2 className="font-semibold">{flashCardData?.title}</h2>
                <p className="text-sm text-gray-600">
                  {questions.length} Flashcards • {flashCardData?.subject}
                </p>
              </div>
            )}

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              title={isSidebarOpen ? "Collapse" : "Expand"}
            >
              {isSidebarOpen ? "❮" : "❯"}
            </button>
          </div>

          {/* Scrollable List */}
          <div
            className={`overflow-y-auto transition-all
    ${isSidebarOpen ? "max-h-[500px] p-4" : "max-h-[500px] p-2"}
    `}
          >
            {questions.map((q: any, index: number) => (
              <div
                key={q?.id}
                className={`p-2 mb-2 rounded cursor-pointer text-sm
        ${
          index === currentQuestion
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentQuestion(index);
                }}
              >
                {isSidebarOpen ? `Card ${index + 1}` : index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Flashcard Box */}
        <div
          className={`flex flex-col items-center border border-slate-300 rounded-[8px] pb-7 px-5 transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-5/6" : "w-full md:w-[calc(100%-2.5rem)]"}
  `}
        >
          <div className="w-full max-w-2xl mt-7 mb-12 border border-slate-300 py-2 px-4 rounded-[8px]">
            <h3 className="font-medium text-slate-900">
              Review your Flashcard
            </h3>
            <p className="text-sm text-slate-900">
              Click card to reveal the answer
            </p>
          </div>

          {/* Flip Card */}
          <div
            className={`relative w-full max-w-2xl h-64 md:h-96 bg-white rounded-xl shadow-lg cursor-pointer transition-transform duration-500 preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 backface-hidden">
              <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-slate-600 py-1 px-2 rounded-r-3xl rounded-l-3xl">
                {questions[currentQuestion]?.tag}
              </span>

              <div className="text-center">
                <div className="bg-[#007BFF1A] p-2 rounded-full w-10 h-10 mx-auto">
                  <BadgeHelp />
                </div>
                <p className="text-lg text-black font-medium mt-4 mb-3">
                  Question
                </p>

                {questions[currentQuestion]?.image && (
                  <img
                    src={questions[currentQuestion]?.image}
                    alt=""
                    className="w-[300px] h-[150px] mb-2 rounded object-cover mx-auto"
                  />
                )}

                <p className="text-center">
                  {questions[currentQuestion]?.text}
                </p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-blue-50 rounded-xl rotate-y-180 backface-hidden">
              <h3 className="text-blue-600 font-semibold mb-2">Answer</h3>
              <p className="text-center text-lg mb-6">
                {questions[currentQuestion]?.answer}
              </p>

              {questions[currentQuestion]?.explanation && (
                <div className="w-full mt-2 pl-4 border-l-4 border-blue-200 text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Explanation
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    {questions[currentQuestion]?.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end gap-3 w-full mt-6">
            {currentQuestion > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-blue-main hover:bg-blue-700"
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
