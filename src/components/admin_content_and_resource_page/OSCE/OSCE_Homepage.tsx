import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import { Plus, BookOpen } from "lucide-react";
import StationCard from "@/components/admin_Content & Resource_Component/OSCE/StationCard";
import Create_New_OSCE from "./Create_New_OSCE";
import Clinical_Skill_Lab from "./Clinical_Skill_Lab";
import CommonSpace from "@/common/space/CommonSpace";

type View = "homepage" | "create" | "clinical";

interface StationType {
  title: string;
  steps: number;
  videos: number;
  duration: string;
  description: string;
  category: string;
}

const OSCE_Homepage: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("homepage");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Dummy OSCE stations
  const [stations, setStations] = useState<StationType[]>([
    {
      title: "Cardiovascular Examination",
      steps: 12,
      videos: 1,
      duration: "~15 min",
      description: "Complete cardiovascular system examination including inspection, palpation, and auscultation",
      category: "Cardiovascular",
    },
    {
      title: "Neurological Examination",
      steps: 10,
      videos: 2,
      duration: "~20 min",
      description: "Comprehensive neurological assessment including cranial nerves, reflexes, and motor examination",
      category: "Neurology",
    },
    {
      title: "Respiratory Examination",
      steps: 8,
      videos: 1,
      duration: "~12 min",
      description: "Thorough respiratory system examination with inspection, palpation, percussion, and auscultation",
      category: "Respiratory",
    },
  ]);

  // Delete handler
  const handleDelete = (title: string) => {
    setStations((prev) => prev.filter((station) => station.title !== title));
  };

  // Filter stations based on search query
  const filteredStations = stations.filter((station) =>
    station.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Conditional Views
  if (currentView === "create") return <Create_New_OSCE onBack={() => setCurrentView("homepage")} />;
  if (currentView === "clinical") return <Clinical_Skill_Lab onBack={() => setCurrentView("homepage")} />;

  return (
    <div className="space-y-6 w-full">
      {/* Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center sm:justify-items-start gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <StatsCard
              key={i}
              title={`Total Stations`}
              value={10}
              subtitle="OSCE Station Published"
              icon={<BookOpen className="w-6 h-6 text-indigo-700" />}
            />
          ))}
        </div>
      </CommonSpace>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search OSCE Stations"
            onChange={(val: string) => setSearchQuery(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() => setCurrentView("create")}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add OSCE Station
          </button>
        </div>
      </div>

      {/* Header with View All */}
      <div className="flex justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">OSCE Stations</h2>
        <button className="text-blue-600 hover:underline p-0 text-sm sm:text-base">
          View All
        </button>
      </div>

      {/* OSCE Stations List */}
      <div className="space-y-4">
        {filteredStations.length > 0 ? (
          filteredStations.map((station, i) => (
            <StationCard
              key={i}
              title={station.title}
              steps={station.steps}
              videos={station.videos}
              duration={station.duration}
              description={station.description}
              category={station.category}
              onClick={() => setCurrentView("clinical")}
              onDelete={() => handleDelete(station.title)} // <-- delete action
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default OSCE_Homepage;
