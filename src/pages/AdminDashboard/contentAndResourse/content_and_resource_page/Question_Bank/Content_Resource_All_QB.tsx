import React, { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/QuestionBankCard";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Pagination from "@/components/AdminDashboard/Content & Resource_Component/Pagination";
import Add_Question from "./Add_Question";
import Create_New_Question from "./Create_New_Question_Bank";
import { useGllMCQBankQuery } from "@/store/features/MCQBank/MCQBank.api";
import type { QuestionBankCardProps } from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/QuestionBankCard";

interface AddQuestionProps {
  onBack?: () => void;
}

const Content_Resource_ALL_QB: React.FC<AddQuestionProps> = ({ onBack }) => {
  type View = "viewAll" | "create" | "addQuestion";

  const [currentView, setCurrentView] = useState<View>("viewAll");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 state for search
  const itemsPerPage = 6;

    const { data } = useGllMCQBankQuery(undefined);
  
    console.log(data?.data);
    const mcqBank = data?.data;

  // ✅ Sample data (your original)
  // const allQuestionBanks = [
  //   {
  //     title: "Anatomy Essentials MCQs",
  //     description: "Basic concepts in cardiovascular medicine",
  //     tags: ["Anatomy", "Neurology"],
  //     status: "Published",
  //     questionCount: 20,
  //   },
  // ];

  // ✅ Filter based on search term
  const filteredBanks = mcqBank.filter((bank: QuestionBankCardProps) => {
    const term = searchTerm.toLowerCase();
    return (
      bank.mcqBankTitle.toLowerCase().includes(term) ||
      bank.subjectName.toLowerCase().includes(term)
    );
  });

  // ✅ Pagination based on filtered data
  const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBanks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  if (currentView === "create")
    return <Create_New_Question onBack={() => setCurrentView("viewAll")} />;
  if (currentView === "addQuestion")
    return <Add_Question onBack={() => setCurrentView("viewAll")} />;

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
          <div className="flex w-full sm:flex-1">
            <SearchBar
              placeholder="Search Question Bank"
              onChange={(val) => {
                setSearchTerm(val);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>

          <div className="w-full sm:w-auto">
            <ButtonWithIcon
              icon={Plus}
              className="w-full flex items-center justify-center sm:w-auto bg-gradient-to-tr from-[#0076F5] to-[#0058B8]
              hover:from-[#0069DB] text-white px-4 sm:px-5 py-2.5 rounded-md text-sm sm:text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => setCurrentView("create")}
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
          <p className="text-gray-600">
            Showing {filteredBanks.length === 0 ? 0 : startIndex + 1}–
            {Math.min(endIndex, filteredBanks.length)} of {filteredBanks.length}{" "}
            question banks
          </p>
        </div>

        {/* 🧩 Question Banks Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((bank: QuestionBankCardProps) => (
              <QuestionBankCard
                key={bank._id}
                _id={bank._id}
                mcqBankTitle={bank.mcqBankTitle}
                description='Must have a describtion'
                subjectName={bank.subjectName}
                status="Draft"
                uploadedBy={bank.uploadedBy}
                totalMcq={bank.totalMcq}
                onAdd={() => setCurrentView("addQuestion")}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">
              No question banks found.
            </p>
          )}
        </div>

        {/* 📄 Pagination */}
        {filteredBanks.length > 0 && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Content_Resource_ALL_QB;
