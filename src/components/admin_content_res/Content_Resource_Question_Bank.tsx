import React from "react";
import TabsNav from "@/components/admin_Content & Resource/QuestionBank/TabsNav";
import StatsCard from "@/components/admin_Content & Resource/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/admin_Content & Resource/QuestionBank/QuestionBankCard";
import RecentActivity from "@/components/admin_Content & Resource/QuestionBank/RecentActivity";
import { Plus } from "lucide-react";

const Content_Resource_Question_Bank: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <TabsNav />

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        <StatsCard
          title="Total Question Bank"
          value={10}
          subtitle="Across all subjects"
        />
        <StatsCard
          title="Total Question Imported"
          value={3420}
          subtitle="Across all subjects"
        />
        <StatsCard title="Last Upload" value={180} subtitle="2025-09-12" />
        <StatsCard
          title="Published"
          value={180}
          subtitle="MCQ Bank Published"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:gap-12 px-2">
        {/* Search */}
        <div className="flex w-full md:w-[45.875rem] py-4 items-center gap-2 flex-1">
          <SearchBar
            placeholder="Search Question Bank"
            onChange={(val) => console.log(val)}
          />
        </div>

        {/* Add Button */}
        <div className="flex w-full md:w-auto h-12 py-2 px-4 justify-center items-center gap-2 rounded-md bg-blue-700 text-white font-medium text-sm leading-5">
          <Plus className="w-4 h-4" />
          <button className="whitespace-nowrap">Add Question Bank</button>
        </div>
      </div>

      {/* Question Banks */}
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

      {/* Recent Activity */}
      <RecentActivity
        activities={[
          {
            name: "cardiology_questions_v2",
            questions: 198,
            subject: "Cardiology",
            author: "Dr. Smith",
            timeAgo: "2 hour ago",
          },
          {
            name: "cardiology_questions_v2",
            questions: 198,
            subject: "Cardiology",
            author: "Admin",
            timeAgo: "2 hour ago",
          },
          {
            name: "cardiology_questions_v2",
            questions: 156,
            subject: "Cardiology",
            author: "Admin",
            timeAgo: "2 hour ago",
          },
        ]}
      />
    </div>
  );
};

export default Content_Resource_Question_Bank;
