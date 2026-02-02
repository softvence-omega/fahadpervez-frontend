import { useGetAllGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import QuizCard from "./QuizCard";
import GlobalLoader from "@/common/GlobalLoader";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import FlashCardFilterModal from "../flashcard/FlashCardFilterModal";
import Pagination from "@/common/custom/Pagination";

export default function QuizCollection() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });
  const [page, setPage] = useState(1);

  const { data: quizzesResponse, isLoading } = useGetAllGeneratedMCQQuery({
    searchTerm,
    ...filters,
    page,
    limit: 12,
  });

  const quizzes = quizzesResponse?.data || [];
  const meta = quizzesResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <GlobalLoader />;

  return (
    <div className="md:mb-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by condition or keyword"
            className="w-full md:w-112.5 h-12 pl-10 pr-4 border border-slate-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page
            }}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-slate-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg text-zinc-800">All Quiz's</h3>
        </div>

        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            {quizzes.map((quiz: any) => (
              <QuizCard
                key={quiz.id || quiz._id}
                id={quiz.id || quiz._id}
                title={quiz.title || quiz.session || "Generated Quiz"}
                questionCount={
                  quiz.questions?.length ||
                  quiz.mcqs?.length ||
                  quiz.questionCount
                }
                sourceFile={quiz.sourceFile || quiz.fileName}
                isCompleted={
                  quiz.isCompleted ||
                  (quiz.tracking && quiz.tracking.totalAttemptCount > 0)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-xl">
            <p className="text-slate-500">
              No quizzes found. Generate one to get started!
            </p>
          </div>
        )}

        <div className="mt-6">
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {isFilterOpen && (
        <FlashCardFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
            setIsFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
