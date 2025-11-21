/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useGetAllClinicalCaseQuery } from "@/store/features/clinicalCase/clinicalCase.api";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { ClinicalCaseData } from "@/types/clinicalCase";

// interface ClinicalCase {
//   _id: string;
//   caseName: string;
//   caseHistory: string;
//   topic: string;
//   isAIGenerated: boolean;
//   profile_type: string;
//   status?: "completed" | "available"; // optional fallback
// }

type TabType = "All Cases" | "AI Generated" | "Complete Cases";
type FilterOption = string;

const AllClinicalCases: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodySystem, setSelectedBodySystem] =
    useState<FilterOption>("All");
  const [selectedTopic, setSelectedTopic] = useState<FilterOption>("All");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<FilterOption>("All");
  const [activeTab, setActiveTab] = useState<TabType>("All Cases");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { data, isLoading } = useGetAllClinicalCaseQuery(undefined);

  // Extract clinical cases
  const clinicalCases: ClinicalCaseData[] = useMemo(() => data?.data || [], [data]);
console.log(clinicalCases)
  const casesPerPage = 6;

  const bodySystemOptions: FilterOption[] = [
    "All",
    "Cardiology",
    "Pulmonology",
    "Endocrinology",
    "Neurology",
  ];
  const difficultyOptions: FilterOption[] = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const topicOptions: FilterOption[] = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  // Derived data for display
  const filteredCases = useMemo(() => {
    let filtered = [...clinicalCases];

    if (activeTab === "AI Generated") {
      // filtered = filtered.filter((c) => c.isAIGenerated);
    } else if (activeTab === "Complete Cases") {
      // filtered = filtered.filter((c) => c.status === "completed");
    }

    // if (searchTerm) {
    //   filtered = filtered.filter(
    //     (c) =>
    //       c.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //       c.caseHistory.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    if (selectedBodySystem !== "All") {
      filtered = filtered.filter((c) => c.topic === selectedBodySystem);
    }

    // Difficulty filter (optional, only if your backend supports it)
    if (selectedDifficulty !== "All" && "difficulty" in filtered[0]) {
      filtered = filtered.filter(
        (c: any) => c.difficulty === selectedDifficulty
      );
    }

    return filtered;
  }, [
    clinicalCases,
    activeTab,
    searchTerm,
    selectedBodySystem,
    selectedDifficulty,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const startIndex = (currentPage - 1) * casesPerPage;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + casesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBodySystem, selectedDifficulty, activeTab]);

  // Reusable dropdown
  const Dropdown = ({
    value,
    onChange,
    options,
    placeholder,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? placeholder : option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
    </div>
  );

  const CaseCard = ({ caseData }: { caseData: ClinicalCaseData }) => {
    const handleStartCase = () => {
      navigate(`/dashboard/clinical-case/${caseData._id}`);
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center mb-3 gap-3">
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800">
            {caseData.topic || "General"}
          </span>
          {caseData?.difficultyLevel && (
            <span className="px-2 py-1 text-xs font-medium border rounded-full text-purple-600">
              {caseData?.difficultyLevel}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {caseData.caseTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {caseData?.patientPresentation}
        </p>

        <PrimaryButton
          onClick={handleStartCase}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium flex items-center gap-2"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Start Case
        </PrimaryButton>
      </div>
    );
  };

  if (isLoading) return <GlobalLoader2 />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 mt-10">All Cases</h1>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by condition or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <Dropdown
              value={selectedBodySystem}
              onChange={setSelectedBodySystem}
              options={bodySystemOptions}
              placeholder="Body System"
            />
            <Dropdown
              value={selectedTopic}
              onChange={setSelectedTopic}
              options={topicOptions}
              placeholder="Topic"
            />
            <Dropdown
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              options={difficultyOptions}
              placeholder="Difficulty"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(["All Cases", "AI Generated", "Complete Cases"] as TabType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedCases.map((caseData, idx: number) => (
          <CaseCard key={idx} caseData={caseData} />
        ))}
      </div>

      {paginatedCases.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No cases found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium rounded hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 text-sm rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium rounded hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {startIndex + 1}-
        {Math.min(startIndex + casesPerPage, filteredCases.length)} of{" "}
        {filteredCases.length} cases
      </div>
    </div>
  );
};

export default AllClinicalCases;
