import React, { useState } from "react";
import StatsCard from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/AdminDashboard/Content & Resource_Component/QuestionBank/SearchBar";
import { Button } from "../../../../../components/ui/button";
import { NotebookIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Clinical_Case_Card from "@/components/AdminDashboard/Content & Resource_Component/Clinical Case/Clinical_Case_Card";
import AddClinicalCasePage from "./Add_Clinical_Case";
import Bulk_Upload_Clinical_Case from "./Bulk_Update_Clinical_Case";
import ClinicalCasePage from "./View_Clinical_Case";
import CommonSpace from "@/common/space/CommonSpace";

type ViewType = "homepage" | "add" | "bulk" | "view";

type GenderType = "Male" | "Female" | "Other";
type DifficultyType = "Beginner" | "Intermediate" | "Advanced";

type ClinicalCase = {
  title: string;
  category: string;
  gender: GenderType;
  questionNumber: number;
  questionType: string;
  difficulty: DifficultyType;
  status: "Publish" | "Draft";
};

const OSCE_Homepage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("homepage");
  const [searchQuery, setSearchQuery] = useState("");

  const [clinicalCases, setClinicalCases] = useState<ClinicalCase[]>([
    {
      title: "Cardiology Case Study",
      category: "Heart",
      gender: "Male",
      questionNumber: 12,
      questionType: "MCQ",
      difficulty: "Beginner",
      status: "Publish",
    },
    {
      title: "Neurology Practical",
      category: "Brain",
      gender: "Female",
      questionNumber: 8,
      questionType: "Questions",
      difficulty: "Intermediate",
      status: "Draft",
    },
    {
      title: "Gastroenterology Analysis",
      category: "Stomach",
      gender: "Other",
      questionNumber: 10,
      questionType: "Theory",
      difficulty: "Advanced",
      status: "Publish",
    },
  ]);

  // Filtered Cases based on Search
  const filteredCases = clinicalCases.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete handler
  const handleDelete = (index: number) => {
    const updatedCases = [...clinicalCases];
    updatedCases.splice(index, 1);
    setClinicalCases(updatedCases);
  };

  // Conditional Views
  if (currentView === "add")
    return <AddClinicalCasePage onBack={() => setCurrentView("homepage")} />;
  if (currentView === "bulk")
    return (
      <Bulk_Upload_Clinical_Case onBack={() => setCurrentView("homepage")} />
    );
  if (currentView === "view")
    return <ClinicalCasePage onBack={() => setCurrentView("homepage")} />;

  return (
    <div className="space-y-6 w-full">
      {/* Stats Section */}
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

      {/* Search + Add + Bulk Buttons */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-2 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Clinical Cases"
            onChange={(val) => setSearchQuery(val)}
          />
        </div>
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() => setCurrentView("add")}
            className="border border-slate-300  cursor-pointer font-Geist w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Plus className="w-4 h-4 " />
            <p className="md:hidden lg:block">Add Clinical Case</p>
          </button>
        </div>
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

      {/* Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Clinical Cases</h2>
        <Link to="/upload-content/all_clinical_cases">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* Clinical Case List */}
      <div className="space-y-4">
        {filteredCases.length > 0 ? (
          filteredCases.map((c, i) => (
            <div
              key={i}
              onClick={(e) => {
                // Prevent click if delete button is clicked
                if (
                  (e.target as HTMLElement).closest(".clinical-case-delete-btn")
                ) {
                  e.stopPropagation();
                  return;
                }
                setCurrentView("view");
              }}
              className="cursor-pointer"
            >
              <Clinical_Case_Card
                title={c.title}
                category={c.category}
                gender={c.gender}
                questionNumber={c.questionNumber}
                questionType={c.questionType}
                difficulty={c.difficulty}
                status={c.status}
                onDelete={() => handleDelete(i)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default OSCE_Homepage;
