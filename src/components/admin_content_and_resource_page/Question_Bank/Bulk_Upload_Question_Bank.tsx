import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import UploadDropzone from "@/components/admin_Content & Resource_Component/Bulk Update Components/UpdateDropZone";
import RequiredColumnsList from "@/components/admin_Content & Resource_Component/Bulk Update Components/RequiredColumsList";
import UploadPreview from "@/components/admin_Content & Resource_Component/Bulk Update Components/UploadPreview";
import ActionButtons from "@/components/admin_Content & Resource_Component/Bulk Update Components/ActionButtons";

interface AddQuestionProps {
  onBack?: () => void;
}

const BulkUploadQuestions: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [detectedCount, setDetectedCount] = useState(0);

  const columns = [
    { label: "Subject", description: "Subject category" },
    { label: "Difficulty", description: "Basic, Intermediate, or Advanced" },
    { label: "Question Type", description: "The question Type text" },
    { label: "Question", description: "The question text" },
    { label: "Option A", description: "First answer option" },
    { label: "Option B", description: "Second answer option" },
    { label: "Option C", description: "Third answer option" },
    { label: "Option D", description: "Fourth answer option" },
    { label: "Correct Answer", description: "A, B, C, or D" },
    {
      label: "Explanation",
      description: "Detailed explanation for correct answer",
    },
  ];

  const handleFileSelect = (file: File) => {
    console.log("File uploaded:", file.name);
    setDetectedCount(Math.floor(Math.random() * 50) + 1); // simulate detection
  };

  const handleImport = () => {
    alert("Questions imported successfully!");
  };

  const handleCancel = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto">
        {/* Top Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Bulk Upload Questions
        </h1>
        <p className=" mb-8 text-slate-700 font-inter text-sm font-normal leading-5">
          Basic concepts in cardiovascular medicine
        </p>

        <div className="shadow-sm p-16 mb-6 rounded border border-slate-300 bg-white">
          <UploadDropzone
            label="Upload Question files"
            acceptedFormats=".csv, .xlsx, .xls"
            maxSize="10MB"
            onFileSelect={handleFileSelect}
          />
        </div>

        <RequiredColumnsList columns={columns} />
        <UploadPreview detectedCount={detectedCount} label="Upload Preview" />
        <ActionButtons
          onImport={handleImport}
          onCancel={handleCancel}
          importLabel="Import Questions"
        />
      </div>
    </div>
  );
};

export default BulkUploadQuestions;
