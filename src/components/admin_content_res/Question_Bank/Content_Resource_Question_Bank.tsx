import React from "react";
import StatsCard from "@/components/admin_Content & Resource/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/admin_Content & Resource/QuestionBank/QuestionBankCard";
import RecentActivity from "@/components/admin_Content & Resource/QuestionBank/RecentActivity";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { BookOpenTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Content_Resource_Question_Bank: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Question Bank"
          value={10}
          subtitle="Across all subjects"
          icon={<BookOpenTextIcon className="w-6 h-6 text-green-600" />}
        />
        <StatsCard
          title="Total Question Imported"
          value={3420}
          subtitle="Across all subjects"
          icon={<BookOpenTextIcon className="w-6 h-6 text-green-600" />}
        />
        <StatsCard title="Last Upload" value={180} subtitle="2025-09-12" />
        <StatsCard
          title="Published"
          value={180}
          subtitle="MCQ Bank Published"
          icon={<BookOpenTextIcon className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* ✅ Search + Add Button */}
      <div className="mt-8 flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
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
        <Link to="/upload-content/all_question_bank">
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
      </div>

      {/* ✅ Recent Activity */}
      <div className="overflow-x-auto">
        <RecentActivity
          activities={[
            {
              name: "cardiology_questions_v2",
              questions: 198,
              topic: "Questions",
              subject: "Cardiology",
              author: "Dr. Smith",
              timeAgo: "2 hour ago",
            },
            {
              name: "cardiology_questions_v2",
              questions: 198,
              topic: "Questions",
              subject: "Cardiology",
              author: "Admin",
              timeAgo: "2 hour ago",
            },
            {
              name: "cardiology_questions_v2",
              questions: 156,
              topic: "Questions",
              subject: "Cardiology",
              author: "Admin",
              timeAgo: "2 hour ago",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Content_Resource_Question_Bank;
