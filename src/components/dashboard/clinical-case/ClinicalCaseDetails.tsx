import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  History,
  Heart,
  Microscope,
  Scan,
  Bookmark,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleClinicalCaseQuery } from "@/store/features/clinicalCase/clinicalCase.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

// Updated type definitions based on backend response
interface PatientDetails {
  age: number;
  sex: string;
  ethnicity: string;
  occupation: string;
  remark?: string;
}

interface VitalSigns {
  temperature: string;
  heartRate: string;
  bloodPressure: string;
  respiratoryRate: string;
  generalAppearance: string[];
  abdominalExamination: string[];
}

interface LabSubTest {
  testName: string;
  testResult: string;
  refValue: string;
}

interface LaboratoryResult {
  testName: string;
  testResult: string;
  subTest: LabSubTest[];
}

interface StudentDecision {
  question: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
  isCorrect: boolean;
}

interface DetailedExplanation {
  explanation: string;
  keyFeatures: string[];
}

interface PublishedBy {
  firstName: string;
  lastName: string;
  // Add other fields if needed
}

interface ClinicalCaseData {
  _id: string;
  caseName: string;
  topic: string;
  patientDetails: PatientDetails;
  caseHistory: string;
  vital_signs: VitalSigns;
  laboratory_result: LaboratoryResult;
  imaging_studies: string[];
  caseTips: string[];
  studentDecision: StudentDecision[];
  detailedExplanation: DetailedExplanation;
  isAIGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  publishedBy?: PublishedBy;
}

interface CaseDetailProps {
  onBack?: () => void;
}

