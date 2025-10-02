import React from "react";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/admin_Content & Resource/QuestionBank/QuestionBankCard";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../../reusable/Pagination";

const Content_Resource_ALL_QB: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
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
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Add Question Bank
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Question Banks</h2>
        <Link to="/question-bank/all">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* ✅ Question Banks List */}
      <div className="space-y-4">
        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Published"
          questionCount={20}
          onAdd={() => console.log("Add Question")}
        />

        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Draft"
          questionCount={0}
          onAdd={() => console.log("Add Question")}
        />
        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Published"
          questionCount={20}
          onAdd={() => console.log("Add Question")}
        />

        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Draft"
          questionCount={0}
          onAdd={() => console.log("Add Question")}
        />
      </div>
      <div className="flex justify-center mt-6 ">
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log(page)}
          title="Question Banks Pagination"
          showText="true"
        />
      </div>
    </div>
  );
};

export default Content_Resource_ALL_QB;
