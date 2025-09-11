import React, { useState } from "react";
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

// Type definitions
interface VitalSigns {
  temperature: string;
  heartRate: string;
  bloodPressure: string;
  respiratoryRate: string;
}

interface LabResult {
  test: string;
  value: string;
  unit: string;
  isAbnormal?: boolean;
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

  const [readingProgress] = useState(65);

  const toggleSection = (section: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMakeDecision = (): void => {
    // Handle decision making logic
    console.log("Make Your Decision clicked");
  };

  const handleQuickAction = (action: string): void => {
    console.log(`Quick action: ${action}`);
  };

  const vitalSigns: VitalSigns = {
    temperature: "38.2°C",
    heartRate: "102 bpm",
    bloodPressure: "118/76",
    respiratoryRate: "20/min",
  };

  const labResults: LabResult[] = [
    { test: "WBC Count:", value: "13,500", unit: "μL (H)", isAbnormal: true },
    { test: "Heart Rate:", value: "82", unit: "% (H)" },
    { test: "Blood Pressure:", value: "12.8", unit: "g/dL" },
    { test: "Respiratory Rate:", value: "285,000", unit: "μL" },
    { test: "CRP:", value: "45mg", unit: "L (H)", isAbnormal: true },
    { test: "Creatine:", value: "0.9", unit: "mg/dL" },
    { test: "β-hCG:", value: "Negative", unit: "" },
    { test: "Urinalysis:", value: "Normal", unit: "" },
  ];

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ title, icon, isExpanded, onToggle }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg mb-4"
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-600">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
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
            <div className="flex items-center gap-2">
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
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Cardiology
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              Beginner
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
            Case: Acute Abdominal Pain in a Young Female
          </h1>

          {/* Navigation Tabs */}
          <div className="flex gap-8 border-b">
            <button className="flex items-center gap-2 pb-3 border-b-2 border-blue-500 text-blue-600">
              <History size={16} />
              <span className="text-sm font-medium">History</span>
            </button>
            <button className="flex items-center gap-2 pb-3 text-gray-500">
              <Heart size={16} />
              <span className="text-sm font-medium">Vitals</span>
            </button>
            <button className="flex items-center gap-2 pb-3 text-gray-500">
              <Microscope size={16} />
              <span className="text-sm font-medium">Labs</span>
            </button>
            <button className="flex items-center gap-2 pb-3 text-gray-500">
              <Scan size={16} />
              <span className="text-sm font-medium">Imaging</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6 p-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Patient Presentation */}
            <div className="bg-white rounded-lg shadow-sm border">
              <SectionHeader
                title="Patient Presentation"
                icon={<History size={20} />}
                isExpanded={expandedSections.presentation}
                onToggle={() => toggleSection("presentation")}
              />

              {expandedSections.presentation && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Age:
                      </span>
                      <p className="text-gray-900">24 years</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Sex:
                      </span>
                      <p className="text-gray-900">Female</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Ethnicity:
                      </span>
                      <p className="text-gray-900">Caucasian</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Occupation:
                      </span>
                      <p className="text-gray-900">Student</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A 24-year-old female student presents to the emergency
                    department with a 6-hour history of severe abdominal pain.
                    The patient appears uncomfortable and is requesting pain
                    medication.
                  </p>
                </div>
              )}
            </div>

            {/* History of Present Illness */}
            <div className="bg-white rounded-lg shadow-sm border">
              <SectionHeader
                title="History of Present Illness"
                icon={<History size={20} />}
                isExpanded={expandedSections.history}
                onToggle={() => toggleSection("history")}
              />

              {expandedSections.history && (
                <div className="px-6 pb-6">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      The patient reports that the pain began gradually around 6
                      hours ago as a dull ache around the umbilical area. Over
                      the past 2-3 hours, the pain has migrated to the right
                      lower quadrant and has become increasingly severe and
                      colicky.
                    </p>
                    <p>
                      She describes the current pain as sharp and stabbing,
                      rated 8/10 in intensity. The pain is worsened by movement,
                      coughing, walking. She has experienced nausea and vomiting
                      over the past 2 hours, initially containing food particles
                      and later just bile.
                    </p>
                    <p>
                      The patient denies diarrhea but reports decreased appetite
                      since yesterday. She has not had a bowel movement since
                      yesterday morning. She denies urinary symptoms, vaginal
                      discharge, or recent sexual activity.
                    </p>
                    <p>
                      Her last menstrual period was 2 weeks ago and was normal.
                      She is not currently taking any medications and denies any
                      known allergies.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Physical Examination */}
            <div className="bg-white rounded-lg shadow-sm border">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Temperature:
                        </span>
                        <p className="text-gray-900">
                          {vitalSigns.temperature}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Heart Rate:
                        </span>
                        <p className="text-gray-900">{vitalSigns.heartRate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Blood Pressure:
                        </span>
                        <p className="text-gray-900">
                          {vitalSigns.bloodPressure}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Respiratory Rate:
                        </span>
                        <p className="text-gray-900">
                          {vitalSigns.respiratoryRate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      General Appearance
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        Patient appears uncomfortable and prefers to lie still
                      </li>
                      <li>Mild dehydration evident</li>
                      <li>Alert and oriented</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Abdominal Examination
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        Tenderness in right lower quadrant, maximal at
                        McBurney's point
                      </li>
                      <li>Positive rebound tenderness</li>
                      <li>Positive Rovsing's sign</li>
                      <li>Guarding present in right lower quadrant</li>
                      <li>Bowel sounds diminished</li>
                      <li>No palpable masses</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Initial Investigations */}
            <div className="bg-white rounded-lg shadow-sm border">
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
                    {labResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <span className="font-medium text-gray-700">
                          {result.test}
                        </span>
                        <span
                          className={`font-semibold ${
                            result.isAbnormal ? "text-red-600" : "text-gray-900"
                          }`}
                        >
                          {result.value} {result.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Imaging Studies */}
            <div className="bg-white rounded-lg shadow-sm border">
              <SectionHeader
                title="Imaging Studies"
                icon={<Scan size={20} />}
                isExpanded={expandedSections.imaging}
                onToggle={() => toggleSection("imaging")}
              />

              {expandedSections.imaging && (
                <div className="px-6 pb-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Abdominal Ultrasound:
                    </h3>
                    <p className="text-gray-700">
                      Non-compressible, thick-walled appendix measuring 8mm in
                      diameter. Surrounding hyperechoic fat suggestive of
                      inflammation. Small amount of free fluid in the pelvis.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      CT Head:
                    </h3>
                    <p className="text-gray-700">
                      No acute hemorrhage, subtle hypodensity in left MCA
                      territory
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Reading Progress */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Reading Progress
              </h3>
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Continue reading to unlock the next step
              </p>
              <button
                onClick={handleMakeDecision}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded font-medium hover:bg-gray-700 transition-colors"
              >
                🎯 Make Your Decision
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleQuickAction("bookmark")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <Bookmark size={16} />
                  <span>Bookmark</span>
                </button>
                <button
                  onClick={() => handleQuickAction("print")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <Printer size={16} />
                  <span>Print Case</span>
                </button>
                <button
                  onClick={() => handleQuickAction("share")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <Share2 size={16} />
                  <span>Share Case</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseDetails;
