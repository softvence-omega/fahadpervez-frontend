import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Activity,
  FlaskConical,
  Image,
  CircleCheckBigIcon,
  BookOpenIcon,
  ArrowLeft,
} from "lucide-react";

interface Bulk_Upload_Clinical_CaseProps {
  onBack?: () => void;
}

const ClinicalCasePage: React.FC<Bulk_Upload_Clinical_CaseProps> = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState({
    presentation: true,
    history: true,
    physical: true,
    investigations: true,
    imaging: true,
    questions: true,
  });

  // Removed unused activeTab state

interface ExpandedSections {
    presentation: boolean;
    history: boolean;
    physical: boolean;
    investigations: boolean;
    imaging: boolean;
    questions: boolean;
}

type SectionKey = keyof ExpandedSections;

const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev: ExpandedSections) => ({
        ...prev,
        [section]: !prev[section],
    }));
};

const handleBack = () => {
    if (onBack) {
        onBack();
    } else {
        window.history.back();
    }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* 🔙 Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-black mb-2 font-inter text-3xl font-semibold leading-9 tracking-[-0.01406rem]">
            Clinical Case
          </h1>
          <p className="text-gray-600">
            Sharpen your diagnostic skills. Ready for your next challenge?
          </p>
        </div>

        {/* Case Title Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Cardiology
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Beginner
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Case: Acute Abdominal Pain in a Young Female
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="text-sm sm:text-lg text-nowrap shadow-sm border border-gray-200 mb-6 rounded-[var(--radius)] bg-[var(--secondary)]">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            <button className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition-colors rounded-sm bg-[var(--background)] shadow-sm">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">History</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition-colors">
              <Activity className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Vitals</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition-colors">
              <FlaskConical className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Labs</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition-colors">
              <Image className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Imaging</span>
            </button>
          </div>
        </div>

        {/* Patient Presentation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("presentation")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900 ">
              Patient Presentation
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.presentation ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.presentation && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg mb-4">
                <div>
                  <span className="text-gray-600 text-sm">Age:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    24 years
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Sex:</span>
                  <span className="ml-2 text-gray-900 font-medium">Female</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Ethnicity:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    Caucasian
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Occupation:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    Student
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A 24-year-old female student presents to the emergency
                department with a 6-hour history of severe abdominal pain. The
                patient appears uncomfortable and is requesting pain medication.
              </p>
            </div>
          )}
        </div>

        {/* History of Present Illness */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("history")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900">
              History of Present Illness
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.history ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.history && (
            <div className="px-6 pb-6">
              <p className="text-gray-700 leading-relaxed">
                The patient reports that the pain began gradually around 6 hours
                ago as a dull ache around the umbilical area. Over the past 2-3
                hours, the pain has migrated to the right lower quadrant and has
                become increasingly severe and constant. She describes the
                current pain as sharp and stabbing, rated 8/10 in intensity. The
                pain is worsened by movement, coughing, or walking. She has
                experienced nausea and vomited twice in the past 2 hours,
                initially containing food particles and later just bile. The
                patient denies diarrhea but reports decreased appetite since
                yesterday morning. She has not had a bowel movement since
                yesterday morning. She denies urinary symptoms, vaginal
                discharge, or recent sexual activity. Her last menstrual period
                was 2 weeks ago and was normal. She is not currently taking any
                medications and denies any known allergies.
              </p>
            </div>
          )}
        </div>

        {/* Physical Examination */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("physical")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900">
              Physical Examination Findings
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.physical ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.physical && (
            <div className="px-6 pb-6">
              {/* Vital Signs */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Vital Signs</h4>
                <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">
                      Temperature:
                    </div>
                    <div className="text-gray-900 font-medium">38.2°C</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">
                      Heart Rate:
                    </div>
                    <div className="text-gray-900 font-medium">102 bpm</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">
                      Blood Pressure:
                    </div>
                    <div className="text-gray-900 font-medium">118/76</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">
                      Respiratory Rate:
                    </div>
                    <div className="text-gray-900 font-medium">20/min</div>
                  </div>
                </div>
              </div>

              {/* General Appearance */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">
                  General Appearance
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Patient appears uncomfortable and prefers to lie still
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Mild dehydration evident
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">Alert and oriented</span>
                  </li>
                </ul>
              </div>

              {/* Abdominal Examination */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">
                  Abdominal Examination
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Tenderness in right lower quadrant, maximal at McBurney's
                      point
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Positive rebound tenderness
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Positive Rovsing's sign
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Guarding present in right lower quadrant
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      Bowel sounds diminished
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">No palpable masses</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Initial Investigations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("investigations")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900">
              Initial Investigations
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.investigations ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.investigations && (
            <div className="px-6 pb-6">
              {/* Laboratory Results */}
              <h4 className="font-bold text-gray-900 mb-4">
                Laboratory Results
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">WBC Count:</span>
                    <span className="text-red-600 font-medium">
                      13,500/μL (H)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">CRP:</span>
                    <span className="text-red-600 font-medium">45mg/L (H)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Heart Rate:</span>
                    <span className="text-red-600 font-medium">82 % (H)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Creatine:</span>
                    <span className="text-gray-900 font-medium">0.9 mg/dL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Blood Pressure:</span>
                    <span className="text-gray-900 font-medium">12.8 g/dL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">β-hCG:</span>
                    <span className="text-gray-900 font-medium">Negative</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Respiratory Rate:</span>
                    <span className="text-gray-900 font-medium">
                      285,000/μL
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Urinalysis:</span>
                    <span className="text-gray-900 font-medium">Normal</span>
                  </div>
                </div>
              </div>

              {/* Imaging Studies */}
              <h4 className="font-bold text-gray-900 mb-4">Imaging Studies</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium text-gray-900">
                    Abdominal Ultrasound:
                  </span>
                </div>
                <p className="text-gray-700">
                  Non-compressible, thick-walled appendix measuring 8mm in
                  diameter. Surrounding hyperechoic fat suggestive of
                  inflammation. Small amount of free fluid in the pelvis.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Imaging Studies Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("imaging")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900">Imaging Studies</h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.imaging ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.imaging && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  CT Head - No acute hemorrhage, subtle hypodensity in left MCA
                  territory
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Multiple Choice Questions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => toggleSection("questions")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm sm:text-xl text-nowrap font-semibold text-gray-900">
              Multiple Choice Questions
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                expandedSections.questions ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.questions && (
            <div className="px-6 pb-6">
              <p className="text-gray-600 mb-6">
                Here's how the evidence supports or refutes each potential
                diagnosis:
              </p>

              {/* Acute Ischemic Stroke */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3">
                  Acute Ischemic Stroke
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-green-600 font-medium mb-2">
                      Supporting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Sudden onset unilateral weakness
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Risk factors (HTN, DM)
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          CT shows MCA territory changes
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium mb-2">
                      Refuting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          No hemorrhage on CT
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hemorrhagic Stroke */}
              <div className=" p-4 rounded-lg mb-4 border border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3">
                  Hemorrhagic Stroke
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-green-600 font-medium mb-2">
                      Supporting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Sudden onset neurological deficit
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">Hypertension</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium mb-2">
                      Refuting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          No hemorrhage on CT scan
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">Normal PT/INR</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Brain Tumor */}
              <div className=" p-4 rounded-lg mb-4 border border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3">Brain Tumor</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-green-600 font-medium mb-2">
                      Supporting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Unilateral weakness
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium mb-2">
                      Refuting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Sudden onset (tumors are gradual)
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          No mass lesion on CT
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hypoglycemia */}
              <div className="p-4 rounded-lg mb-6 border border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3">Hypoglycemia</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-green-600 font-medium mb-2">
                      Supporting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Diabetes mellitus history
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium mb-2">
                      Refuting Evidence:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Glucose 145 mg/dL (elevated)
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Focal neurological signs
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Correct Answer */}
              <div className=" p-6 rounded-xl border border-gray-300 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <CircleCheckBigIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Correct Answer
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">
                      Your Diagnosis:
                    </div>
                    <div className="text-gray-900 font-medium">
                      Acute Ischemic Stroke
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 text-sm mb-1">
                      Correct Diagnosis:
                    </div>
                    <div className="text-green-600 font-medium">
                      Acute Ischemic Stroke
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpenIcon className="w-6 h-6 text-slate-900" />
                    <h5 className="font-bold text-gray-900">
                      Detailed Explanation
                    </h5>
                  </div>
                  <p className="text-gray-700 leading-relaxed bg-slate-100 rounded-md p-4 mb-4">
                    The sudden onset of unilateral weakness with speech changes
                    in a patient with vascular risk factors is highly suggestive
                    of stroke. The CT findings support acute ischemic stroke.
                  </p>
                  <div>
                    <div className="font-medium text-gray-900 mb-2">
                      Key Learning Points:
                    </div>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Sudden onset neurological symptoms require immediate
                          stroke workup
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          CT head is first-line imaging for acute stroke
                          evaluation
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Time is brain - early recognition and intervention are
                          crucial
                        </span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          Risk factor assessment helps guide differential
                          diagnosis
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalCasePage;
