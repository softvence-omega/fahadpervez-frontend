import { useGetGeneratedFlashCardQuery } from "@/store/features/flashCard/flashCard.api";
import { IFlashcardBank } from "@/types";
import FlashCard from "./FlashCard";
// import { Link } from "react-router-dom";
import GlobalLoader2 from "@/common/GlobalLoader2";
import Pagination from "@/common/custom/Pagination";
import { useState } from "react";

export default function GeneratedFlashCard({
  searchTerm,
  filters,
}: {
  searchTerm: string;
  filters: { subject: string; system: string; topic: string };
}) {
  const [page, setPage] = useState(1);
  const { data: flashcardData, isLoading } = useGetGeneratedFlashCardQuery({
    searchTerm,
    filters,
  }) as { data: { data: IFlashcardBank[] } | undefined; isLoading: boolean };
  const allGeneratedFlashcard = flashcardData?.data ?? [];
  const totalPages = flashcardData?.data
    ? Math.ceil(flashcardData.data.length / 10)
    : 1;
  console.log(allGeneratedFlashcard);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <GlobalLoader2 />;
  return (
    <div>
      {/* <div className="bg-white border border-slate-300 p-5 rounded-[8px]">
        <h3 className="font-medium mb-6">Today's Generated Flashcards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {allGeneratedFlashcard?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
        </div>
      </div> */}

      <div className="mt-12 bg-white border border-slate-300 p-5 rounded-[8px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Generated Cards</h3>
          {/* <Link
            to={"/dashboard/all-flash-card"}
            className="text-blue-main text-sm font-medium border border-slate-200 rounded-[6px] py-2 px-4"
          >
            View all
          </Link> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {allGeneratedFlashcard?.length > 0 ? (
            allGeneratedFlashcard.map(
              (flashcard: IFlashcardBank, idx: number) => (
                <FlashCard key={idx} {...flashcard} />
              )
            )
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No flashcards found.
            </p>
          )}
        </div>
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
    </div>
  );
}
