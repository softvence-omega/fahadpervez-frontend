import React, { useState } from "react";
import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Plus, ArrowLeft } from "lucide-react";
import FlashcardDeckCard from "@/components/AdminDashboard/Content & Resource_Component/Flashcard/FlashCardDeck";
import Pagination from "@/components/AdminDashboard/Content & Resource_Component/Pagination";
import Create_New_Flashcard_Deck from "./Create_New_Flashcard_Deck";
import AddFlashcard from "./AddFlashcard";
import CommonSpace from "@/common/space/CommonSpace";

interface AllFlashcardProps {
  onBack?: () => void;
}

const All_Flashcard: React.FC<AllFlashcardProps> = ({ onBack }) => {
  type View = "homepage" | "create" | "addFlashcard" | "viewAll";
  const [currentView, setCurrentView] = useState<View>("homepage");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // ✅ Flashcards data
  const [flashcardDecks, setFlashcardDecks] = useState([
    {
      title: "Anatomy Basics",
      cards: 25,
      subject: "Anatomy",
      created: "2024-06-01",
    },
    {
      title: "Physiology Concepts",
      cards: 30,
      subject: "Physiology",
      created: "2024-06-02",
    },
    {
      title: "Pathology Review",
      cards: 20,
      subject: "Pathology",
      created: "2024-06-03",
    },
    {
      title: "Pharmacology Drugs",
      cards: 40,
      subject: "Pharmacology",
      created: "2024-06-04",
    },
    {
      title: "Biochemistry Essentials",
      cards: 15,
      subject: "Biochemistry",
      created: "2024-06-05",
    },
    {
      title: "Microbiology Organisms",
      cards: 35,
      subject: "Microbiology",
      created: "2024-06-06",
    },
    {
      title: "Clinical Medicine Cases",
      cards: 28,
      subject: "Clinical Medicine",
      created: "2024-06-07",
    },
    {
      title: "Surgery Procedures",
      cards: 22,
      subject: "Surgery",
      created: "2024-06-08",
    },
    {
      title: "Pediatrics Milestones",
      cards: 18,
      subject: "Pediatrics",
      created: "2024-06-09",
    },
    {
      title: "OB/GYN Topics",
      cards: 24,
      subject: "OB/GYN",
      created: "2024-06-10",
    },
    {
      title: "Psychiatry Disorders",
      cards: 32,
      subject: "Psychiatry",
      created: "2024-06-11",
    },
    {
      title: "Radiology Imaging",
      cards: 16,
      subject: "Radiology",
      created: "2024-06-12",
    },
    {
      title: "Emergency Medicine",
      cards: 38,
      subject: "Emergency",
      created: "2024-06-13",
    },
    {
      title: "Dermatology Conditions",
      cards: 19,
      subject: "Dermatology",
      created: "2024-06-14",
    },
    {
      title: "Cardiology Heart",
      cards: 27,
      subject: "Cardiology",
      created: "2024-06-15",
    },
    {
      title: "Neurology Brain",
      cards: 23,
      subject: "Neurology",
      created: "2024-06-16",
    },
    {
      title: "Orthopedics Bones",
      cards: 21,
      subject: "Orthopedics",
      created: "2024-06-17",
    },
    {
      title: "Ophthalmology Eyes",
      cards: 14,
      subject: "Ophthalmology",
      created: "2024-06-18",
    },
  ]);

  // ✅ Delete handler
  const handleDeleteDeck = (title: string) => {
    setFlashcardDecks((prev) => prev.filter((deck) => deck.title !== title));
  };

  // ✅ Apply search filtering (case-insensitive)
  const filteredDecks = flashcardDecks.filter(
    (deck) =>
      deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deck.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredDecks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredDecks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // ✅ Internal view navigation
  if (currentView === "create")
    return (
      <Create_New_Flashcard_Deck onBack={() => setCurrentView("homepage")} />
    );
  if (currentView === "addFlashcard")
    return <AddFlashcard onBack={() => setCurrentView("homepage")} />;

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
            onChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1); // reset to first page on new search
            }}
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

      {/* ✅ Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">
          All Flashcard Decks
        </h2>
        <p className="text-gray-600">
          Showing{" "}
          {filteredDecks.length > 0
            ? `${startIndex + 1}-${Math.min(endIndex, filteredDecks.length)}`
            : "0"}{" "}
          of {filteredDecks.length} flashcard decks
        </p>
      </div>

      {/* ✅ Flashcard Decks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((deck, i) => (
            <FlashcardDeckCard
              key={startIndex + i}
              title={deck.title}
              cards={deck.cards}
              subject={deck.subject}
              created={deck.created}
              onAddCard={() => setCurrentView("addFlashcard")}
              onDelete={() => handleDeleteDeck(deck.title)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full py-10">
            No flashcard decks found.
          </p>
        )}
      </div>

      {/* ✅ Pagination */}
      {filteredDecks.length > 0 && (
        <CommonSpace>
          <div className="flex justify-center mt-4 sm:mt-6">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </CommonSpace>
      )}
    </div>
  );
};

export default All_Flashcard;
