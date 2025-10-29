import React, { useState } from "react";
import { Upload, ChevronDown, Plus, ArrowLeft } from "lucide-react";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import BulkUploadQuestions from "./Bulk_Upload_Question_Bank";
import CustomDropdown from "@/components/AdminDashboard/Content & Resource_Component/CustomDropdown";
import CommonButton from "@/common/button/CommonButton";

interface AddQuestionProps {
  onBack?: () => void;
}

const AddQuestion: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [subject, setSubject] = useState("Cardiology");
  const [system, setSystem] = useState("Cardiology");
  const [topic, setTopic] = useState("Cardiology");
  const [difficultyLabel, setDifficultyLabel] = useState("Medium");
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState([
    { label: "A", text: "", reasoning: "", correct: false },
    { label: "B", text: "", reasoning: "", correct: false },
    { label: "C", text: "", reasoning: "", correct: false },
    { label: "D", text: "", reasoning: "", correct: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("Option A");
  const [explanation, setExplanation] = useState("");
  const [isCorrectAnswerOpen, setIsCorrectAnswerOpen] = useState(false);

  type View = "addQuestion" | "bulkQuestion";

  const [currentView, setCurrentView] = useState<View>("addQuestion");

  if (currentView === "bulkQuestion")
    return <BulkUploadQuestions onBack={() => setCurrentView("addQuestion")} />;

  const correctAnswerOptions = ["Option A", "Option B", "Option C", "Option D"];

  const handleSave = () => {
    console.log({
      subject,
      system,
      topic,
      difficultyLabel,
      questionType,
      question,
      answerOptions,
      correctAnswer,
      explanation,
    });
    alert("Question Saved!");
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    setQuestion("");
    setAnswerOptions([
      { label: "A", text: "", reasoning: "", correct: false },
      { label: "B", text: "", reasoning: "", correct: false },
      { label: "C", text: "", reasoning: "", correct: false },
      { label: "D", text: "", reasoning: "", correct: false },
    ]);
    setExplanation("");
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  function setDifficulty(value: string): void {
    setDifficultyLabel(value);
  }
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-full mx-auto flex flex-col gap-6 sm:gap-8">
        {/* 🏷️ Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
              Add Question
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Basic concept in cardiovascular medicine
            </p>
          </div>

          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <ButtonWithIcon
              icon={Upload}
              className=""
              onClick={() => setCurrentView("bulkQuestion")}
            >
              Bulk Upload
            </ButtonWithIcon>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* System */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System
            </label>
            <input
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <CustomDropdown
              label="Difficulty Label"
              value={difficultyLabel}
              onChange={setDifficulty}
              options={["Beginner", "Intermediate", "Advanced"]}
              placeholder="Select difficulty"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Question Type
            </label>
            <input
              type="text"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
            />
          </div>

          {/* Answer Options - NEW DESIGN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 ">
              Answer Options
            </label>
            <div className="space-y-3">
              {answerOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start rounded-md border border-gray-200 bg-[rgba(239,246,255,0.6)] p-4"
                >
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-medium text-black w-6 h-6 bg-slate-200 flex items-center justify-center rounded-full">
                      {option.label}
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Enter option ${option.label}`}
                      value={option.text}
                      onChange={(e) => {
                        const updated = [...answerOptions];
                        updated[index].text = e.target.value;
                        setAnswerOptions(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    />
                    <textarea
                      placeholder="Explanation (optional)"
                      rows={2}
                      value={option.reasoning}
                      onChange={(e) => {
                        const updated = [...answerOptions];
                        updated[index].reasoning = e.target.value;
                        setAnswerOptions(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCorrectAnswerOpen(!isCorrectAnswerOpen)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-left flex items-center justify-between transition"
              >
                <span className="text-gray-900">{correctAnswer}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isCorrectAnswerOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCorrectAnswerOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {correctAnswerOptions.map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => {
                        setCorrectAnswer(ans);
                        setIsCorrectAnswerOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                        correctAnswer === ans
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <CommonButton onClick={handleBack}>Back</CommonButton>

            <ButtonWithIcon icon={Plus} onClick={handleSave} className="">
              Save Question
            </ButtonWithIcon>

            <CommonButton onClick={handleSaveAndAddAnother}>
              Save & Add Another
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