const ClinicalCaseDetails: React.FC<CaseDetailProps> = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    presentation: true,
    history: true,
    physical: true,
    investigations: true,
    imaging: true,
  });

  const [activeTab, setActiveTab] = useState("history");

  // Refs for each section
  const presentationRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const historyRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const vitalsRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const labsRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const imagingRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleClinicalCaseQuery(
    id as string
  );
  const clinicalCase = data?.data as ClinicalCaseData;

  const navigate = useNavigate();

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    tabName: string
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(tabName);
    }
  };

  const toggleSection = (section: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMakeDecision = (): void => {
    console.log("Make Your Decision clicked");
    navigate(`/dashboard/clinical-case/${id}/make-decision`);
  };

  const handleQuickAction = (action: string): void => {
    console.log(`Quick action: ${action}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-orange-100 text-orange-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      cardiology: "bg-red-100 text-red-800",
      gastroenterology: "bg-blue-100 text-blue-800",
      emergency: "bg-orange-100 text-orange-800",
      surgery: "bg-purple-100 text-purple-800",
      "internal medicine": "bg-green-100 text-green-800",
    };
    return (
      colors[specialty.toLowerCase() as keyof typeof colors] ||
      "bg-blue-100 text-blue-800"
    );
  };

  // Helper function to parse vital sign values and units
  const parseVitalSign = (vitalString: string) => {
    // Simple parser for vital signs like "38.2°C", "102 bpm", etc.
    const match = vitalString.match(/([\d./]+)\s*(.*)/);
    if (match) {
      return {
        value: match[1],
        unit: match[2],
        isAbnormal: false, // You might want to add logic to determine this
      };
    }
    return {
      value: vitalString,
      unit: "",
      isAbnormal: false,
    };
  };

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ title, icon, isExpanded, onToggle }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-t-lg mb-4"
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-main">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  const VitalSignCard: React.FC<{
    label: string;
    value: string;
    unit: string;
    isAbnormal?: boolean;
  }> = ({ label, value, unit, isAbnormal }) => (
    <div
      className={`p-3 rounded-lg ${
        isAbnormal ? "bg-red-50 border border-red-200" : "bg-gray-50"
      }`}
    >
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      <p
        className={`font-semibold ${
          isAbnormal ? "text-red-600" : "text-gray-900"
        }`}
      >
        {value} {unit}
      </p>
    </div>
  );

  const LabResultCard: React.FC<{
    test: string;
    value: string;
    unit: string;
    isAbnormal?: boolean;
    referenceRange?: string;
  }> = ({ test, value, unit, isAbnormal, referenceRange }) => (
    <div
      className={`flex justify-between items-center p-3 rounded ${
        isAbnormal ? "bg-red-50 border border-red-200" : "bg-gray-50"
      }`}
    >
      <div>
        <span className="font-medium text-gray-700">{test}:</span>
        {referenceRange && (
          <span className="text-xs text-gray-500 block">
            ({referenceRange})
          </span>
        )}
      </div>
      <span
        className={`font-semibold ${
          isAbnormal ? "text-red-600" : "text-gray-900"
        }`}
      >
        {value} {unit}
      </span>
    </div>
  );

  if (isLoading) {
    return <GlobalLoader2 />;
  }

  if (error || !clinicalCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading clinical case
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-lg mt-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Link to={"/dashboard/clinical-case-generator"}>
                  {" "}
                  <ArrowLeft size={20} />
                </Link>
                <span className="ml-2 font-medium">Clinical Case</span>
              </button>
            </div>
            <div className="flex items-center gap-2  px-4 py-2 border border-gray-300 rounded-lg">
              <Sparkles className="text-blue-600" size={16} />
              <span className="text-sm text-blue-600 font-medium">
                AI Tutor
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              Sharpen your diagnostic skills. Ready for your next challenge?
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecialtyColor(
                clinicalCase.topic
              )}`}
            >
              {clinicalCase.topic}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                "Intermediate" // You might want to add difficulty to your backend
              )}`}
            >
              Intermediate
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
            {clinicalCase.caseName}
          </h1>

          {/* Navigation Tabs */}
          <div className="flex gap-4 md:gap-6 lg:gap-8 border-b border-gray-200 overflow-auto">
            {[
              {
                key: "history",
                label: "History",
                icon: History,
                ref: historyRef,
              },
              { key: "vitals", label: "Vitals", icon: Heart, ref: vitalsRef },
              { key: "labs", label: "Labs", icon: Microscope, ref: labsRef },
              { key: "imaging", label: "Imaging", icon: Scan, ref: imagingRef },
            ].map(({ key, label, icon: Icon, ref }) => (
              <button
                key={key}
                onClick={() => scrollToSection(ref, key)}
                className={`flex items-center gap-2 pb-3 border-b-2 transition-colors px-4 ${
                  activeTab === key
                    ? "border-blue-main text-blue-main"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <Icon size={16} />
                <span className="text-sm lg:text-base font-medium">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 lg:my-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Patient Presentation */}
            <div
              ref={presentationRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Patient Presentation"
                icon={<History size={20} />}
                isExpanded={expandedSections.presentation}
                onToggle={() => toggleSection("presentation")}
              />

              {expandedSections.presentation && (
                <div className="px-6 pb-6">
                  {/* Patient Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {Object.entries(clinicalCase.patientDetails).map(
                      ([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {key}:
                          </span>
                          <p className="text-gray-900">{value}</p>
                        </div>
                      )
                    )}
                  </div>

                  {clinicalCase.patientDetails.remark && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <span className="text-sm font-medium text-gray-500">
                        Remark:{" "}
                      </span>
                      <span className="text-gray-700">
                        {clinicalCase.patientDetails.remark}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-700 leading-relaxed">
                    {clinicalCase.caseHistory}
                  </p>
                </div>
              )}
            </div>

            {/* History of Present Illness */}
            <div
              ref={historyRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Case History"
                icon={<History size={20} />}
                isExpanded={expandedSections.history}
                onToggle={() => toggleSection("history")}
              />

              {expandedSections.history && (
                <div className="px-6 pb-6">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{clinicalCase.caseHistory}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Physical Examination */}
            <div
              ref={vitalsRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Physical Examination Findings"
                icon={<Heart size={20} />}
                isExpanded={expandedSections.physical}
                onToggle={() => toggleSection("physical")}
              />

              {expandedSections.physical && clinicalCase.vital_signs && (
                <div className="px-6 pb-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Vital Signs
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries({
                        temperature: clinicalCase.vital_signs.temperature,
                        heartRate: clinicalCase.vital_signs.heartRate,
                        bloodPressure: clinicalCase.vital_signs.bloodPressure,
                        respiratoryRate:
                          clinicalCase.vital_signs.respiratoryRate,
                      }).map(([key, value]) => {
                        const parsed = parseVitalSign(value);
                        return (
                          <VitalSignCard
                            key={key}
                            label={
                              key.charAt(0).toUpperCase() +
                              key.slice(1).replace(/([A-Z])/g, " $1")
                            }
                            value={parsed.value}
                            unit={parsed.unit}
                            isAbnormal={parsed.isAbnormal}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {clinicalCase.vital_signs.generalAppearance && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        General Appearance
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        {clinicalCase.vital_signs.generalAppearance.map(
                          (finding, index) => (
                            <li key={index}>{finding}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {clinicalCase.vital_signs.abdominalExamination && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Abdominal Examination
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        {clinicalCase.vital_signs.abdominalExamination.map(
                          (finding, index) => (
                            <li key={index}>{finding}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Laboratory Results */}
            <div
              ref={labsRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Laboratory Results"
                icon={<Microscope size={20} />}
                isExpanded={expandedSections.investigations}
                onToggle={() => toggleSection("investigations")}
              />

              {expandedSections.investigations &&
                clinicalCase.laboratory_result && (
                  <div className="px-6 pb-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {clinicalCase.laboratory_result.testName}
                      </h3>
                      <p className="text-gray-700">
                        {clinicalCase.laboratory_result.testResult}
                      </p>
                    </div>

                    {clinicalCase.laboratory_result.subTest && (
                      <>
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Detailed Results
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {clinicalCase.laboratory_result.subTest.map(
                            (test, index) => (
                              <LabResultCard
                                key={index}
                                test={test.testName}
                                value={test.testResult}
                                unit=""
                                referenceRange={test.refValue}
                              />
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
            </div>

            {/* Imaging Studies */}
            <div
              ref={imagingRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Imaging Studies"
                icon={<Scan size={20} />}
                isExpanded={expandedSections.imaging}
                onToggle={() => toggleSection("imaging")}
              />

              {expandedSections.imaging && clinicalCase.imaging_studies && (
                <div className="px-6 pb-6 space-y-4">
                  {clinicalCase.imaging_studies.map((study, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Imaging Study {index + 1}:
                      </h3>
                      <p className="text-gray-700">{study}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Case Tips */}
            {clinicalCase.caseTips && clinicalCase.caseTips.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <SectionHeader
                  title="Clinical Tips"
                  icon={<Sparkles size={20} />}
                  isExpanded={true}
                  onToggle={() => {}}
                />
                <div className="px-6 pb-6">
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    {clinicalCase.caseTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reading Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Case Progress
              </h3>
              <PrimaryButton
                className="w-full px-4 py-2 text-base"
                onClick={handleMakeDecision}
              >
                Make Your Decision
              </PrimaryButton>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Bookmark, label: "Bookmark", action: "bookmark" },
                  { icon: Printer, label: "Print Case", action: "print" },
                  { icon: Share2, label: "Share Case", action: "share" },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Case Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Case Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-700">
                    {new Date(clinicalCase.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">AI Generated:</span>
                  <span className="text-gray-700">
                    {clinicalCase.isAIGenerated ? "Yes" : "No"}
                  </span>
                </div>
                {clinicalCase.publishedBy && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Published by:</span>
                    <span className="text-gray-700">
                      {clinicalCase.publishedBy.firstName}{" "}
                      {clinicalCase.publishedBy.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseDetails;
