import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";

// Type definitions
interface CaseData {
  id: number;
  title: string;
  description: string;
  specialty: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "completed" | "available";
  frameId?: string;
}

type TabType = "All Cases" | "AI Generated" | "Complete Cases";
type FilterOption = string;

interface CaseCardProps {
  caseData: CaseData;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

interface PaginationButtonProps {
  page?: number;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const AllClinicalCases: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const mockCases: CaseData[] = [
    {
      id: 1,
      title: "Abdominal Pain in Young Adult",
      description: "A 22-year-old presents with right lower quadrant pain.",
      specialty: "Cardiology",
      difficulty: "Beginner",
      status: "completed",
      frameId: "1618874200",
    },
    {
      id: 2,
      title: "Chest Pain Assessment",
      description:
        "A 45-year-old presents with acute chest pain and shortness of breath.",
      specialty: "Cardiology",
      difficulty: "Intermediate",
      status: "available",
      frameId: "1618874201",
    },
    {
      id: 3,
      title: "Cardiac Arrhythmia",
      description: "A 67-year-old with irregular heartbeat and palpitations.",
      specialty: "Cardiology",
      difficulty: "Advanced",
      status: "available",
      frameId: "1618874202",
    },
    {
      id: 4,
      title: "Hypertensive Crisis",
      description:
        "A 55-year-old presents with severe hypertension and headache.",
      specialty: "Cardiology",
      difficulty: "Advanced",
      status: "available",
      frameId: "1618874203",
    },
    {
      id: 5,
      title: "Respiratory Distress",
      description: "A 30-year-old presents with acute respiratory symptoms.",
      specialty: "Pulmonology",
      difficulty: "Intermediate",
      status: "available",
      frameId: "1618874204",
    },
    {
      id: 6,
      title: "Pneumonia Case Study",
      description: "A 72-year-old with fever, cough, and chest pain.",
      specialty: "Pulmonology",
      difficulty: "Beginner",
      status: "completed",
      frameId: "1618874205",
    },
    {
      id: 7,
      title: "Asthma Exacerbation",
      description: "A 28-year-old with severe asthma attack.",
      specialty: "Pulmonology",
      difficulty: "Intermediate",
      status: "available",
      frameId: "1618874206",
    },
    {
      id: 8,
      title: "Diabetic Emergency",
      description: "A 40-year-old with diabetic ketoacidosis.",
      specialty: "Endocrinology",
      difficulty: "Advanced",
      status: "available",
      frameId: "1618874207",
    },
    {
      id: 9,
      title: "Thyroid Dysfunction",
      description: "A 35-year-old with hyperthyroid symptoms.",
      specialty: "Endocrinology",
      difficulty: "Intermediate",
      status: "completed",
      frameId: "1618874208",
    },
    {
      id: 10,
      title: "Neurological Assessment",
      description: "A 50-year-old with sudden onset neurological symptoms.",
      specialty: "Neurology",
      difficulty: "Advanced",
      status: "available",
      frameId: "1618874209",
    },
    {
      id: 11,
      title: "Headache Evaluation",
      description: "A 32-year-old with severe persistent headaches.",
      specialty: "Neurology",
      difficulty: "Beginner",
      status: "available",
      frameId: "1618874210",
    },
    {
      id: 12,
      title: "Seizure Management",
      description: "A 25-year-old with new-onset seizures.",
      specialty: "Neurology",
      difficulty: "Advanced",
      status: "completed",
      frameId: "1618874211",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBodySystem, setSelectedBodySystem] =
    useState<FilterOption>("All");
  const [selectedTopic, setSelectedTopic] = useState<FilterOption>("All");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<FilterOption>("All");
  const [activeTab, setActiveTab] = useState<TabType>("All Cases");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

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
    "Emergency",
    "Chronic Care",
    "Preventive",
  ];

