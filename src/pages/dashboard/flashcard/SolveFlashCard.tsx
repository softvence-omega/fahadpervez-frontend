import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeHelp } from "lucide-react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import { Link, useParams } from "react-router-dom";
import { useGetSingleFlashCardQuery } from "@/store/features/flashCard/flashCard.api";
import { IFlashcardBank } from "@/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Flashcard Generator", link: "/dashboard/flashcard-generator" },
];

export default function SolveFlashCard() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleFlashCardQuery(id as string);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const flashCardData: IFlashcardBank = data?.data;

  if (
    !flashCardData ||
    !flashCardData.flashCards ||
    flashCardData.flashCards.length === 0
  ) {
    return <p>No flashcards found.</p>;
  }

  const questions = flashCardData.flashCards.map((fc) => ({
    id: fc?.flashCardId,
    tag: fc?.difficulty,
    text: fc?.frontText,
    answer: fc?.backText,
    explanation: fc?.explanation,
  }));

  if (!questions || questions.length === 0) {
    return <p>No flashcards available.</p>;
  }

  // Navigation
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

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
    <div className="min-h-screen">
      <div className="text-sm text-gray-600">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>

      {/* <h1 className="text-xl font-bold mb-1">{flashCardData?.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Flip the card to check the correct answer.
      </p> */}

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
          className=""
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">{flashCardData?.title}</h2>
          <p className="text-sm text-gray-600 mb-4">
            {questions?.length} Flashcards • {flashCardData?.subject}
          </p>

          {questions?.map((q, index) => (
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
        </div>

        {/* Flashcard Box */}
        <div className="w-full md:w-3/4 flex flex-col items-center border border-slate-300 rounded-[8px] pb-7 px-5">
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
            className={`relative w-full max-w-2xl h-64 md:h-80 bg-white rounded-xl shadow-lg cursor-pointer transition-transform duration-500 preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 backface-hidden">
              <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-slate-600 py-1 px-2 rounded-r-3xl rounded-l-3xl">
                {questions?.[currentQuestion]?.tag}
              </span>

              <div className="text-center">
                <div className="bg-[#007BFF1A] p-2 rounded-full w-10 h-10 mx-auto">
                  <BadgeHelp />
                </div>
                <p className="text-lg text-black font-medium mt-4 mb-3">
                  Question
                </p>
                <p className="text-center">
                  {questions?.[currentQuestion]?.text}
                </p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-blue-50 rounded-xl rotate-y-180 backface-hidden">
              <h3 className="text-blue-600 font-semibold mb-2">Answer</h3>
              <p className="text-center text-lg">
                {questions?.[currentQuestion]?.answer}
              </p>
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

            {currentQuestion < questions?.length - 1 ? (
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
