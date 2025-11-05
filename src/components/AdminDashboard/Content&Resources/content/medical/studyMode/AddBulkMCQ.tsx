import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useUploadBulkMcqApiMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { showAddContent } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "../../ActionButtons";
import RequiredColumnsList from "./RequiredColumsList";
import UploadDropzone from "./UpdateDropZone";
import UploadPreview from "./UploadPreview";

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

const AddBulkMCQ: React.FC<AddQuestionProps> = () => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const selectFormData = useSelector(
    (state: RootState) => state.staticContent.formData
  );

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
      if (selectFormData) {
        formData.append("data", JSON.stringify(selectFormData));
      }
      if (formData) {
        await uploadBulkMcqApi(formData);
        dispatch(showAddContent());
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <CommonBorderWrapper>
        <div className=" pt-6">
          <div className="mx-auto">
            <div className="shadow-sm p-16 mb-6 rounded border border-slate-300 bg-white">
              <UploadDropzone
                label="Upload Question files"
                acceptedFormats=".csv, .xlsx, .xls"
                maxSize="10MB"
                onFileSelect={handleFileSelect}
              />
            </div>

            <RequiredColumnsList columns={columns} />
            <UploadPreview
              detectedCount={detectedCount}
              label="Upload Preview"
            />
          </div>
        </div>
      </CommonBorderWrapper>
      <ActionButtons
        onSavePublish={handleImport}
        isLoading={isUploading}
        onCancel={() => dispatch(showAddContent())}
      />
    </>
  );
};

export default AddBulkMCQ;
