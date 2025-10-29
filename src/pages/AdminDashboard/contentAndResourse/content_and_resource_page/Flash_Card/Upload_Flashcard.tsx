// import React, { useState } from "react";
// import StatsCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/StatsCard";
// import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
// import RecentActivity from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/RecentActivity";
// import ButtonWithIcon from "@/common/button/ButtonWithIcon";
// import { RectangleHorizontalIcon, Plus } from "lucide-react";
// import FlashcardDeckCard from "@/components/AdminDashboard/Content & Resource_Component/Flashcard/FlashCardDeck";
// import Create_New_Flashcard_Deck from "./Create_New_Flashcard_Deck";
// import AddFlashcard from "./AddFlashcard";
// import CommonSpace from "@/common/space/CommonSpace";
// import ViewAllButton from "@/components/AdminDashboard/Content & Resource_Component/ViewAllButton";

// const Upload_Flashcard: React.FC = () => {
//   type View = "homepage" | "create" | "addFlashcard" | "viewAll";
//   const [currentView, setCurrentView] = useState<View>("homepage");
//   const [viewAll, setViewAll] = useState(false);

//   if (currentView === "create")
//     return (
//       <Create_New_Flashcard_Deck onBack={() => setCurrentView("homepage")} />
//     );
//   if (currentView === "addFlashcard")
//     return <AddFlashcard onBack={() => setCurrentView("homepage")} />;

//   return (
//     <div className="space-y-6 w-full">
//       {/* ✅ Stats Section */}
//       <CommonSpace>
//         <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
//           {[...Array(4)].map((_, i) => (
//             <StatsCard
//               key={i}
//               title={
//                 i === 0
//                   ? "Total Flash Set"
//                   : i === 3
//                   ? "Published"
//                   : "Total Question Imported"
//               }
//               value={i === 0 ? 10 : 3420}
//               subtitle="Across all subjects"
//               icon={
//                 <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
//               }
//             />
//           ))}
//         </div>
//       </CommonSpace>

//       {/* ✅ Search + Add Button */}
//       <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
//         <div className="w-full lg:w-[740px] ">
//           <SearchBar
//             placeholder="Search Flashcard Deck"
//             onChange={(val) => setSearchTerm(val)}
//           />
//         </div>

//         <div className="w-full sm:w-auto mt-2 sm:mt-0">
//           <ButtonWithIcon
//             icon={Plus}
//             className=""
//             onClick={() => setCurrentView("create")}
//           >
//             Add Flashcard Deck
//           </ButtonWithIcon>
//         </div>
//       </div>

//       {/* ✅ Header with View All */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
//         <h2 className="text-lg sm:text-xl font-semibold">Flashcard Deck</h2>
//         <ViewAllButton
//           isActive={viewAll}
//           onClick={() => setViewAll(!viewAll)}
//         />
//       </div>

//       {/* ✅ Flashcard Decks List */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//         {filteredDecks.length > 0 ? (
//           filteredDecks.map((deck: any, i: number) => (
//             <FlashcardDeckCard
//               key={i}
//               title={deck.title}
//               cards={deck.cards}
//               subject={deck.subject}
//               created={deck.created}
//               onAddCard={() => setCurrentView("addFlashcard")}
//               onDelete={() => handleDeleteDeck(deck.title)}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full py-10">
//             No flashcard decks found.
//           </p>
//         )}
//       </div>

//       {/* ✅ Recent Activity */}
//       <CommonSpace>
//         <div className="overflow-x-auto">
//           <RecentActivity
//             activities={[
//               {
//                 name: "Anatomy - Cardiovascular System",
//                 questions: 198,
//                 topic: "Flashcards",
//                 subject: "Cardiology",
//                 author: "Dr. Smith",
//                 timeAgo: "2 hour ago",
//               },
//               {
//                 name: "Anatomy - Nervous System",
//                 questions: 120,
//                 topic: "Flashcards",
//                 subject: "Neurology",
//                 author: "Admin",
//                 timeAgo: "3 hour ago",
//               },
//               {
//                 name: "Anatomy - Respiratory System",
//                 questions: 156,
//                 topic: "Flashcards",
//                 subject: "Pulmonology",
//                 author: "Admin",
//                 timeAgo: "5 hour ago",
//               },
//             ]}
//           />
//         </div>
//       </CommonSpace>
//     </div>
//   );
// };

