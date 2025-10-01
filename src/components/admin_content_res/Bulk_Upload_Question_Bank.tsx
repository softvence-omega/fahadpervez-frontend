import React, { useState } from 'react';
import UploadDropzone from "@/components/admin_Content & Resource/Bulk Update Components/UpdateDropZone";
import RequiredColumnsList from "@/components/admin_Content & Resource/Bulk Update Components/RequiredColumsList";
import UploadPreview from "@/components/admin_Content & Resource/Bulk Update Components/UploadPreview";
import ActionButtons from "@/components/admin_Content & Resource/Bulk Update Components/ActionButtons";

const BulkUploadQuestions: React.FC = () => {
  const [detectedCount, setDetectedCount] = useState(0);

  const columns = [
    { label: 'Subject', description: 'Subject category' },
    { label: 'Difficulty', description: 'Basic, Intermediate, or Advanced' },
    { label: 'Question Type', description: 'The question Type text' },
    { label: 'Question', description: 'The question text' },
    { label: 'Option A', description: 'First answer option' },
    { label: 'Option B', description: 'Second answer option' },
    { label: 'Option C', description: 'Third answer option' },
    { label: 'Option D', description: 'Fourth answer option' },
    { label: 'Correct Answer', description: 'A, B, C, or D' },
    { label: 'Explanation', description: 'Detailed explanation for correct answer' },
  ];

  const handleFileSelect = (file: File) => {
    console.log('File uploaded:', file.name);
    setDetectedCount(Math.floor(Math.random() * 50) + 1); // simulate detection
  };

  const handleImport = () => {
    alert('Questions imported successfully!');
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Bulk Upload Questions</h1>
        <p className="text-sm text-gray-600 mb-8">Basic concepts in cardiovascular medicine</p>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <UploadDropzone
            label="Upload Question files"
            acceptedFormats=".csv, .xlsx, .xls"
            maxSize="10MB"
            onFileSelect={handleFileSelect}
          />
        </div>

        <RequiredColumnsList columns={columns} />
        <UploadPreview detectedCount={detectedCount} label="Upload Preview" />
        <ActionButtons onImport={handleImport} onCancel={handleCancel} importLabel="Import Questions" />
      </div>
    </div>
  );
};

export default BulkUploadQuestions;
