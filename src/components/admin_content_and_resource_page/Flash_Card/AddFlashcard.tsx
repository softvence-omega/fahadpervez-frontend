import React, { useState } from "react";
import { Upload, Plus, ArrowLeft } from "lucide-react";
import CommonSpace from "@/common/space/CommonSpace";

interface AddQuestionProps {
  onBack?: () => void;
}

const AddFlashcard: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [subject, setSubject] = useState("Cardiology");
  const [frontSide, setFrontSide] = useState("");
  const [backSide, setBackSide] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSave = () => {
    console.log({ subject, frontSide, backSide, explanation });
    alert("Flashcard Saved!");
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    setFrontSide("");
    setBackSide("");
    setExplanation("");
  };

  const handleBulkUpload = () => {
    alert("Bulk Upload feature");
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              Add Flashcard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Basic concepts in cardiovascular medicine
            </p>
          </div>

          <button
            onClick={handleBulkUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>

        {/* 🧩 Form Section */}
        <CommonSpace>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Front Side Field */}
            <div>
              <label
                htmlFor="frontSide"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Front Side (Question/Term)
              </label>
              <textarea
                id="frontSide"
                value={frontSide}
                onChange={(e) => setFrontSide(e.target.value)}
                rows={4}
                placeholder="Enter the question"
                className="w-full rounded-md border border-slate-300 bg-[#EFF6FF]/60 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* Back Side Field */}
            <div>
              <label
                htmlFor="backSide"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Back Side (Answer/Definition)
              </label>
              <textarea
                id="backSide"
                value={backSide}
                onChange={(e) => setBackSide(e.target.value)}
                rows={4}
                placeholder="Enter the answer"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* Explanation Field */}
            <div>
              <label
                htmlFor="explanation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Explanation
              </label>
              <textarea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={4}
                placeholder="Explain"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-[#0076F5] to-[#0058B8] text-white px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Save Flashcard
              </button>

              <button
                onClick={handleSaveAndAddAnother}
                className="w-full sm:w-auto px-6 py-2.5 text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Save & Add Another
              </button>
            </div>
          </div>
        </CommonSpace>
      </div>
    </div>
  );
};

export default AddFlashcard;