  // Reusable Card Component
  const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
    const getDifficultyColor = (difficulty: CaseData["difficulty"]): string => {
      switch (difficulty) {
        case "Beginner":
          return "text-orange-400";
        case "Intermediate":
          return "text-blue-600 ";
        case "Advanced":
          return "text-green-600 ";
        default:
          return "text-gray-600";
      }
    };

    const getButtonColor = (difficulty: CaseData["difficulty"]): string => {
      switch (difficulty) {
        case "Beginner":
          return "bg-orange-500 hover:bg-orange-600";
        case "Intermediate":
          return "bg-blue-500 hover:bg-blue-600";
        case "Advanced":
          return "bg-green-500 hover:bg-green-600";
        default:
          return "bg-gray-500 hover:bg-gray-600";
      }
    };

    const isCompleted = caseData.status === "completed";

    const handleStartCase = (): void => {
      navigate(`/dashboard/clinical-case/${caseData.frameId}`);
      console.log(`Starting case: ${caseData.id}`);
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center mb-3 gap-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800
            )}
            )}`}
          >
            {caseData.specialty}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium border rounded-full ${getDifficultyColor(
              caseData.difficulty
            )}`}
          >
            {caseData.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {caseData.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-1">
          {caseData.description}
        </p>

        <div className="flex items-center justify-between">
          {isCompleted ? (
            <PrimaryButton className="border border-slate-300 text-black bg-white transition-colors">
              Completed
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleStartCase}
              className={`px-4 py-2 ${getButtonColor(
                caseData.difficulty
              )} text-white rounded text-sm font-medium transition-colors flex items-center gap-2`}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Case  <Bookmark />
            </PrimaryButton>
          )}
        </div>
      </div>
    );
  };

  // Filter and search logic
  const filteredCases = useMemo((): CaseData[] => {
    let filtered = mockCases;

    // Apply tab filter
    if (activeTab === "Complete Cases") {
      filtered = filtered.filter((c) => c.status === "completed");
    } else if (activeTab === "AI Generated") {
      // For demo purposes, showing all cases. In real app, this would filter AI-generated cases
      filtered = filtered;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply body system filter
    if (selectedBodySystem !== "All") {
      filtered = filtered.filter((c) => c.specialty === selectedBodySystem);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter((c) => c.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [
    mockCases,
    searchTerm,
    selectedBodySystem,
    selectedDifficulty,
    activeTab,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const startIndex = (currentPage - 1) * casesPerPage;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + casesPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBodySystem, selectedDifficulty, activeTab]);

  const Dropdown: React.FC<DropdownProps> = ({
    value,
    onChange,
    options,
    placeholder,
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
        className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
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

  const PaginationButton: React.FC<PaginationButtonProps> = ({
    page,
    isActive = false,
    onClick,
    disabled = false,
    children,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 text-sm font-medium rounded transition-colors ${isActive
          ? "bg-blue-500 text-white"
          : disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {children || page}
    </button>
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800 my-6">All Cases</h1>

      {/* Search and Filters */}
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
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {(["All Cases", "AI Generated", "Complete Cases"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
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
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedCases.map((caseData) => (
          <CaseCard key={caseData.id} caseData={caseData} />
        ))}
      </div>

      {/* No Results */}
      {paginatedCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No cases found matching your criteria.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-1">
          <PaginationButton
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </PaginationButton>

          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (currentPage <= 4) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }

            if (
              pageNum === currentPage - 3 &&
              currentPage > 4 &&
              totalPages > 7
            ) {
              return (
                <span key="start-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }
            if (
              pageNum === currentPage + 3 &&
              currentPage < totalPages - 3 &&
              totalPages > 7
            ) {
              return (
                <span key="end-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            return (
              <PaginationButton
                key={pageNum}
                page={pageNum}
                isActive={currentPage === pageNum}
                onClick={() => handlePageChange(pageNum)}
              />
            );
          })}

          <PaginationButton
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </PaginationButton>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {startIndex + 1}-
        {Math.min(startIndex + casesPerPage, filteredCases.length)} of{" "}
        {filteredCases.length} cases
      </div>
    </div>
  );
};

export default AllClinicalCases;
