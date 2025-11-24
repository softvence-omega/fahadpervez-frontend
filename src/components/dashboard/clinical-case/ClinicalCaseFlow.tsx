"use client";

import { useState } from "react";
import DecisionPoint from "./DecisionPoint";
import EvidenceReview from "./EvidenceReview";
// import PracticeMCQ from "./PracticeMCQ";
// import { ClinicalCaseData } from "@/types/clinicalCase.types";
import { Progress } from "@/components/ui/progress";
import { Bookmark, Printer, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClinicalCaseData } from "@/types/clinicalCase";
import ClinicalCaseMCQ from "./ClinicalCaseMCQ";

type Props = {
  clinicalCase: ClinicalCaseData;
};

const ClinicalCaseFlow: React.FC<Props> = ({ clinicalCase }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
    null
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  console.log(isConfirmed)

  const handleConfirmDiagnosis = () => {
    setIsConfirmed(true);
    setCurrentStep(2);
  };

  const handleStartQuiz = () => {
    setCurrentStep(3);
  };

  const getButtonConfig = () => {
    if (currentStep === 1) {
      return {
        label: "Next",
        disabled: true,
        onClick: () => {},
      };
    }
    if (currentStep === 2) {
      return {
        label: "Start Quiz",
        disabled: false,
        onClick: handleStartQuiz,
      };
    }
    return {
      label: "Next Question",
      disabled: false,
      onClick: () => {},
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-8 my-9">
      <div className="col-span-3">
        {currentStep === 1 && (
          <DecisionPoint
            clinicalCase={clinicalCase}
            selectedOptionName={selectedOptionName}
            setSelectedOptionName={setSelectedOptionName}
            onConfirm={handleConfirmDiagnosis}
          />
        )}

        {currentStep === 2 && selectedOptionName && (
          <EvidenceReview
            clinicalCase={clinicalCase}
            selectedOptionName={selectedOptionName}
          />
        )}

        {currentStep === 3 && (
          <ClinicalCaseMCQ clinicalCase={clinicalCase} />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Decision Point</p>
          <Progress value={(currentStep * 100) / 3} />
          <p className="">
            {currentStep === 1
              ? "Select a diagnosis to continue"
              : currentStep === 2
              ? "Review evidence to unlock quiz"
              : "Complete the practice questions"}
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={buttonConfig.onClick}
              disabled={buttonConfig.disabled}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700"
            >
              {buttonConfig.label}
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Quick Actions</p>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Bookmark />
            Bookmark Case
          </Button>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Printer />
            Print Case
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