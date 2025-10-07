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
import CommonSpace from "@/common/space/CommonSpace";

type ViewType = "homepage" | "add" | "bulk" | "view";

const OSCE_Homepage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("homepage");

  // Render based on current view
  if (currentView === "add") return <AddClinicalCasePage onBack={() => setCurrentView("homepage")} />;
  if (currentView === "bulk") return <Bulk_Upload_Clinical_Case onBack={() => setCurrentView("homepage")} />;
  if (currentView === "view") return <ClinicalCasePage onBack={() => setCurrentView("homepage")} />;

  return (
    <div className="space-y-6 w-full">
      {/* ✅ Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center sm:justify-items-start gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <StatsCard
              key={i}
              title="Total Stations"
              value={10}
              subtitle="OSCE Station Published"
              icon={<NotebookIcon className="w-6 h-6 text-indigo-700" />}
            />
          ))}
        </div>
      </CommonSpace>

      {/* ✅ Search + Add + Bulk Buttons */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Clinical Cases"
            onChange={(val) => console.log(val)}
          />
        </div>

        {/* Add Clinical Case Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setCurrentView("add")}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200"
          >
            Add Clinical Case
          </ButtonWithIcon>
        </div>

        {/* Bulk Upload Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() => setCurrentView("bulk")}
            className="flex items-center justify-center gap-1 w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-md border border-slate-300 bg-white text-black hover:bg-gray-100 cursor-pointer font-Geist transition-all duration-200"
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

      {/* ✅ Clinical Case List */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} onClick={() => setCurrentView("view")} className="cursor-pointer">
            <Clinical_Case_Card
              title={`Sample Title ${i + 1}`}
              category="Sample Category"
              gender={i === 0 ? "Other" : i === 1 ? "Male" : "Female"}
              questionNumber={10 - i * 3}
              questionType={i === 0 ? "MCQ" : i === 1 ? "Questions" : "Theory"}
              difficulty={i === 0 ? "Beginner" : i === 1 ? "Advanced" : "Intermediate"}
              status="Publish"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OSCE_Homepage;
