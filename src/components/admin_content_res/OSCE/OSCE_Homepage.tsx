import React from "react";
import StatsCard from "@/components/admin_Content & Resource/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource/QuestionBank/SearchBar";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { NotebookIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import StationCard from "@/components/admin_Content & Resource/OSCE/StationCard";

const OSCE_Homepage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Stations"
          value={10}
          subtitle="OSCE Station Published"
          icon={<NotebookIcon className="w-6 h-6 text-indigo-700" />}
        />
        <StatsCard
          title="Total Stations"
          value={10}
          subtitle="OSCE Station Published"
          icon={<NotebookIcon className="w-6 h-6 text-indigo-700" />}
        />
        <StatsCard
          title="Total Stations"
          value={10}
          subtitle="OSCE Station Published"
          icon={<NotebookIcon className="w-6 h-6 text-indigo-700" />}
        />
        <StatsCard
          title="Total Stations"
          value={10}
          subtitle="OSCE Station Published"
          icon={<NotebookIcon className="w-6 h-6 text-indigo-700" />}
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
      <div className="space-y-4">
        <StationCard
          title="Cardiovascular Examination"
          steps={12}
          videos={1}
          duration="~15 min"
          description="Complete cardiovascular system examination including inspection, palpation, and auscultation"
          category="Cardiovascular"
        />
        <StationCard
          title="Cardiovascular Examination"
          steps={12}
          videos={1}
          duration="~15 min"
          description="Complete cardiovascular system examination including inspection, palpation, and auscultation"
          category="Cardiovascular"
        />
        <StationCard
          title="Cardiovascular"
          steps={12}
          videos={1}
          duration="~15 min"
          description="Complete cardiovascular system examination including inspection, palpation, and auscultation"
          category="Cardiovascular"
        />
      </div>
    </div>
  );
};

export default OSCE_Homepage;
