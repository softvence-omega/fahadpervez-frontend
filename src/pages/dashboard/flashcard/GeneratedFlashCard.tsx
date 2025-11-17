import { useGetFlashCardBankQuery } from "@/store/features/flashCard/flashCard.api";
import { IFlashcardBank } from "@/types";
import FlashCard from "./FlashCard";
import { Link } from "react-router-dom";
import GlobalLoader2 from "@/common/GlobalLoader2";

export default function GeneratedFlashCard() {
  const { data: flashcardData, isLoading } = useGetFlashCardBankQuery({});
  const flashcardBank = flashcardData?.data;
  console.log(flashcardBank);

  if (isLoading) return <GlobalLoader2 />;
  return (
    <div>
      <div className="bg-white border border-slate-300 p-5 rounded-[8px]">
        <h3 className="font-medium mb-6">Today's Generated Flashcards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {flashcardBank?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
        </div>
      </div>

      <div className="mt-12 bg-white border border-slate-300 p-5 rounded-[8px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Generated Cards</h3>
          <Link
            to={"/dashboard/all-flash-card"}
            className="text-blue-main text-sm font-medium border border-slate-200 rounded-[6px] py-2 px-4"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {flashcardBank?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
        </div>
      </div>
    </div>
  );
}
