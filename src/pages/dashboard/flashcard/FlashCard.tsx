import { IFlashcardBank } from "@/types";
import { BrainCircuit, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FlashCard(flashcard: IFlashcardBank) {
  const navigate = useNavigate();
  console.log(flashcard.title);
  const handleQuiz = (id: string) => {
    navigate(`/dashboard/solve-flash-card/${id}`);
  };

  return (
    <div>
      <div className="p-5 border border-slate-300 rounded-[12px]">
        <div className="mb-10">
          <div className="flex items-center gap-1">
            <BrainCircuit className="text-zinc-950" />
            <h3 className="text-[#0A0A0A]">
              {flashcard?.title} - {flashcard?.subject}
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {flashcard?.totalFlashCards} flashcard • {flashcard?.topic}
          </p>
        </div>
        <button
          onClick={() => handleQuiz(flashcard?._id)}
          className="w-full rounded-[4px] py-3 flex justify-center gap-1 items-center bg-emerald-800 text-white cursor-pointer"
        >
          <Play className="w-4 h-4" /> View Card
        </button>
      </div>
    </div>
  );
}
