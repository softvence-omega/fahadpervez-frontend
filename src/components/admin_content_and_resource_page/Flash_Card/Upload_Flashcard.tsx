import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import RecentActivity from "@/components/admin_Content & Resource_Component/QuestionBank/RecentActivity";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Link } from "react-router-dom";
import { RectangleHorizontalIcon, Plus } from "lucide-react";
import FlashcardDeckCard from "../../admin_Content & Resource_Component/Flashcard/FlashCardDeck";
import Create_New_Flashcard_Deck from "./Create_New_Flashcard_Deck";
import All_Flashcard from "./All_Flashcard";
import AddFlashcard from "./AddFlashcard";
import CommonSpace from "@/common/space/CommonSpace";

const Upload_Flashcard: React.FC = () => {
  type View = "homepage" | "create" | "addFlashcard" | "viewAll";

  const [currentView, setCurrentView] = useState<View>("homepage");

  if (currentView === "create") return <Create_New_Flashcard_Deck onBack={() => setCurrentView("homepage")} />;
  if (currentView === "addFlashcard") return <AddFlashcard onBack={() => setCurrentView("homepage")} />;
  if (currentView === "viewAll") return <All_Flashcard onBack={() => setCurrentView("homepage")} />;

  return (
    <div className="space-y-6 w-full">
      {/* ✅ Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <StatsCard
              key={i}
              title={i === 0 ? "Total Flash Set" : i === 3 ? "Published" : "Total Question Imported"}
              value={i === 0 ? 10 : 3420}
              subtitle="Across all subjects"
              icon={<RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />}
            />
          ))}
        </div>
      </CommonSpace>

      {/* ✅ Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Flashcard Deck"
            onChange={(val) => console.log(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
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
            onClick={() => setCurrentView("create")}
          >
            Add Flashcard Deck
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Flashcard Deck</h2>
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

      {/* ✅ Recent Activity */}
      <CommonSpace>
        <div className="overflow-x-auto">
          <RecentActivity
            activities={[
              {
                name: "Anatomy - Cardiovascular System",
                questions: 198,
                topic: "Flashcards",
                subject: "Cardiology",
                author: "Dr. Smith",
                timeAgo: "2 hour ago",
              },
              {
                name: "Anatomy - Nervous System",
                questions: 120,
                topic: "Flashcards",
                subject: "Neurology",
                author: "Admin",
                timeAgo: "3 hour ago",
              },
              {
                name: "Anatomy - Respiratory System",
                questions: 156,
                topic: "Flashcards",
                subject: "Pulmonology",
                author: "Admin",
                timeAgo: "5 hour ago",
              },
            ]}
          />
        </div>
      </CommonSpace>
    </div>
  );
};

export default Upload_Flashcard;
