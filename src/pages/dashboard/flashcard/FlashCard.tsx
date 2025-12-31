import { IFlashcardBank } from "@/types";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FlashCard({
  source,
  ...flashcard
}: IFlashcardBank & { source?: "all" | "generated" }) {
  const navigate = useNavigate();
  const handleQuiz = (id: string) => {
    navigate(`/dashboard/solve-flash-card/${id}`, {
      state: { source: source, totalFlashCards: flashcard?.totalFlashCards },
    });
  };

  return (
    <div className="flex flex-col justify-between p-5 border border-slate-300 rounded-[12px]">
      <div className="mb-10">
        <div className="flex items-center gap-1">
          {/* <BrainCircuit className="text-zinc-950" /> */}
          <h3 className="text-[#0A0A0A]">
            {flashcard?.title} {flashcard?.subject && `- ${flashcard?.subject}`}
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          {flashcard?.totalFlashCards} flashcard{" "}
          {flashcard?.topic && `• ${flashcard?.topic}`}
        </p>
      </div>
      <button
        onClick={() => handleQuiz(flashcard?._id)}
        className="w-full rounded-[4px] py-3 flex justify-center gap-1 items-center bg-emerald-800 text-white cursor-pointer"
      >
        <Play className="w-4 h-4" /> View Card
      </button>
    </div>
  );
}
