import React, { useState } from "react";
import UploadDropzone from "@/components/admin_Content & Resource_Component/Bulk Update Components/UpdateDropZone";
import RequiredColumnsList from "@/components/admin_Content & Resource_Component/Bulk Update Components/RequiredColumsList";
import UploadPreview from "@/components/admin_Content & Resource_Component/Bulk Update Components/UploadPreview";
import ActionButtons from "@/components/admin_Content & Resource_Component/Bulk Update Components/ActionButtons";
import { ArrowLeft } from "lucide-react";

interface AddQuestionProps {
  onBack?: () => void;
}

const Bulk_Upload_Flashcard: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [detectedCount, setDetectedCount] = useState(0);

  const columns = [
    { label: "Subject", description: "Subject category" },
    { label: "Front Side", description: "Basic: Front Side (Question/Term)" },
    { label: "Back Side", description: "Back Side (Answer/Definition)" },
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
    alert("Cards imported successfully!");
  };


  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        {/* Top Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* 🏷️ Page Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Bulk Upload Questions
        </h1>
        <p className="text-sm text-gray-600 mb-8">
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
          onCancel={handleBack}
          importLabel="Import Cards"
        />
      </div>
    </div>
  );
};

export default Bulk_Upload_Flashcard;
