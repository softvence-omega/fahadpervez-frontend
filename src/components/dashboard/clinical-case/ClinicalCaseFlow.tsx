"use client";

import { useState } from "react";
import DecisionPoint from "./DecisionPoint";
import EvidenceReview from "./EvidenceReview";
import DiagnosisAssessment from "./DiagnosisAssessment";
import { Case } from "./type/case";
import { Progress } from "@/components/ui/progress";
import { Bookmark, Printer, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  clinicalCase: Case;
};

const ClinicalCaseFlow: React.FC<Props> = ({ clinicalCase }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = clinicalCase.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      // Step 3 finished, go to next question if exists
      if (selectedOptionId === question.correctOptionId) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestionIndex < clinicalCase.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setCurrentStep(1);
      } else {
        alert(
          `Quiz finished! Your score: ${
            score + (selectedOptionId === question.correctOptionId ? 1 : 0)
          } / ${clinicalCase.questions.length}`
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items- gap-8 mt-9">
      <div className="col-span-3 bg-white border border-gray-300 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Decision Point</h2>
        {/* <p className="text-gray-600 mb-6">{clinicalCase.caseDetails}</p> */}

        {currentStep === 1 && (
          <DecisionPoint
            question={question}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
          />
        )}

        {currentStep === 2 && selectedOptionId && (
          <EvidenceReview
            question={question}
            selectedOptionId={selectedOptionId}
          />
        )}

        {currentStep === 3 && selectedOptionId && (
          <DiagnosisAssessment
            question={question}
            selectedOptionId={selectedOptionId}
          />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Decision Point</p>
          <Progress value={(currentStep * 100) / 3} />
          <p className="">Continue reading to unlock the next step</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !selectedOptionId}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer"
            >
              {currentStep < 3
                ? "Next"
                : currentQuestionIndex < clinicalCase.questions.length - 1
                ? "Next Question"
                : "Finish"}
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Quick Actions</p>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Bookmark />
            Share Case
          </Button>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Printer />
            Share Case
          </Button>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Share />
            Share Case
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseFlow;
