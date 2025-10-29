import React, { useState } from "react";
import StatsCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
import QuestionBankCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/QuestionBankCard";
import RecentActivity from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/RecentActivity";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { BookOpenTextIcon, Plus } from "lucide-react";
import Create_New_Question from "./Create_New_Question_Bank";
import Add_Question from "./Add_Question";
import CommonSpace from "@/common/space/CommonSpace";
import { useGetMcqApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import BigCardSkeleton from "@/common/custom/BigCardSkeleton";
import ViewAllButton from "@/components/AdminDashboard/Content & Resource_Component/ViewAllButton";

const Content_Resource_Question_Bank: React.FC = () => {
  type View = "homepage" | "create" | "addQuestion";

  const [currentView, setCurrentView] = useState<View>("homepage");
  const [viewAll, setViewAll] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const searchTerm = useDebounce(search, 500);

  const { data: mcqData, isLoading } = useGetMcqApiQuery({
    page,
    limit: viewAll ? Infinity : 1,
    searchTerm: searchTerm || undefined,
  });

  const mcqBanks = mcqData?.data ?? [];

  // Routing logic
  if (currentView === "create")
    return <Create_New_Question onBack={() => setCurrentView("homepage")} />;
  if (currentView === "addQuestion")
    return <Add_Question onBack={() => setCurrentView("homepage")} />;

  return (
    <div className="space-y-6 w-full">
      <CommonSpace>
        <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            title="Total Question Bank"
            value={mcqData?.meta?.total ?? 0}
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
            value={mcqData?.meta?.total ?? 0}
            subtitle="MCQ Bank Published"
            icon={<BookOpenTextIcon className="w-6 h-6 text-green-600" />}
          />
        </div>
      </CommonSpace>

      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="w-full lg:w-[740px] ">
          <SearchBar
            placeholder="Search Question Bank"
            onChange={(val) => setSearch(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]
            "
            icon={Plus}
            onClick={() => setCurrentView("create")}
          >
            Add Question Bank
          </ButtonWithIcon>
        </div>
      </div>

      <div className="flex justify-between items-center w-full gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {viewAll ? "All Question Banks" : "Question Banks"}
        </h2>

        <ViewAllButton
          isActive={viewAll}
          onClick={() => setViewAll(!viewAll)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {isLoading ? (
          <BigCardSkeleton />
        ) : mcqBanks.length > 0 ? (
          mcqBanks.map((bank) => (
            <QuestionBankCard
              key={bank._id}
              _id={bank._id}
              mcqBankTitle={bank.mcqBankTitle}
              subjectName={bank.subjectName}
              description="Must have description"
              uploadedBy={bank.uploadedBy}
              totalMcq={bank.totalMcq ?? 0}
              onAdd={() => setCurrentView("addQuestion")}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No question banks found.
          </p>
        )}
      </div>

      {!viewAll && (
        <Pagination
          currentPage={page}
          totalPages={mcqData?.meta?.totalPages ?? 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <CommonSpace>
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
                name: "physiology_set_v1",
                questions: 156,
                topic: "Questions",
                subject: "Physiology",
                author: "Admin",
                timeAgo: "3 hour ago",
              },
            ]}
          />
        </div>
      </CommonSpace>
    </div>
  );
};

export default Content_Resource_Question_Bank;
