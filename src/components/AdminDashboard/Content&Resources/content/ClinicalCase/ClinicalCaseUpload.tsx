import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { useState } from "react";

const caseLists = [
  { title: "CHIEF COMPLAINS", description: "Detailed history of patient" },
  { title: "PAST MEDICAL HISTORY", description: "Detailed history of patient" },
  { title: "PHYSICAL EXAMINATION", description: "Detailed history of patient" },
  { title: "INVESTIGATIONS", description: "Detailed history of patient" },
  { title: "Medication", description: "Detailed history of patient" },
  { title: "Imaging", description: "Detailed history of patient" },
];

type MCQOption = { supporting: string; refuting: string };
type MCQ = {
  options: MCQOption[];
  correct: string;
  hint: string;
  explanation: string;
  difficulty: string;
};

interface CreateMCQStudyProps {
  breadcrumb: string;
}
const ClinicalCaseUpload: React.FC<CreateMCQStudyProps> = ({ breadcrumb }) => {
  const [clinicalQuestions, setClinicalQuestions] = useState<string[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);

  const addClinicalQuestion = () => {
    setClinicalQuestions([...clinicalQuestions, ""]);
  };

  const removeClinicalQuestion = (index: number) => {
    setClinicalQuestions(clinicalQuestions.filter((_, i) => i !== index));
  };

  const updateClinicalQuestion = (index: number, value: string) => {
    const updated = [...clinicalQuestions];
    updated[index] = value;
    setClinicalQuestions(updated);
  };

  const addMCQ = () => {
    const newMCQ: MCQ = {
      options: [
        { supporting: "", refuting: "" },
        { supporting: "", refuting: "" },
        { supporting: "", refuting: "" },
        { supporting: "", refuting: "" },
      ],
      correct: "Option A",
      hint: "",
      explanation: "",
      difficulty: "Low",
    };
    setMcqs([...mcqs, newMCQ]);
  };

  const removeMCQ = (index: number) => {
    setMcqs(mcqs.filter((_, i) => i !== index));
  };

  const updateMCQOption = (
    mcqIndex: number,
    optionIndex: number,
    field: "supporting" | "refuting",
    value: string
  ) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].options[optionIndex][field] = value;
    setMcqs(updatedMCQs);
  };

  const updateMCQField = (
    mcqIndex: number,
    field: keyof Omit<MCQ, "options">,
    value: string
  ) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex][field] = value;
    setMcqs(updatedMCQs);
  };

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Add Notes Content"
        description={breadcrumb}
        descriptionClassName="!text-[#717182]"
      />

      {/* Case Details */}
      {caseLists.map((item, index) => (
        <div key={index}>
          <label className={inputClass.label}>{item.title}</label>
          <textarea className={inputClass.input} rows={3} />
        </div>
      ))}

      {/* Clinical Questions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Clinical Questions
          </h2>
          <button
            onClick={addClinicalQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Clinical Question
          </button>
        </div>

        {clinicalQuestions.map((question, index) => (
          <div key={index} className="relative">
            <textarea
              placeholder="Enter your clinical question here..."
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={question}
              onChange={(e) => updateClinicalQuestion(index, e.target.value)}
            />
            <button
              onClick={() => removeClinicalQuestion(index)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* MCQs Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">MCQs</h2>
          <button
            onClick={addMCQ}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add MCQ
          </button>
        </div>

        {mcqs.map((mcq, mcqIndex) => (
          <div
            key={mcqIndex}
            className="p-4 border border-gray-200 rounded bg-gray-50 space-y-4 relative"
          >
            <button
              onClick={() => removeMCQ(mcqIndex)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>

            {["A", "B", "C", "D"].map((option, optionIndex) => (
              <div key={option} className="space-y-2">
                <h3 className="font-medium text-gray-700">Option {option}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Supporting evidence"
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={mcq.options[optionIndex].supporting}
                    onChange={(e) =>
                      updateMCQOption(
                        mcqIndex,
                        optionIndex,
                        "supporting",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Refuting evidence"
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                    value={mcq.options[optionIndex].refuting}
                    onChange={(e) =>
                      updateMCQOption(
                        mcqIndex,
                        optionIndex,
                        "refuting",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Correct Diagnosis</h3>
              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={mcq.correct}
                onChange={(e) =>
                  updateMCQField(mcqIndex, "correct", e.target.value)
                }
              >
                {["Option A", "Option B", "Option C", "Option D"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Hints"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={2}
                value={mcq.hint}
                onChange={(e) =>
                  updateMCQField(mcqIndex, "hint", e.target.value)
                }
              />
              <textarea
                placeholder="Explain"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                value={mcq.explanation}
                onChange={(e) =>
                  updateMCQField(mcqIndex, "explanation", e.target.value)
                }
              />

              <select
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={mcq.difficulty}
                onChange={(e) =>
                  updateMCQField(mcqIndex, "difficulty", e.target.value)
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalCaseUpload;
