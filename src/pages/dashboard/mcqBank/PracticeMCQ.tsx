/* eslint-disable @typescript-eslint/no-explicit-any */

import GlobalLoader from "@/common/GlobalLoader";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { useGetSingleMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { McqQuestion } from "@/types";
import { ArrowLeft, CircleAlert, Copy, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuizReportModal from "../quizGenerator/QuizReportModal";
import { toast } from "sonner";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { PracticeQuizModal } from "./PracticeQuizModal";

export default function PracticeMCQ() {
  const [openQuizModal, setOpenQuizModal] = useState(false);

  // const handleQuizSubmit = (data: any) => {
  //   console.log("Quiz Data:", data);
  //   // TODO: Redux API call integration
  //   setOpenQuizModal(false);
  // };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Practice MCQ", link: "/dashboard/practice-mcq" },
  ];

  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 1;
  const { data, isLoading } = useGetSingleMCQQuery({
    id: id as string,
    page: currentPage,
    limit,
  });

  const meta = data?.meta;

  const [selected, setSelected] = useState<{ [key: string]: number | null }>(
    {}
  );
  const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>({});
  const [openReportModal, setOpenReportModal] = useState(false);
  const [mcqId, setMcqId] = useState("");

  const handleSelect = (qId: string, index: number) => {
    setSelected((prev) => ({ ...prev, [qId]: index }));
  };

  const toggleAnswer = (qId: string) => {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const mcqData = data?.data;
  const questions = mcqData?.mcqs || [];

  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
                description={`${meta?.total || 0} Questions 
                `}
                className="space-y-1"
              />
            </div>

            {/* Right Section */}
            {/* <Link
              to={"/dashboard/quiz-collection"}
              className="w-full sm:w-auto"
            > */}
            <PrimaryButton
              style={{
                background:
                  "linear-gradient(103deg, #0076F5 6.94%, #0058B8 99.01%)",
              }}
              bgType="solid"
              // bgColor="bg-blue-btn-1"
              iconPosition="left"
              icon={<Plus />}
              className="h-10 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
              onClick={() => setOpenQuizModal(true)}
            >
              Start Quiz
            </PrimaryButton>
            {/* </Link> */}
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
            questionBankId={mcqData._id}
          />
        </div>
      )}
      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
        {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}

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

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded border font-medium cursor-pointer ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-blue-main text-white hover:bg-blue-main/90"
          }`}
        >
          Next
        </button>
      </div>

      <PracticeQuizModal
        open={openQuizModal}
        setOpen={setOpenQuizModal}
        // onSubmit={handleQuizSubmit}
        mcqBankId={mcqData?._id || ""}
        mcqBankTitle={mcqData?.title || ""}
      />
    </>
  );
}
