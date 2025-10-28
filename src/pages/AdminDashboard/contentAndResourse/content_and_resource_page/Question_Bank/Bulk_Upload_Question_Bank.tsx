import React, { useState } from "react";
import UploadDropzone from "@/components/AdminDashboard/Content & Resource_Component/Bulk Update Components/UpdateDropZone";
import RequiredColumnsList from "@/components/AdminDashboard/Content & Resource_Component/Bulk Update Components/RequiredColumsList";
import UploadPreview from "@/components/AdminDashboard/Content & Resource_Component/Bulk Update Components/UploadPreview";
import ActionButtons from "@/components/AdminDashboard/Content & Resource_Component/Bulk Update Components/ActionButtons";
import {
  useGetSingleMcqApiQuery,
  useUploadBulkMcqApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";

interface AddQuestionProps {
  onBack?: () => void;
}

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

const BulkUploadQuestions: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleCancel = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  // get single mcq
  const selectedMcqBankId = localStorage.getItem("selectedMcqBankId");
  const { data: mcqBankData } = useGetSingleMcqApiQuery(
    selectedMcqBankId ?? "",
    { skip: !selectedMcqBankId }
  );

  const payload = {
    mcqBankTitle: mcqBankData?.mcqBankTitle,
    subjectName: mcqBankData?.subjectName,
  };

  const [uploadBulkMcqApi, { isLoading: isUploading }] =
    useUploadBulkMcqApiMutation();
  const handleFileSelect = (file: File, detectedCount: number) => {
    setSelectedFile(file);
    setDetectedCount(detectedCount);
    console.log(`File uploaded: ${file.name}, rows detected: ${detectedCount}`);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (payload) {
        formData.append("data", JSON.stringify(payload));
      }

      if (formData) {
        await uploadBulkMcqApi(formData);
        handleCancel();
      }
    } catch (error: any) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Bulk Upload Questions
        </h1>
        <p className="mb-8 text-slate-700 font-inter text-sm font-normal leading-5">
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
          isLoading={isUploading}
        />
      </div>
    </div>
  );
};

export default BulkUploadQuestions;
