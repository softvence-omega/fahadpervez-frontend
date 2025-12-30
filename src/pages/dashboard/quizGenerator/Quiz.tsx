/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  useGetGeneratedMCQQuery,
  useUpdateQuizTrackingMutation,
} from "@/store/features/MCQBank/MCQBank.api";
// import { setQuizResults } from "@/store/features/MCQBank/quizSlice";
// import { useDispatch } from "react-redux";
import GlobalLoader from "@/common/GlobalLoader";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isReviewMode = queryParams.get("mode") === "review";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const dispatch = useDispatch();
  const { currentQuiz: reduxQuiz } = useSelector(
    (state: RootState) => state.quiz
  );

  const { data: apiQuizData, isLoading } = useGetGeneratedMCQQuery(
    id as string,
    {
      skip: !id || id === "3", // Sample ID case or missing ID
    }
  );

  // Use API data, then redux quiz, then sample
  const fetchedQuiz = apiQuizData?.data || apiQuizData;

  // Normalize quiz data structure
  const normalizeQuizData = (data: any) => {
    if (!data) return null;

    // If it's an array, it's just questions
    if (Array.isArray(data)) {
      return {
        title: "Generated Quiz",
        description: "AI generated quiz based on your content.",
        questions: data,
      };
    }

    // If it doesn't have questions but looks like a session object
    if (data && !data.questions && data.mcqs) {
      return {
        ...data,
        questions: data.mcqs,
      };
    }

    return data;
  };

  const normalizedFetchedQuiz = normalizeQuizData(fetchedQuiz);
  const quizData = normalizedFetchedQuiz || reduxQuiz; //|| sampleQuizData;

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Load answers from sessionStorage if in review mode and just submitted
  useEffect(() => {
    if (isReviewMode && id && location.state?.justSubmitted) {
      const savedAnswers = sessionStorage.getItem(`quiz_answers_${id}`);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch (e) {
          console.error("Failed to parse saved answers", e);
        }
      }
    }
  }, [isReviewMode, id, location.state]);

  // Normalize questions format inside the data
  const rawQuestions = quizData?.questions || [];
  const questions = rawQuestions.map((q: any, index: number) => ({
    id: q.id || (index + 1).toString(),
    text: q.question || q.text || "Question " + (index + 1),
    options: (q.options || []).map((opt: any, i: number) => {
      if (typeof opt === "string") {
        return { value: String.fromCharCode(65 + i), label: opt };
      }
      return {
        value: opt.value || opt.option || String.fromCharCode(65 + i),
        label: opt.label || opt.optionText || opt.text || "",
        explanation: opt.explanation || "",
      };
    }),
    correctAnswer: q.correctOption || q.correctAnswer || q.answer || "",
    explanation: q.explanation || "",
  }));

  useEffect(() => {
    if (apiQuizData) {
      console.log("Quiz Data Loaded from API:", apiQuizData);
    }
  }, [apiQuizData]);

  // Timer effect
  useEffect(() => {
    if (isReviewMode) return;
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isReviewMode]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Handle answer selection
  const handleAnswerChange = (value: string) => {
    if (isReviewMode) return;

    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [currentQuestion]: value,
      };

      // Save to sessionStorage
      if (id) {
        sessionStorage.setItem(
          `quiz_answers_${id}`,
          JSON.stringify(newAnswers)
        );
      }

      return newAnswers;
    });
  };

  // Navigation
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isReviewMode && !answers[currentQuestion]) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      if (isReviewMode) {
        // Clear sessionStorage on finish review
        if (id) {
          sessionStorage.removeItem(`quiz_answers_${id}`);
        }
        navigate(`/dashboard/quiz-page/${id}`, {
          state: { activeTab: "myQuiz" },
        });
      } else {
        handleSubmit();
      }
    }
  };

  const [updateTracking] = useUpdateQuizTrackingMutation();

  // Submit answers
  const handleSubmit = async () => {
    const totalQuestions = questions?.length || 0;
    const answeredCount = Object.keys(answers)?.length || 0;
    let correctCount = 0;

    questions?.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const trackingData = {
      totalMcqCount: totalQuestions,
      totalAttemptCount: answeredCount,
      correctMcqCount: correctCount,
      wrongMcqCount: answeredCount - correctCount,
      timeTaken: formatTime(timeElapsed),
    };

    try {
      if (id && id !== "generated") {
        await updateTracking({ id, data: trackingData }).unwrap();
      }

      // REDUX PERSISTENCE (COMMENTED OUT AS REQUESTED)
      /*
      const results = questions.map((q, index) => ({
        questionId: q.id,
        selectedOption: answers[index] || "",
        isCorrect: answers[index] === q.correctAnswer
      }));
      dispatch(setQuizResults(results));
      */

      // Save final answers to sessionStorage for review
      if (id) {
        sessionStorage.setItem(`quiz_answers_${id}`, JSON.stringify(answers));
      }

      // Redirect to quiz-page analysis tab
      navigate(`/dashboard/quiz-page/${id || "generated"}`, {
        state: { activeTab: "myQuiz", justSubmitted: true },
      });
    } catch (error) {
      console.error("Failed to update tracking:", error);
      // Fallback redirection even if update fails
      navigate(`/dashboard/quiz-page/${id || "generated"}`, {
        state: { activeTab: "myQuiz", justSubmitted: true },
      });
    }
  };

  if (isLoading) return <GlobalLoader />;

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4">
      {/* Main Content */}
      <Link to="/dashboard/quiz-page" className="sm:mb-0">
        <button className="flex items-center gap-1 border border-gray-300 px-3 py-2 rounded cursor-pointer">
          <ArrowLeft className="w-5 h-4" /> Back
        </button>
      </Link>

      <div className="flex gap-4 my-5">
        {/* Sidebar */}
        {/* <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">
            {isReviewMode ? "Review Mode" : quizData?.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{quizData?.description}</p>
          {questions.map((q: any, index: number) => (
            <div
              key={q.id}
              className={`p-2 mb-2 rounded cursor-pointer flex items-center justify-between ${
                index === currentQuestion
                  ? "bg-blue-100 text-blue-600"
                  : answers[index] || isReviewMode
                  ? "bg-gray-50"
                  : "text-gray-600"
              }`}
              onClick={() => {
                if (
                  isReviewMode ||
                  index <= currentQuestion ||
                  answers[index - 1]
                ) {
                  setCurrentQuestion(index);
                }
              }}
            >
              Question {q.id}
              {isReviewMode && answers[index] && (
                <span className="ml-2">
                  {answers[index] === q.correctAnswer ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </span>
              )}
            </div>
          ))}
        </div> */}

        {/* Sidebar */}
        <div
          className={`bg-white rounded-lg shadow transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-1/6" : "w-14"}
  `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-b-slate-300">
            {isSidebarOpen && (
              <div>
                <h2 className="font-semibold mb-1">
                  {isReviewMode ? "Review Mode" : quizData?.title}
                </h2>
                <p className="text-sm text-gray-600">{quizData?.description}</p>
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

          {/* Scrollable Question List */}
          <div className="max-h-[500px] overflow-y-auto p-2">
            {questions.map((q: any, index: number) => (
              <div
                key={q.id}
                className={`p-2 mb-2 rounded cursor-pointer flex items-center justify-between text-sm
        ${
          index === currentQuestion
            ? "bg-blue-100 text-blue-600"
            : answers[index] || isReviewMode
            ? "bg-gray-50"
            : "text-gray-600 hover:bg-gray-100"
        }`}
                onClick={() => {
                  if (
                    isReviewMode ||
                    index <= currentQuestion ||
                    answers[index - 1]
                  ) {
                    setCurrentQuestion(index);
                  }
                }}
              >
                <span>{isSidebarOpen ? `Question ${q.id}` : q.id}</span>

                {isReviewMode && answers[index] && isSidebarOpen && (
                  <span className="ml-2">
                    {answers[index] === q.correctAnswer ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div
          className={`transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-5/6" : "w-full md:w-[calc(100%-3.5rem)]"}
  `}
        >
          {/* Timer / Header */}
          <div className=" bg-white border-e-slate-300 rounded p-4 flex justify-between items-center mb-5">
            <div className="flex items-center">
              <Timer className="mr-2" />
              {isReviewMode ? "Reviewing..." : formatTime(timeElapsed)}
            </div>
            <Button
              className="cursor-pointer"
              variant="secondary"
              onClick={
                isReviewMode
                  ? () => {
                      if (id) sessionStorage.removeItem(`quiz_answers_${id}`);
                      navigate(`/dashboard/quiz-page/${id}`, {
                        state: { activeTab: "myQuiz" },
                      });
                    }
                  : handleSubmit
              }
              disabled={!isReviewMode && Object.keys(answers).length === 0}
            >
              {isReviewMode ? "Finish Review" : "End Quiz"}
            </Button>
          </div>

          {currentQuestionData && (
            <div className="w-full bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-4">
                Question {currentQuestionData.id}
              </h3>
              <p className="mb-4">{currentQuestionData.text}</p>

              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerChange}
                disabled={isReviewMode}
              >
                {currentQuestionData.options.map((option: any) => {
                  const isCorrect =
                    option.value === currentQuestionData.correctAnswer;
                  const isUserSelection =
                    answers[currentQuestion] === option.value;
                  const showResult = isReviewMode;

                  return (
                    <div
                      key={option.value}
                      className={`flex justify-between items-center p-3 rounded-lg border mb-3 transition-colors ${
                        showResult
                          ? isCorrect
                            ? "bg-green-50 border-green-200 text-green-800"
                            : isUserSelection
                            ? "bg-red-50 border-red-200 text-red-800"
                            : "bg-white border-gray-100 text-gray-500"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3 w-full cursor-pointer">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className={showResult ? "hidden" : ""}
                        />
                        <Label
                          htmlFor={option.value}
                          className="flex-grow cursor-pointer font-medium"
                        >
                          {option.label}
                        </Label>
                      </div>
                      {showResult && (
                        <div>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : isUserSelection ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>

              {isReviewMode && (
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-gray-900 border-b border-b-slate-300 pb-2 mb-4">
                    Explanation
                  </h4>
                  <div className="space-y-6">
                    {currentQuestionData.options.map((option: any) => {
                      const isOptionCorrect =
                        option.value === currentQuestionData.correctAnswer;
                      return (
                        <div key={option.value} className="text-sm">
                          <p
                            className={`font-bold mb-1 ${
                              isOptionCorrect
                                ? "text-green-700"
                                : "text-red-500"
                            }`}
                          >
                            [{isOptionCorrect ? "Correct - " : ""}Choice{" "}
                            {option.value}]
                          </p>

                          <p
                            className={` ${
                              isOptionCorrect
                                && "text-green-700"
                                //: "text-red-400"
                            }`}
                          >
                            {option.explanation || "No explanation provided."}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentQuestion > 0 ? (
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
                  className="cursor-pointer"
                  onClick={handleNext}
                  disabled={!isReviewMode && !answers[currentQuestion]}
                >
                  {currentQuestion === questions.length - 1
                    ? isReviewMode
                      ? "Finish Review"
                      : "Submit"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
