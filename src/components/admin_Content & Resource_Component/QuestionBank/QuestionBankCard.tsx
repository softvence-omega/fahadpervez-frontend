import { BookOpenTextIcon, CircleChevronRight } from "lucide-react";
import React from "react";

interface QuestionBankCardProps {
  title: string;
  description: string;
  tags: string[];
  status: "Published" | "Draft";
  questionCount: number;
  onAdd: () => void;
}

const QuestionBankCard: React.FC<QuestionBankCardProps> = ({
  title,
  description,
  tags,
  status,
  questionCount,
  onAdd,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col justify-between p-4 gap-4 w-full max-w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4">
        {/* Left Content */}
        <div className="flex items-start gap-3 min-w-0 flex-1 flex-wrap">
          <CircleChevronRight className="h-6 w-6 text-gray-400 shrink-0 hidden sm:block" />
          <div className="flex items-start gap-2 min-w-0 flex-1 flex-wrap">
            <BookOpenTextIcon className="h-6 w-6 text-black shrink-0 hidden sm:block" />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 shrink-0 flex-wrap">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              status === "Published"
                ? "bg-green-700 text-white"
                : "bg-blue-700 text-white"
            }`}
          >
            {status}
          </span>
          <span className="text-sm text-gray-500 truncate">{questionCount} Questions</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex w-full text-nowrap justify-end rounded-md mt-2 sm:mt-0">
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] text-white text-sm rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          + Add Question
        </button>
      </div>
    </div>
  );
};

export default QuestionBankCard;
