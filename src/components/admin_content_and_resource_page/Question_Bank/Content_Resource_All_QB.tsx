import React from "react";
import { Plus, ArrowLeft } from "lucide-react";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/admin_Content & Resource_Component/QuestionBank/QuestionBankCard";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Pagination from "@/components/admin_Content & Resource_Component/Pagination";

interface AddQuestionProps {
  onBack?: () => void;
}

const Content_Resource_ALL_QB: React.FC<AddQuestionProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-full mx-auto flex flex-col gap-5 sm:gap-8">
        {/* 🔙 Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>

        {/* 🔍 Search + ➕ Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex w-full sm:flex-1">
            <SearchBar
              placeholder="Search Question Bank"
              onChange={(val) => console.log(val)}
            />
          </div>

          {/* Add Button */}
          <div className="w-full sm:w-auto">
            <ButtonWithIcon
              icon={Plus}
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-5 py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Add Question Bank
            </ButtonWithIcon>
          </div>
        </div>

        {/* 🧾 Header with View All */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
            All Question Banks
          </h2>
        </div>

        {/* 🧩 Question Banks Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <QuestionBankCard
              key={index}
              title="Anatomy Essentials MCQs"
              description="Basic concepts in cardiovascular medicine"
              tags={["Anatomy", "Neurology"]}
              status={index % 2 === 0 ? "Published" : "Draft"}
              questionCount={index % 2 === 0 ? 20 : 0}
              onAdd={() => console.log("Add Question")}
            />
          ))}
        </div>

        {/* 📄 Pagination */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={(page) => console.log(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Content_Resource_ALL_QB;
