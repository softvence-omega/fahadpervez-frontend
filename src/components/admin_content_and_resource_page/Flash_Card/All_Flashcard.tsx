import React, { useState } from "react";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Plus, ArrowLeft } from "lucide-react";
import FlashcardDeckCard from "../../admin_Content & Resource_Component/Flashcard/FlashCardDeck";
import Pagination from "@/components/admin_Content & Resource_Component/Pagination";
import Create_New_Flashcard_Deck from "./Create_New_Flashcard_Deck";
import AddFlashcard from "./AddFlashcard";
import CommonSpace from "@/common/space/CommonSpace";

interface AllFlashcardProps {
  onBack?: () => void;
}

const All_Flashcard: React.FC<AllFlashcardProps> = ({ onBack }) => {
  type View = "homepage" | "create" | "addFlashcard" | "viewAll";
  const [currentView, setCurrentView] = useState<View>("homepage");

  // Internal navigation
  if (currentView === "create")
    return <Create_New_Flashcard_Deck onBack={() => setCurrentView("homepage")} />;
  if (currentView === "addFlashcard")
    return <AddFlashcard onBack={() => setCurrentView("homepage")} />;
  if (currentView === "viewAll")
    return <All_Flashcard onBack={() => setCurrentView("homepage")} />;

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="space-y-6 w-full">
      {/* 🔙 Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base font-medium">Back</span>
      </button>

      {/* ✅ Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Flashcard Decks"
            onChange={(val) => console.log(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setCurrentView("create")}
            className="
              w-full sm:w-auto
              bg-gradient-to-tr from-[#0076F5] to-[#0058B8]
              hover:from-[#0069DB] hover:to-[#004C9E]
              text-white font-medium
              px-4 py-2 sm:px-5 sm:py-2.5
              rounded-md text-sm sm:text-base
              flex items-center justify-center gap-2
              transition-all duration-200
            "
          >
            Add Flashcard Deck
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">All Flashcard Decks</h2>
      </div>

      {/* ✅ Flashcard Decks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <FlashcardDeckCard
            key={i}
            title={`Sample Flashcard Deck ${i + 1}`}
            cards={10}
            subject="Anatomy"
            created="2024-06-01"
            onAddCard={() => setCurrentView("addFlashcard")}
          />
        ))}
      </div>

      {/* ✅ Pagination */}
      <CommonSpace>
        <div className="flex justify-center mt-4 sm:mt-6">
          <Pagination
            totalPages={5}
            currentPage={1}
            onPageChange={(page: number) => console.log("Page changed to:", page)}
          />
        </div>
      </CommonSpace>
    </div>
  );
};

export default All_Flashcard;
