import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { NotepadTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Notes_Card from "@/components/admin_Content & Resource_Component/Notes/Notes_Card";
import Upload_New_Note from "./Upload_New_Note";
import CommonSpace from "@/common/space/CommonSpace";

type ViewType = "homepage" | "add";

interface NoteType {
  title: string;
  category: string;
  description: string;
  pages: number;
  status: "published" | "draft";
}

const Notes_HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("homepage");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Notes data
  const [notes, setNotes] = useState<NoteType[]>([
    { title: "Types of Shock 1", category: "Heart Sounds", description: "Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure.", pages: 20, status: "published" },
    { title: "Types of Shock 2", category: "Heart Sounds", description: "Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure.", pages: 20, status: "draft" },
    { title: "Heart Failure Basics", category: "Heart Sounds", description: "Understanding the pathophysiology and management of heart failure.", pages: 15, status: "published" },
    { title: "ECG Interpretation", category: "Heart Sounds", description: "Learn the basics of ECG reading and interpretation.", pages: 10, status: "published" },
    { title: "Cardiogenic Shock", category: "Heart Sounds", description: "Detailed notes on cardiogenic shock and its management.", pages: 18, status: "draft" },
    { title: "Acute Myocardial Infarction", category: "Heart Sounds", description: "Comprehensive overview of AMI presentation and management.", pages: 25, status: "published" },
  ]);

  // Delete handler
  const handleDelete = (title: string) => {
    setNotes((prev) => prev.filter((note) => note.title !== title));
  };

  // Filter notes by title or category
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentView === "add") {
    return <Upload_New_Note onBack={() => setCurrentView("homepage")} />;
  }

  return (
    <div className="space-y-6 w-full">
      {/* Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center sm:justify-items-start gap-4 sm:gap-6">
          <StatsCard
            title="Total Notes"
            value={10}
            subtitle="OSCE Station Published"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Published"
            value={5}
            subtitle="Cardiovascular notes Published"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Last Upload"
            value={1}
            subtitle="Cardiovascular notes 2025-09-12"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Drafts"
            value={3}
            subtitle="Unpublished Notes"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
        </div>
      </CommonSpace>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Notes"
            onChange={(val) => setSearchQuery(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setCurrentView("add")}
            className="w-full sm:w-auto bg-gradient-to-tr from-[#0076F5] to-[#0058B8] hover:from-[#0069DB] hover:to-[#004C9E] text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200"
          >
            Add New Notes
          </ButtonWithIcon>
        </div>
      </div>

      {/* Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Notes</h2>
        <Link to="/upload-content/all_osce_stations">
          <button className="text-blue-600 hover:underline p-0 text-sm sm:text-base">
            View All
          </button>
        </Link>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, i) => (
            <Notes_Card
              key={i}
              category={note.category}
              title={note.title}
              description={note.description}
              pages={note.pages}
              status={note.status}
              onDelete={() => handleDelete(note.title)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Notes_HomePage;
