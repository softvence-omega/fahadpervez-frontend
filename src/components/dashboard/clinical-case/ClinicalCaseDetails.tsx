import React, { useRef, useState, useEffect } from "react";
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

// Enhanced type definitions
interface PatientInfo {
  age: string;
  sex: string;
  ethnicity: string;
  occupation: string;
}

interface VitalSigns {
  temperature: { value: string; unit: string; isAbnormal?: boolean };
  heartRate: { value: string; unit: string; isAbnormal?: boolean };
  bloodPressure: { value: string; unit: string; isAbnormal?: boolean };
  respiratoryRate: { value: string; unit: string; isAbnormal?: boolean };
}

interface LabResult {
  test: string;
  value: string;
  unit: string;
  isAbnormal?: boolean;
  referenceRange?: string;
}

interface ImagingStudy {
  type: string;
  findings: string;
}

interface CaseData {
  title: string;
  specialty: string;
  difficulty: string;
  description: string;
  patientInfo: PatientInfo;
  presentation: string;
  historyOfPresentIllness: string[];
  vitalSigns: VitalSigns;
  generalAppearance: string[];
  abdominalExamination: string[];
  labResults: LabResult[];
  imagingStudies: ImagingStudy[];
}

interface CaseDetailProps {
  onBack?: () => void;
  caseData?: CaseData;
}

// Default case data
const defaultCaseData: CaseData = {
  title: "Case: Acute Abdominal Pain in a Young Female",
  specialty: "Gastroenterology",
  difficulty: "Beginner",
  description: "Sharpen your diagnostic skills. Ready for your next challenge?",
  patientInfo: {
    age: "24 years",
    sex: "Female",
    ethnicity: "Caucasian",
    occupation: "Student",
  },
  presentation:
    "A 24-year-old female student presents to the emergency department with a 6-hour history of severe abdominal pain. The patient appears uncomfortable and is requesting pain medication.",
  historyOfPresentIllness: [
    "The patient reports that the pain began gradually around 6 hours ago as a dull ache around the umbilical area. Over the past 2-3 hours, the pain has migrated to the right lower quadrant and has become increasingly severe and colicky.",
    "She describes the current pain as sharp and stabbing, rated 8/10 in intensity. The pain is worsened by movement, coughing, walking. She has experienced nausea and vomiting over the past 2 hours, initially containing food particles and later just bile.",
    "The patient denies diarrhea but reports decreased appetite since yesterday. She has not had a bowel movement since yesterday morning. She denies urinary symptoms, vaginal discharge, or recent sexual activity.",
    "Her last menstrual period was 2 weeks ago and was normal. She is not currently taking any medications and denies any known allergies.",
  ],
  vitalSigns: {
    temperature: { value: "38.2", unit: "°C", isAbnormal: true },
    heartRate: { value: "102", unit: "bpm", isAbnormal: true },
    bloodPressure: { value: "118/76", unit: "mmHg" },
    respiratoryRate: { value: "20", unit: "/min" },
  },
  generalAppearance: [
    "Patient appears uncomfortable and prefers to lie still",
    "Mild dehydration evident",
    "Alert and oriented",
  ],
  abdominalExamination: [
    "Tenderness in right lower quadrant, maximal at McBurney's point",
    "Positive rebound tenderness",
    "Positive Rovsing's sign",
    "Guarding present in right lower quadrant",
    "Bowel sounds diminished",
    "No palpable masses",
  ],
  labResults: [
    {
      test: "WBC Count",
      value: "13,500",
      unit: "/μL",
      isAbnormal: true,
      referenceRange: "4,000-11,000",
    },
    {
      test: "Hemoglobin",
      value: "12.8",
      unit: "g/dL",
      referenceRange: "12-15.5",
    },
    {
      test: "Platelets",
      value: "285,000",
      unit: "/μL",
      referenceRange: "150,000-450,000",
    },
    {
      test: "CRP",
      value: "45",
      unit: "mg/L",
      isAbnormal: true,
      referenceRange: "<3",
    },
    {
      test: "Creatinine",
      value: "0.9",
      unit: "mg/dL",
      referenceRange: "0.6-1.1",
    },
    { test: "β-hCG", value: "Negative", unit: "", referenceRange: "Negative" },
    { test: "Urinalysis", value: "Normal", unit: "", referenceRange: "Normal" },
  ],
  imagingStudies: [
    {
      type: "Abdominal Ultrasound",
      findings:
        "Non-compressible, thick-walled appendix measuring 8mm in diameter. Surrounding hyperechoic fat suggestive of inflammation. Small amount of free fluid in the pelvis.",
    },
    {
      type: "CT Abdomen (if performed)",
      findings:
        "Dilated appendix with wall thickening and periappendiceal fat stranding consistent with acute appendicitis.",
    },
  ],
};

