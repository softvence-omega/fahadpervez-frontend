/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalLoader from "@/common/GlobalLoader";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { useGetSingleMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { useUpdateProgressMcqFlashcardClinicalCaseMutation } from "@/store/features/goal/goal.api";
import { McqQuestion } from "@/types";
import { ArrowLeft, CircleAlert, Copy, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useBlocker, useSearchParams, useLocation } from "react-router-dom";
import QuizReportModal from "../quizGenerator/QuizReportModal";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
import { toast } from "sonner";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { PracticeQuizModal } from "./PracticeQuizModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PracticeMCQ() {
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationState] = useState(location.state);
  const { id } = useParams();

  // console.log("PracticeMCQ Navigation State (Saved):", navigationState);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Practice MCQ", link: `/dashboard/practice-mcq/${id}` },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const limit = 1;

  // Deriving currentPage directly from URL search params or localStorage
  const currentPage = (() => {
    const page = searchParams.get("page");
    if (page) return parseInt(page);
    const saved = localStorage.getItem(`lastPage_${id}`);
    return saved ? parseInt(saved) : 1;
  })();

  // Ensure URL is in sync with the derived page on initial load
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: currentPage.toString(), limit: limit.toString() }, { replace: true });
    }
  }, []);

  // Sync last viewed page to localStorage whenever it changes in URL
  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      localStorage.setItem(`lastPage_${id}`, page);
    }
  }, [searchParams, id]);

  const [skip, setSkip] = useState<number | undefined>(undefined);
  const [jumpQuestion, setJumpQuestion] = useState("");

  const storageKey = `mcq_practice_data_${id}`;

  // Track correctness of each question: { [qId]: boolean } (true=correct, false=incorrect)
  const [results, setResults] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).results : {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Block navigation if user has started answering but hasn't submitted
  const hasStarted = Object.keys(results).length > 0;

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasStarted &&
      !isSubmitting &&
      currentLocation.pathname !== nextLocation.pathname
  );



  const { data, isLoading } = useGetSingleMCQQuery({
    id: id as string,
    page: currentPage,
    limit,
    skip,
  });

  // Keep a local copy of data to prevent UI from disappearing during pagination fetches
  const [displayData, setDisplayData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setDisplayData(data);
    }
  }, [data]);

  // Reset display data when switching to a different MCQ bank
  useEffect(() => {
    setDisplayData(null);
  }, [id]);

  const [updateProgress] = useUpdateProgressMcqFlashcardClinicalCaseMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();

  const meta = data?.meta || displayData?.meta;
  const mcqData = data?.data || displayData?.data;
  const questions = mcqData?.mcqs || [];

  const isInitialLoading = isLoading && !displayData;

  const [selected, setSelected] = useState<{ [key: string]: number | null }>(
    () => {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).selected : {};
    }
  );
  const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>(
    () => {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).showAnswer : {};
    }
  );
  const [lockedQuestions, setLockedQuestions] = useState<{
    [key: string]: boolean;
  }>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).lockedQuestions : {};
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        selected,
        showAnswer,
        lockedQuestions,
        results,
      })
    );
  }, [selected, showAnswer, lockedQuestions, results, storageKey]);

  const [openReportModal, setOpenReportModal] = useState(false);
  const [mcqId, setMcqId] = useState("");



  const handleSelect = (qId: string, index: number) => {
    // Prevent changing option if already locked
    if (lockedQuestions[qId]) return;

    setSelected((prev) => ({ ...prev, [qId]: index }));

    // Find the question to check correctness
    const question = questions.find(
      (q: McqQuestion) => (q.mcqId || `question-${currentPage}`) === qId
    );
    if (question) {
      // Check correctness: index matches correctOption (assuming A=0, B=1...)
      // Wait, correctOption is "A", "B"... we need to map index 0->A.
      // Start from 'A' char code 65.
      const selectedOptionChar = String.fromCharCode(65 + index); // 0->A, 1->B
      const isCorrect = selectedOptionChar === question.correctOption;
      setResults((prev) => ({ ...prev, [qId]: isCorrect }));
    }
  };

  const toggleAnswer = (qId: string) => {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
    if (!lockedQuestions[qId]) {
      setLockedQuestions((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString(), limit: limit.toString() }, { replace: true });
      setSkip(undefined);
    }
  };

  const handleJump = () => {
    if (!jumpQuestion.trim()) {
      toast.warning("Please enter a question number");
      return;
    }
    const questionNum = parseInt(jumpQuestion);
    const total = meta?.total || 0;
    if (isNaN(questionNum) || questionNum < 1) {
      toast.warning("Please enter a valid question number");
    } else if (questionNum > total) {
      toast.warning(`Question number exceeds total questions (${total})`);
    } else {
      setSearchParams({ page: questionNum.toString(), limit: limit.toString() }, { replace: true });
      setSkip(undefined);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Question copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleSubmit = async () => {
    if (!mcqData?._id) return;

    const totalAttempted = Object.keys(results).length;
    const totalQuestions = meta?.total || 0;

    if (totalAttempted < totalQuestions) {
      toast.warning("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    const totalCorrect = Object.values(results).filter(Boolean).length;
    const totalIncorrect = totalAttempted - totalCorrect;

    try {
      await updateProgress({
        totalCorrect,
        totalIncorrect,
        totalAttempted,
        key: "mcq",
        bankId: mcqData?._id,
      }).unwrap();

      // Check if we came from WeeklyPlan and update study plan progress
      if (navigationState?.from === "weekly-plan" && navigationState?.planId) {
        try {
          await saveStudyPlanProgress({
            planId: navigationState.planId,
            day: navigationState.day,
            suggest_content: navigationState.suggest_content,
          }).unwrap();
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }

      // localStorage.removeItem(storageKey);
      // localStorage.removeItem(`lastPage_${id}`);
      if (navigationState?.from === "weekly-plan") {
        navigate(-1);
      } else {
        navigate("/dashboard/mcq-bank");
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast.error("Failed to save progress");
      setIsSubmitting(false); // Enable blocker again if failed
    }
  };

  const currentQuestion = questions[0];
  const currentQId = currentQuestion
    ? currentQuestion.mcqId || `question-${(currentPage - 1) * limit}`
    : null;
  const isCurrentQuestionAnswered = currentQId
    ? selected[currentQId] !== undefined && selected[currentQId] !== null
    : false;

  return (
    <>
      <div className="hidden">{/* Invisible blocker for navigation */}</div>
      <AlertDialog open={blocker.state === "blocked"}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save your progress?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered some questions. Would you like to submit your
              progress before leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 justify-center w-full">
            <AlertDialogCancel
              className="mt-0"
              onClick={() => blocker.state === "blocked" && blocker.reset()}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white border-none"
              onClick={() => {
                if (blocker.state === "blocked") {
                  localStorage.removeItem(storageKey);
                  localStorage.removeItem(`lastPage_${id}`);
                  blocker.proceed();
                }
              }}
            >
              Discard & Leave
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-blue-main hover:bg-blue-main/90"
              onClick={() => {
                if (blocker.state === "blocked") {
                  // Simply proceed with leaving; progress is already saved to storage via useEffect
                  blocker.proceed();
                }
              }}
            >
              Save & Exit
            </AlertDialogAction>
            {/* <AlertDialogAction
              className="bg-[#059669] hover:bg-[#059669]/90 text-white"
              onClick={async () => {
                if (blocker.state === "blocked") {
                  const totalAttempted = Object.keys(results).length;
                  const totalQuestions = meta?.total || 0;

                  if (totalAttempted < totalQuestions) {
                    toast.warning("Please complete all questions before submitting final results.");
                    return;
                  }
                  await handleSubmit();
                }
              }}
            >
              Submit Final Result
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isInitialLoading ? (
        <GlobalLoader />
      ) : !mcqData ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <CircleAlert className="w-16 h-16 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-700">
            No MCQ Found
          </h2>
          <p className="text-slate-500">
            The MCQ you are looking for does not exist or has been removed.
          </p>
          <Link to="/dashboard/mcq-bank">
            <PrimaryButton className="bg-blue-main hover:bg-blue-main/90">
              Back to MCQ Bank
            </PrimaryButton>
          </Link>
        </div>
      ) : (
        <>
        <div className="p-1 md:p-6 space-y-8">
          <Breadcrumb breadcrumbs={breadcrumbs} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => {
                   if (navigationState?.from === "weekly-plan") {
                     navigate(-1);
                   } else {
                     navigate("/dashboard/mcq-bank");
                   }
                }}
                className="cursor-pointer sm:mb-0"
              >
                <ArrowLeft className="mb-7" />
              </div>
              <DashboardHeading
                title={mcqData?.title}
                titleSize="text-xl"
                description={`${meta?.total || 0} Questions 
                `}
                className="space-y-1"
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <PrimaryButton
                className="h-10 w-full sm:w-auto cursor-pointer bg-slate-600 hover:bg-slate-700"
                onClick={() => {
                   if (navigationState?.from === "weekly-plan") {
                     navigate(-1);
                   } else {
                     navigate("/dashboard/mcq-bank");
                   }
                }}
              >
                Save & Exit
              </PrimaryButton>
              <PrimaryButton
                style={{
                  background:
                    "linear-gradient(103deg, #0076F5 6.94%, #0058B8 99.01%)",
                }}
                bgType="solid"
                iconPosition="left"
                icon={<Plus />}
                className="h-10 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
                onClick={() => setOpenQuizModal(true)}
              >
                Start Quiz
              </PrimaryButton>
            </div>
          </div>

          {/* Render questions */}
          {questions.map((q: McqQuestion, idx: number) => {
            // Use unique mcqId from backend as the key
            const qId = q?.mcqId || `question-${idx}`;

            // Calculate global question number across all pages
            const globalQuestionNumber = (currentPage - 1) * limit + idx + 1;

            const selectedIndex = selected[qId];

            return (
              <div
                key={qId}
                className="border border-slate-300 rounded-lg p-5 space-y-4"
              >
                <div
                  onClick={() => handleCopy(qId)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-5 h-5" />
                  <p className="text-slate-700 text-sm font-normal">{qId}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <p className="text-slate-700 text-sm font-normal">
                      Question {globalQuestionNumber} of {meta?.total || 0}
                    </p>
                    {mcqData?.subtopic && (
                      <p className="bg-[#D97706] text-xs font-normal px-3 py-1 text-white rounded-full">
                        {mcqData?.subtopic}
                      </p>
                    )}
                    {q.difficulty && (
                      <p className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
                        {q.difficulty}
                      </p>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[#F61F1F] cursor-pointer"
                    onClick={() => {
                      setMcqId(q?.mcqId);
                      setOpenReportModal(true);
                    }}
                  >
                    <p className="text-sm font-semibold">Report</p>
                    <CircleAlert />
                  </div>
                </div>

                <p className="text-slate-900 font-medium">{q.question}</p>
                {q.imageDescription && (
                  <img
                    src={q.imageDescription}
                    alt="Question Image"
                    className="mt-4 max-w-full h-auto rounded-lg max-h-96 object-contain"
                  />
                )}

                <div className="space-y-2">
                  {q.options.map((opt: any, optionIdx: number) => {
                    const isSelected = selectedIndex === optionIdx;
                    const isCorrect = opt.option === q.correctOption;
                    const show = showAnswer[qId];

                    // styles
                    let borderClass = "border-none";
                    let bgClass = "";
                    let textClass = "text-slate-800";

                    if (show) {
                      if (isSelected && isCorrect) {
                        borderClass = "border-green-500";
                        bgClass = "bg-green-50";
                        textClass = "text-green-700 font-medium";
                      } else if (isSelected && !isCorrect) {
                        borderClass = "border-red-500";
                        bgClass = "bg-red-50";
                        textClass = "text-red-700 font-medium";
                      } else if (!isSelected && isCorrect) {
                        borderClass = "border-green-500";
                        bgClass = "bg-green-50";
                        textClass = "text-green-700 font-medium";
                      }
                    } else if (isSelected) {
                      borderClass = "border-blue-500";
                      bgClass = "bg-blue-50";
                    }

                    return (
                      <label
                        key={optionIdx}
                        className={`block p-2 border rounded cursor-pointer ${borderClass} ${bgClass}`}
                      >
                        <input
                          type="radio"
                          name={`question-${qId}`}
                          className="mr-2"
                          onChange={() => handleSelect(qId, optionIdx)}
                          checked={isSelected}
                          disabled={lockedQuestions[qId]}
                        />
                        <span className={textClass}>
                          {opt.option}. {opt.optionText}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {selectedIndex !== undefined && selectedIndex !== null && (
                  <button
                    onClick={() => toggleAnswer(qId)}
                    className="px-4 py-2 border rounded text-sm font-medium bg-blue-main text-white hover:bg-blue-main/85 cursor-pointer"
                  >
                    {showAnswer[qId] ? "Hide Answer" : "Show Answer"}
                  </button>
                )}
                {showAnswer[qId] && (
                  <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                    <h4 className="text-lg font-medium mb-2">Explanation</h4>
                    {q.options.map((option: any) => {
                      const isOptionCorrect = option.option === q.correctOption;
                      return (
                        <div key={option.option} className="mb-3">
                          {isOptionCorrect ? (
                            <p className="font-medium text-green-600">
                              [Correct - Choice {option.option}]
                            </p>
                          ) : (
                            <p className="font-medium text-red-600">
                              [Choice {option.option}]
                            </p>
                          )}
                          <p className="text-gray-800">{option.explanation}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <QuizReportModal
            open={openReportModal}
            setOpen={setOpenReportModal}
            mcqId={mcqId}
            questionBankId={mcqData?._id}
          />
        </div>
      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center flex-wrap gap-4 space-x-5 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded border font-medium cursor-pointer ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          Previous
        </button>

        {currentPage === totalPages ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isCurrentQuestionAnswered}
            className={`px-6 py-2 rounded border font-medium cursor-pointer ${
              isSubmitting || !isCurrentQuestionAnswered
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-main text-white hover:bg-blue-main/90"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Final Result"}
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === totalPages || !isCurrentQuestionAnswered
              }
              className={`px-6 py-2 rounded border font-medium cursor-pointer ${
                currentPage === totalPages || !isCurrentQuestionAnswered
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "bg-blue-main text-white hover:bg-blue-main/90"
              }`}
            >
              Next
            </button>
            <button
              onClick={() => {
                   if (navigationState?.from === "weekly-plan") {
                     navigate(-1);
                   } else {
                     navigate("/dashboard/mcq-bank");
                   }
              }}
              className="px-6 py-2 rounded border font-medium cursor-pointer bg-white text-gray-700 hover:bg-gray-50"
            >
              Save & Exit
            </button>
          </div>
        )}

        {navigationState?.from !== "weekly-plan" && (
          <div className="flex items-center gap-2 ml-4">
            <input
              type="number"
              min="1"
              max={meta?.total || 1}
              value={jumpQuestion}
              onChange={(e) => setJumpQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJump();
                }
              }}
              placeholder="Go to question"
              className="w-32 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-main"
            />
            <button
              onClick={handleJump}
              className="px-4 py-2 bg-blue-main text-white rounded text-sm font-medium hover:bg-blue-main/90 cursor-pointer"
            >
              Jump
            </button>
          </div>
        )}
      </div>
      </>
      )}

      <PracticeQuizModal
        open={openQuizModal}
        setOpen={setOpenQuizModal}
        mcqBankId={mcqData?._id || ""}
        mcqBankTitle={mcqData?.title || ""}
        subject={mcqData?.subject || ""}
        system={mcqData?.system || ""}
        topic={mcqData?.topic || ""}
        subTopic={mcqData?.subtopic || ""}
      />
    </>
  );
}
