import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/admin_Content & Resource_Component/QuestionBank/QuestionBankCard";
import RecentActivity from "@/components/admin_Content & Resource_Component/QuestionBank/RecentActivity";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { BookOpenTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Create_New_Question from "./Create_New_Question_Bank";
import Add_Question from "./Add_Question";
import Content_Resource_ALL_QB from "./Content_Resource_All_QB";
import CommonSpace from "@/common/space/CommonSpace";

const Content_Resource_Question_Bank: React.FC = () => {
  type View = "homepage" | "create" | "addQuestion" | "viewAll";

  const [currentView, setCurrentView] = useState<View>("homepage");

  // If showing Create New Question view
  if (currentView === "create") {
    return <Create_New_Question />;
  }

  // If showing Add Question view
  if (currentView === "addQuestion") {
    return <Add_Question />;
  }
  // If showing View All Questions view
  if (currentView === "viewAll") {
    return <Content_Resource_ALL_QB />;
  }

  return (
    <div className="space-y-6  ">
      <CommonSpace>
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
      </CommonSpace>
      <div className=" flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
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
            onClick={() => setCurrentView("create")}
          >
            Add Question Bank
          </ButtonWithIcon>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Question Banks</h2>
        <Link to="">
          <Button
            variant="link"
            className="p-0 text-sm sm:text-base"
            onClick={() => setCurrentView("viewAll")}
          >
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4 ">
        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Published"
          questionCount={20}
          onAdd={() => setCurrentView("addQuestion")}
        />

        <QuestionBankCard
          title="Anatomy Essentials MCQs"
          description="Basic concepts in cardiovascular medicine"
          tags={["Anatomy", "Neurology"]}
          status="Draft"
          questionCount={0}
          onAdd={() => setCurrentView("addQuestion")}
        />
      </div>

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
