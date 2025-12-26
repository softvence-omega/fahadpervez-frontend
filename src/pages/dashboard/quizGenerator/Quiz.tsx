/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import GlobalLoader from "@/common/GlobalLoader";

// Sample JSON data for medical students (Neurology questions)
const sampleQuizData = {
  title: "Session 1",
  description: "5 Question. Medium. Neurology.",
  questions: [
    {
      id: "01",
      text: "A 19-year-old female presents ... After the following recommendations should the physician prioritize to minimize mechanical irritation?",
      options: [
        { value: "A", label: "A. Increase dairy intake" },
        { value: "B", label: "B. Use oil-based moisturizers" },
        { value: "C", label: "C. Avoid touching the face frequently" },
        { value: "D", label: "D. Apply heavy makeup daily" },
        { value: "E", label: "E. Engage in prolonged sun exposure" },
      ],
      correctAnswer: "C",
      explanation:
        "Mechanical irritation should be minimized by avoiding frequent face touching.",
    },
    {
      id: "02",
      text: "A patient with migraine headaches is prescribed a triptan. What is the primary mechanism of action?",
      options: [
        { value: "A", label: "A. Beta-blocker" },
        { value: "B", label: "B. Serotonin receptor agonist" },
        { value: "C", label: "C. Calcium channel blocker" },
        { value: "D", label: "D. Anticonvulsant" },
        { value: "E", label: "E. Opioid agonist" },
      ],
      correctAnswer: "B",
      explanation: "Triptans are serotonin (5-HT1B/1D) receptor agonists.",
    },
    {
      id: "03",
      text: "Which of the following is a common symptom of Parkinson's disease?",
      options: [
        { value: "A", label: "A. Hyperreflexia" },
        { value: "B", label: "B. Tremor at rest" },
        { value: "C", label: "C. Visual hallucinations" },
        { value: "D", label: "D. Seizures" },
        { value: "E", label: "E. Ataxia" },
      ],
      correctAnswer: "B",
      explanation: "Resting tremor is a hallmark sign of Parkinson's.",
    },
    {
      id: "04",
      text: "A 45-year-old man presents with sudden onset of severe headache. CT scan shows subarachnoid hemorrhage. What is the most likely cause?",
      options: [
        { value: "A", label: "A. Hypertension" },
        { value: "B", label: "B. Ruptured aneurysm" },
        { value: "C", label: "C. Trauma" },
        { value: "D", label: "D. Arteriovenous malformation" },
        { value: "E", label: "E. Coagulopathy" },
      ],
      correctAnswer: "B",
      explanation:
        "Ruptured saccular (berry) aneurysm is the most common cause of non-traumatic SAH.",
    },
    {
      id: "05",
      text: "What is the first-line treatment for acute ischemic stroke?",
      options: [
        { value: "A", label: "A. Aspirin" },
        { value: "B", label: "B. tPA (tissue plasminogen activator)" },
        { value: "C", label: "C. Heparin" },
        { value: "D", label: "D. Warfarin" },
        { value: "E", label: "E. Clopidogrel" },
      ],
      correctAnswer: "B",
      explanation:
        "Intravenous alteplase (tPA) is the standard for acute ischemic stroke within 3-4.5 hours.",
    },
  ],
};

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isReviewMode = queryParams.get("mode") === "review";

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
  const quizData = normalizedFetchedQuiz || reduxQuiz || sampleQuizData;

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

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
    correctAnswer: q.correctAnswer || q.answer || "",
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
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
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
        navigate("/dashboard/quiz-page", { state: { activeTab: "myQuiz" } });
      } else {
        handleSubmit();
      }
    }
  };

  // Submit answers
  const handleSubmit = () => {
    const totalQuestions = questions.length;
    let correctCount = 0;

    questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const submittedAnswers = {
      session: quizData.title,
      answers: Object.entries(answers).map(([index, answer]) => ({
        questionId: questions[Number(index)].id,
        selected: answer,
      })),
    };
    console.log(
      "Submitted Answers:",
      JSON.stringify(submittedAnswers, null, 2)
    );

    // Redirect to quiz-page my-quiz tab with actual data
    navigate("/dashboard/quiz-page", {
      state: {
        activeTab: "myQuiz",
        quizId: id || "generated",
        progress: (Object.keys(answers).length / totalQuestions) * 100,
        correctCount,
        incorrectCount: totalQuestions - correctCount,
        totalQuestions,
        timeSpent: formatTime(timeElapsed),
        rawTimeSpent: timeElapsed,
      },
    });
  };

  if (isLoading) return <GlobalLoader />;

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 my-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">
            {isReviewMode ? "Review Mode" : quizData?.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{quizData?.description}</p>
          {questions.map((q: any, index: number) => (
            <div
              key={q.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
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
                  {answers[index] === q.correctAnswer ? "✅" : "❌"}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Question Area */}
        <div className="w-full md:w-3/4">
          {/* Timer / Header */}
          <div className=" bg-white border-e-slate-300 rounded p-4 flex justify-between items-center mb-5">
            <div className="flex items-center">
              <Timer className="mr-2" />
              {isReviewMode ? "Reviewing..." : formatTime(timeElapsed)}
            </div>
            <Button
              variant="secondary"
              onClick={
                isReviewMode
                  ? () =>
                      navigate("/dashboard/quiz-page", {
                        state: { activeTab: "myQuiz" },
                      })
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
                  const isSelected = answers[currentQuestion] === option.value;
                  const showResult = isReviewMode;

                  return (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className={`cursor-pointer ${
                          showResult
                            ? isCorrect
                              ? "text-green-600 font-bold"
                              : isSelected
                              ? "text-red-600"
                              : ""
                            : ""
                        }`}
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {isReviewMode && currentQuestionData.explanation && (
                <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
                  <p className="font-semibold text-blue-800 mb-1">
                    Explanation:
                  </p>
                  <p className="text-gray-700 italic">
                    {currentQuestionData.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentQuestion > 0 ? (
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
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
