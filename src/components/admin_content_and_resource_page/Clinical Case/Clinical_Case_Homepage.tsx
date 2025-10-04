import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { NotebookIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Clinical_Case_Card from "@/components/admin_Content & Resource_Component/Clinical Case/Clinical_Case_Card";
import AddClinicalCasePage from "./Add_Clinical_Case";
import Bulk_Upload_Clinical_Case from "./Bulk_Update_Clinical_Case";
import ClinicalCasePage from "./View_Clinical_Case";

type ViewType = "homepage" | "add" | "bulk" | "view";

const OSCE_Homepage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("homepage");

  // Render based on current view
  if (currentView === "add") {
    return <AddClinicalCasePage onBack={() => setCurrentView("homepage")} />;
  }

  if (currentView === "bulk") {
    return (
      <Bulk_Upload_Clinical_Case onBack={() => setCurrentView("homepage")} />
    );
  }

  if (currentView === "view") {
    return <ClinicalCasePage />;
  }

  // Homepage view
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

        {/* Add Clinical Case Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setCurrentView("add")}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Add Clinical Case
          </ButtonWithIcon>
        </div>

        {/* Bulk Upload Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() => setCurrentView("bulk")}
            className="flex items-center gap-1 w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-md border border-slate-300 bg-white text-black hover:bg-gray-100 cursor-pointer font-Geist"
          >
            <Plus className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Clinical Cases</h2>
        <Link to="/upload-content/all_clinical_cases">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* ✅ List */}
      <div className="space-y-4">
        <div onClick={() => setCurrentView("view")} className="cursor-pointer">
          <Clinical_Case_Card
            title="Sample Title"
            category="Sample Category"
            gender="Other"
            questionNumber={10}
            questionType="MCQ"
            difficulty="Beginner"
            status="Publish"
          />
        </div>
        <div onClick={() => setCurrentView("view")} className="cursor-pointer">
          <Clinical_Case_Card
            title="Sample Title"
            category="Sample Category"
            gender="Male"
            questionNumber={5}
            questionType="Questions"
            difficulty="Advanced"
            status="Publish"
          />
        </div>
        <div onClick={() => setCurrentView("view")} className="cursor-pointer">
          <Clinical_Case_Card
            title="Sample Title"
            category="Sample Category"
            gender="Female"
            questionNumber={3}
            questionType="Theory"
            difficulty="Intermediate"
            status="Publish"
          />
        </div>
      </div>
    </div>
  );
};

export default OSCE_Homepage;