const ClinicalCaseDetails: React.FC<CaseDetailProps> = ({
  onBack,
  caseData = defaultCaseData,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    presentation: true,
    history: true,
    physical: true,
    investigations: true,
    imaging: true,
  });

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("history");

  // Refs for each section
  const presentationRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const vitalsRef = useRef<HTMLDivElement | null>(null);
  const labsRef = useRef<HTMLDivElement | null>(null);
  const imagingRef = useRef<HTMLDivElement | null>(null);

  // Simulate reading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timer);
        return 100;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

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
                <ArrowLeft size={20} />
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
            <p className="text-gray-600 text-sm">{caseData.description}</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecialtyColor(
                caseData.specialty
              )}`}
            >
              {caseData.specialty}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                caseData.difficulty
              )}`}
            >
              {caseData.difficulty}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
            {caseData.title}
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {Object.entries(caseData.patientInfo).map(
                      ([key, value]) => (
                        <div key={key}>
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {key}:
                          </span>
                          <p className="text-gray-900">{value}</p>
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {caseData.presentation}
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
                title="History of Present Illness"
                icon={<History size={20} />}
                isExpanded={expandedSections.history}
                onToggle={() => toggleSection("history")}
              />

              {expandedSections.history && (
                <div className="px-6 pb-6">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {caseData.historyOfPresentIllness.map(
                      (paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      )
                    )}
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

              {expandedSections.physical && (
                <div className="px-6 pb-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Vital Signs
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(caseData.vitalSigns).map(
                        ([key, vital]) => (
                          <VitalSignCard
                            key={key}
                            label={
                              key.charAt(0).toUpperCase() +
                              key.slice(1).replace(/([A-Z])/g, " $1")
                            }
                            value={vital.value}
                            unit={vital.unit}
                            isAbnormal={vital.isAbnormal}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      General Appearance
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      {caseData.generalAppearance.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Abdominal Examination
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      {caseData.abdominalExamination.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Initial Investigations */}
            <div
              ref={labsRef}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <SectionHeader
                title="Initial Investigations"
                icon={<Microscope size={20} />}
                isExpanded={expandedSections.investigations}
                onToggle={() => toggleSection("investigations")}
              />

              {expandedSections.investigations && (
                <div className="px-6 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Laboratory Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseData.labResults.map((result, index) => (
                      <LabResultCard
                        key={index}
                        test={result.test}
                        value={result.value}
                        unit={result.unit}
                        isAbnormal={result.isAbnormal}
                        referenceRange={result.referenceRange}
                      />
                    ))}
                  </div>
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

              {expandedSections.imaging && (
                <div className="px-6 pb-6 space-y-4">
                  {caseData.imagingStudies.map((study, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {study.type}:
                      </h3>
                      <p className="text-gray-700">{study.findings}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className=" space-y-6">
            {/* Reading Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Reading Progress
              </h3>
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-main h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {readingProgress < 100
                  ? "Continue reading to unlock the next step"
                  : "Ready to make your decision!"}
              </p>
              <PrimaryButton
                className="w-full px-4 py-2 text-base"
                onClick={handleMakeDecision}
                disabled={readingProgress < 100}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseDetails;
