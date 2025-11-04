/* eslint-disable @typescript-eslint/no-explicit-any */

import GlobalLoader from "@/common/GlobalLoader";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useGetSingleMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { McqQuestion } from "@/types";
import { ArrowLeft, CircleAlert, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { question } from '@/assets/dashboard/question.svg';

export default function PracticeMCQ() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Practice MCQ", link: "/dashboard/practice-mcq" },
  ];

  const { id } = useParams();
  const { data, isLoading } = useGetSingleMCQQuery(id as string);

  const [selected, setSelected] = useState<{ [key: string]: number | null }>(
    {}
  );
  const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>({});

  const handleSelect = (qId: string, index: number) => {
    setSelected((prev) => ({ ...prev, [qId]: index }));
  };

  const toggleAnswer = (qId: string) => {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const mcqData = data?.data;
  const questions = mcqData?.mcqs || [];

  console.log({ questions });
  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <div className="p-6 space-y-8">
          <Breadcrumb breadcrumbs={breadcrumbs} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <Link to={"/dashboard/mcq-bank"} className=" sm:mb-0">
                <ArrowLeft className="mb-7" />
              </Link>
              <DashboardHeading
                title={mcqData?.title}
                titleSize="text-xl"
                description={`${mcqData?.mcqs?.length} Questions | Uploaded By: ${mcqData?.uploadedBy}`}
                className="space-y-1"
              />
            </div>

            {/* Right Section */}
            <Link to={"/dashboard/quiz-generator"} className="w-full sm:w-auto">
              <PrimaryButton
                bgType="solid"
                bgColor="bg-blue-btn-1"
                iconPosition="left"
                icon={<Plus />}
                className="h-12 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
              >
                Create Quiz
              </PrimaryButton>
            </Link>
          </div>

          {/* Render questions */}
          {questions.map((q: McqQuestion, idx: number) => {
            const qId = `question-${idx}`; // ensure unique id per question
            // const qId = q?._id || `question-${idx}`; // ensure unique id per question
            const selectedIndex = selected[qId];
            return (
              <div
                key={qId}
                className="border border-slate-300 rounded-lg p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <p className="text-slate-700 text-sm font-normal">
                      Question {idx + 1} of {mcqData?.mcqs?.length}
                    </p>
                    <p className="bg-[#D97706] text-xs font-normal px-3 py-1 text-white rounded-full">
                      {mcqData?.subtopic}
                    </p>
                    <p className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
                      {q.difficulty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#F61F1F]">
                    <p className="text-sm font-semibold">Report</p>
                    <CircleAlert />
                  </div>
                </div>

                <p className="text-slate-900 font-medium">{q.question}</p>

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
                          name={`question-${qId}`} // each question group unique
                          className="mr-2"
                          onChange={() => handleSelect(qId, optionIdx)} // use qId consistently
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

                {selectedIndex !== undefined && selectedIndex !== null && (
                  <button
                    onClick={() => toggleAnswer(qId)} // use qId
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
                    {/* {q.imageDescription && (
                      <p className="text-sm text-gray-700 mt-2 italic">
                        {q.imageDescription}
                      </p>
                    )} */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
