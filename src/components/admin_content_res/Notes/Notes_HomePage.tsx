import React from "react";
import StatsCard from "@/components/admin_Content & Resource/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import {  NotepadTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Notes_Card from "@/components/admin_Content & Resource/Notes/Notes_Card";

const Notes_HomePage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
          subtitle="Cardiovascular notes  2025-09-12"
          icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
        />
      </div>

      {/* ✅ Search + Add Button */}
      <div className="mt-4 flex flex-col sm:flex-row w-full gap-2 sm:gap-4 items-center">
        {/* Search */}
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Question Bank"
            onChange={(val) => console.log(val)}
          />
        </div>

        {/* Add Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Add OSCE Station
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">OSCE Stations</h2>
        <Link to="/upload-content/all_osce_stations">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* ✅ Question Banks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="published"
        />
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="draft"
        />
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="published"
        />
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="draft"
        />
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="published"
        />
        <Notes_Card
          category="Heart Sounds"
          title="Types of Shock"
          description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
          pages={20}
          status="draft"
        />
      </div>
    </div>
  );
};

export default Notes_HomePage;
