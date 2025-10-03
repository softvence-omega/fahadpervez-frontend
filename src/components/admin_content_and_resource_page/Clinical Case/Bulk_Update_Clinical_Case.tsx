import React from "react";
import UploadDropzone from "@/components/admin_Content & Resource_Component/Bulk Update Components/UpdateDropZone";
import RequiredColumnsList from "@/components/admin_Content & Resource_Component/Bulk Update Components/RequiredColumsList";
import ActionButtons from "@/components/admin_Content & Resource_Component/Bulk Update Components/ActionButtons";

interface Bulk_Upload_Clinical_CaseProps {
  onBack?: () => void;
}

const Bulk_Upload_Clinical_Case: React.FC<Bulk_Upload_Clinical_CaseProps> = ({
  onBack,
}) => {
  const [detectedCount, setDetectedCount] = React.useState<number>(0);

  const columns = [
    { label: "Case Title", description: "Title of the clinical case" },
    {
      label: "Specialty",
      description: "Medical specialty (Cardiology, Neurology, etc.)",
    },
    { label: "Patient Age", description: "Patient age in years" },
    { label: "Patient Gender", description: "Male/Female/Other" },
    { label: "Case Description", description: "Detailed case presentation" },
    { label: "Patient History", description: "Detailed history of patient" },
    { label: "Question Type", description: "The type of question text" },
    { label: "Question", description: "The question text" },
    { label: "Option A", description: "First answer option" },
    { label: "Option B", description: "Second answer option" },
    { label: "Option C", description: "Third answer option" },
    { label: "Option D", description: "Fourth answer option" },
    { label: "Correct Answer", description: "Correct answer (A, B, C, or D)" },
    {
      label: "Explanation",
      description: "Detailed explanation for correct answer",
    },
  ];

  const handleFileSelect = (file: File) => {
    console.log("File uploaded:", file.name);
    setDetectedCount(Math.floor(Math.random() * 50) + 1);
  };

  const handleImport = () => {
    alert("Cards imported successfully!");
    // After successful import, you can call onBack to return to homepage
    // if (onBack) onBack();
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
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
          <div className="mt-4 text-sm text-gray-700">
            Detected Questions: {detectedCount}
          </div>
        </div>

        <RequiredColumnsList columns={columns} />
        <ActionButtons
          onImport={handleImport}
          onCancel={handleCancel}
          importLabel="Import Clinical Case"
        />
      </div>
    </div>
  );
};

export default Bulk_Upload_Clinical_Case;
