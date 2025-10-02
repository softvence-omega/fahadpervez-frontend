import React from "react";
import StatsCard from "@/components/admin_Content & Resource/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import RecentActivity from "@/components/admin_Content & Resource/QuestionBank/RecentActivity";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Link } from "react-router-dom";
import { RectangleHorizontalIcon, Plus } from "lucide-react";
import FlashcardDeckCard from "../../admin_Content & Resource/Flashcard/FlashCardDeck";

const Upload_Flashcard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Flash Set"
          value={10}
          subtitle="Across all subjects"
          icon={
            <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
          }
        />
        <StatsCard
          title="Total Question Imported"
          value={3420}
          subtitle="Across all subjects"
          icon={
            <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
          }
        />
        <StatsCard
          title="Total Question Imported"
          value={3420}
          subtitle="Across all subjects"
          icon={
            <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
          }
        />
        <StatsCard
          title="Published"
          value={180}
          subtitle="MCQ Bank Published"
          icon={
            <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
          }
        />
      </div>

      {/* ✅ Search + Add Button */}
      <div className="mt-8 flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
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
          >
            Add Flashcard Deck
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Flashcard Deck</h2>
        <Link to="/upload-content/all_flashcard_deck">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* ✅ Question Banks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
        <FlashcardDeckCard
          title="Sample Flashcard Deck"
          cards={10}
          subject="Anatomy"
          created="2024-06-01"
        />
      </div>

      {/* ✅ Recent Activity */}
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
              name: "Anatomy - Cardiovascular System",
              questions: 198,
              topic: "Flashcards",
              subject: "Cardiology",
              author: "Dr. Smith",
              timeAgo: "2 hour ago",
            },
            {
              name: "Anatomy - Cardiovascular System",
              questions: 198,
              topic: "Flashcards",
              subject: "Cardiology",
              author: "Dr. Smith",
              timeAgo: "2 hour ago",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Upload_Flashcard;
