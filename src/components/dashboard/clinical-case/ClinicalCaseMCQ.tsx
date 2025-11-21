import { useState } from "react";
import { ClinicalCaseData, MCQOption } from "@/types/clinicalCase";
// import { useNavigate } from "react-router-dom";

type Props = {
  clinicalCase: ClinicalCaseData;
};

const ClinicalCaseMCQ: React.FC<Props> = ({ clinicalCase }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
//   const navigate = useNavigate();

  const mcqs = clinicalCase?.mcqs || [];
  const currentMCQ = mcqs[currentQuestionIndex];
  const totalQuestions = mcqs.length;

  const handleSelectOption = (option: string) => {
    if (!showAnswer) {
      setSelectedOption(option);
    }
  };

  const handleShowAnswer = () => {
    if (selectedOption) {
      setShowAnswer(true);
      if (selectedOption === currentMCQ.correctOption) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      // Quiz completed - redirect to another page (placeholder for now)
      alert(
        `Quiz Completed! Your score: ${
          score + (selectedOption === currentMCQ.correctOption ? 1 : 0)
        } / ${totalQuestions}`
      );
      // TODO: Navigate to results page when designed
      // navigate(`/dashboard/clinical-case/${clinicalCase._id}/results`);
    }
  };

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow border border-gray-300">
        <p className="text-gray-600">
          No practice questions available for this case.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border border-slate-300 rounded-lg p-5 space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className="text-slate-700 text-sm font-normal">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <p className="bg-[#D97706] text-xs font-normal px-3 py-1 text-white rounded-full">
              {clinicalCase?.subtopic}
            </p>
            <p className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
              {clinicalCase?.difficultyLevel}
            </p>
          </div>
        </div>

        <p className="text-slate-900 font-medium text-lg">
          {currentMCQ?.question}
        </p>

        <div className="space-y-2">
          {currentMCQ?.options?.map((opt: MCQOption, optionIdx: number) => {
            const isSelected = selectedOption === opt.option;
            const isCorrect = opt.option === currentMCQ.correctOption;
            const show = showAnswer;

            // Determine styles
            let borderClass = "border-gray-300";
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
                className={`block p-3 border-2 rounded cursor-pointer transition-colors ${borderClass} ${bgClass}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="mr-3"
                  onChange={() => handleSelectOption(opt.option)}
                  checked={isSelected}
                  disabled={show}
                />
                <span className={textClass}>
                  {opt.option}. {opt.optionText}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex gap-3">
          {selectedOption && !showAnswer && (
            <button
              onClick={handleShowAnswer}
              className="px-6 py-2 border rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Show Answer
            </button>
          )}

          {showAnswer && (
            <button
              onClick={handleNext}
              className="px-6 py-2 border rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              {currentQuestionIndex < totalQuestions - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>

        {showAnswer && (
          <div className="mt-4 p-4 bg-slate-100 rounded-lg">
            <h4 className="text-lg font-medium mb-3">Explanation</h4>
            {currentMCQ?.options?.map((option: MCQOption) => {
              const isOptionCorrect =
                option.option === currentMCQ.correctOption;
              return (
                <div key={option.option} className="mb-3">
                  {isOptionCorrect ? (
                    <p className="font-medium text-green-600 mb-1">
                      ✓ [Correct - Choice {option.option}]
                    </p>
                  ) : (
                    <p className="font-medium text-red-600 mb-1">
                      ✗ [Choice {option.option}]
                    </p>
                  )}
                  <p className="text-gray-800 text-sm">{option.explanation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-medium text-gray-700">
          Current Score: {score} / {currentQuestionIndex + (showAnswer ? 1 : 0)}
        </p>
      </div>
    </div>
  );
};

export default ClinicalCaseMCQ;