// export default Upload_Flashcard;


import React, { useState, useMemo } from "react";
import StatsCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
import RecentActivity from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/RecentActivity";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { RectangleHorizontalIcon, Plus } from "lucide-react";
import FlashcardDeckCard from "@/components/AdminDashboard/Content & Resource_Component/Flashcard/FlashCardDeck";
import Create_New_Flashcard_Deck from "./Create_New_Flashcard_Deck";
import AddFlashcard from "./AddFlashcard";
import CommonSpace from "@/common/space/CommonSpace";
import ViewAllButton from "@/components/AdminDashboard/Content & Resource_Component/ViewAllButton";

const Upload_Flashcard: React.FC = () => {
  type View = "homepage" | "create" | "addFlashcard" | "viewAll";

  const [currentView, setCurrentView] = useState<View>("homepage");
  const [viewAll, setViewAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Dummy flashcard data (replace with API data later)
  const [flashcardDecks, setFlashcardDecks] = useState([
    {
      title: "Anatomy - Cardiovascular System",
      cards: 50,
      subject: "Cardiology",
      created: "2 days ago",
    },
    {
      title: "Anatomy - Nervous System",
      cards: 42,
      subject: "Neurology",
      created: "1 week ago",
    },
    {
      title: "Anatomy - Respiratory System",
      cards: 36,
      subject: "Pulmonology",
      created: "5 days ago",
    },
  ]);

  // ✅ Filter flashcards by search term
  const filteredDecks = useMemo(() => {
    if (!searchTerm) return flashcardDecks;
    return flashcardDecks.filter((deck) =>
      deck.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [flashcardDecks, searchTerm]);

  // ✅ Delete handler
  const handleDeleteDeck = (title: string) => {
    setFlashcardDecks((prev) => prev.filter((deck) => deck.title !== title));
  };

  // ✅ View switchers
  if (currentView === "create")
    return (
      <Create_New_Flashcard_Deck onBack={() => setCurrentView("homepage")} />
    );

  if (currentView === "addFlashcard")
    return <AddFlashcard onBack={() => setCurrentView("homepage")} />;

  // ✅ Main layout
  return (
    <div className="space-y-6 w-full">
      {/* Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <StatsCard
              key={i}
              title={
                i === 0
                  ? "Total Flash Set"
                  : i === 3
                  ? "Published"
                  : "Total Question Imported"
              }
              value={i === 0 ? 10 : 3420}
              subtitle="Across all subjects"
              icon={
                <RectangleHorizontalIcon className="w-6 h-6 text-orange-500 rotate-36" />
              }
            />
          ))}
        </div>
      </CommonSpace>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="w-full lg:w-[740px]">
          <SearchBar
            placeholder="Search Flashcard Deck"
            onChange={(val) => setSearchTerm(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            className=""
            onClick={() => setCurrentView("create")}
          >
            Add Flashcard Deck
          </ButtonWithIcon>
        </div>
      </div>

      {/* Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Flashcard Deck</h2>
        <ViewAllButton
          isActive={viewAll}
          onClick={() => setViewAll(!viewAll)}
        />
      </div>

      {/* Flashcard Deck List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredDecks.length > 0 ? (
          filteredDecks.map((deck, i) => (
            <FlashcardDeckCard
              key={i}
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

      {/* Recent Activity */}
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
                timeAgo: "2 hours ago",
              },
              {
                name: "Anatomy - Nervous System",
                questions: 120,
                topic: "Flashcards",
                subject: "Neurology",
                author: "Admin",
                timeAgo: "3 hours ago",
              },
              {
                name: "Anatomy - Respiratory System",
                questions: 156,
                topic: "Flashcards",
                subject: "Pulmonology",
                author: "Admin",
                timeAgo: "5 hours ago",
              },
            ]}
          />
        </div>
      </CommonSpace>
    </div>
  );
};

export default Upload_Flashcard;
