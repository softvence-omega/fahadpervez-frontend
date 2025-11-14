import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FlashCard from "./FlashCard";
import { useGetFlashCardBankQuery } from "@/store/features/flashCard/flashCard.api";
import { IFlashcardBank } from "@/types";

export default function FlashCardCollection() {
  const { data: flashcardData } = useGetFlashCardBankQuery({});
  const flashcardBank = flashcardData?.data;
  console.log(flashcardBank);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/flashcard-page"} className="mb-7">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Your Flashcard Collection"
          titleSize="text-xl"
          description="AI-powered spaced repetition learning"
          className="mt-12 mb-12 space-y-1"
        />
      </div>

      <div className="bg-white border border-slate-300 p-5 rounded-[8px]">
        <h3 className="font-medium mb-6">Today's Generated Flashcards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {flashcardBank?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
          {/* <FlashCard /> */}
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
