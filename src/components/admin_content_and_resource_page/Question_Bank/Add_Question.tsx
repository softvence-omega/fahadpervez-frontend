import React, { useState } from "react";
import { Upload, ChevronDown, Plus, ArrowLeft } from "lucide-react";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import BulkUploadQuestions from "./Bulk_Upload_Question_Bank";

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
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("Option A");
  const [explanation, setExplanation] = useState("");
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isCorrectAnswerOpen, setIsCorrectAnswerOpen] = useState(false);

  type View = "addQuestion" | "bulkQuestion";

  const [currentView, setCurrentView] = useState<View>("addQuestion");

  if (currentView === "bulkQuestion")
    return <BulkUploadQuestions onBack={() => setCurrentView("addQuestion")} />;


  const difficulties = ["Easy", "Medium", "Hard"];
  const answerOptions = ["Option A", "Option B", "Option C", "Option D"];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    console.log({
      subject,
      system,
      topic,
      difficultyLabel,
      questionType,
      question,
      options,
      correctAnswer,
      explanation,
    });
    alert("Question Saved!");
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    setQuestion("");
    setOptions(["", "", "", ""]);
    setExplanation("");
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-full mx-auto flex flex-col gap-6 sm:gap-8">
        {/* 🔙 Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>

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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              onClick={() => setCurrentView("bulkQuestion")}
            >
              Bulk Upload
            </ButtonWithIcon>
          </div>
        </div>

        {/* 🧩 Form Section */}

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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Label
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-left flex items-center justify-between transition"
              >
                <span className="text-gray-900">{difficultyLabel}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isDifficultyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDifficultyOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        setDifficultyLabel(diff);
                        setIsDifficultyOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                        difficultyLabel === diff
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              )}
            </div>
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

          {/* Answer Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${String.fromCharCode(
                      65 + index
                    )}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
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
                  {answerOptions.map((ans) => (
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

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition"
            >
              Back
            </button>

            <ButtonWithIcon
              icon={Plus}
              onClick={handleSave}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Save Question
            </ButtonWithIcon>

            <button
              onClick={handleSaveAndAddAnother}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition"
            >
              Save & Add Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
