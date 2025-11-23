import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import StepIndicator from "../medical/StepIndicator";
import { steps } from "../medical/createContent/CreateContent";

import { Upload, X } from "lucide-react";
import React, { useState } from "react";
import ActionButtons from "../ActionButtons";

import { usePostNotesMutation } from "@/store/features/adminDashboard/ContentResources/Notes/NoteSlice";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface FileWithPreview {
  file: File;
  id: string;
}

interface CreateMCQStudyProps {
  breadcrumb: string;
}

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const activeStep = 2;

// *************** FIXED SCHEMA (file can be null) ***************
const notesSchema = z.object({
  description: z.string().min(1, "Description is required"),
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, "File is required")
    .refine(
      (file) =>
        file === null ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only PDF, DOC, DOCX files allowed"
    )
    .refine(
      (file) => file === null || file.size <= 10 * 1024 * 1024,
      "Max file size is 10MB"
    ),
});

type NotesFormValues = z.infer<typeof notesSchema>;

const NotesUpload: React.FC<CreateMCQStudyProps> = ({ breadcrumb }) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NotesFormValues>({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      description: "",
      file: null,
    },
  });

  // -------------------------
  // HANDLE SINGLE FILE UPLOAD
  // -------------------------
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const isValidType = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type);

    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType || !isValidSize) return;

    const newFile = {
      file,
      id: `${file.name}-${Date.now()}`,
    };

    setUploadedFiles([newFile]);
    setValue("file", file, { shouldValidate: true });
  };

  const removeFile = () => {
    setUploadedFiles([]);
    setValue("file", null, { shouldValidate: true });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const selectFormData = useSelector(
    (state: RootState) => state.staticContent.formData
  );
  const [postNotes, { isLoading }] = usePostNotesMutation();

  const onSubmit = async (notes: NotesFormValues) => {
    try {
      if (selectFormData) {
        const { description, file } = notes;
        const data = { description, ...selectFormData };

        const formdata = new FormData();
        formdata.append("data", JSON.stringify(data));

        if (file) formdata.append("files", file);

        await postNotes(formdata).unwrap();
        console.log("FINAL SUBMIT PAYLOAD:", formdata);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    setUploadedFiles([]);
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashboardTopSection
        title="Add Notes Content"
        description={breadcrumb}
        descriptionClassName="!text-[#717182]"
      />

      <CommonSpace>
        <StepIndicator steps={steps} activeStep={activeStep} />
      </CommonSpace>

      {/* Description Field */}
      <div>
        <label className={inputClass.label}>Description</label>
        <textarea
          {...register("description")}
          className={inputClass.input}
          placeholder="Detailed history of patient"
        />
        {errors.description && (
          <p className={inputClass.error}>{errors.description.message}</p>
        )}
      </div>

      {/* File Upload Section */}
      <div className="max-w-[670px] mx-auto py-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files);
          }}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-700 font-medium mb-1">
                  upload Notes files
                </p>
                <p className="text-sm text-slate-500">
                  Supported formats: PDF, DOC, DOCX (max. 10MB)
                </p>
              </div>
            </div>
          </label>
        </div>

        {errors.file && (
          <p className={`${inputClass.error} mb-4`}>
            {errors.file.message as string}
          </p>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            {uploadedFiles.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 mt-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xs">
                      {item.file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(item.file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ActionButtons
        onCancel={() => handleCancel()}
        importLabel="Save & Publish Notes"
        onSavePublish={() => {
          handleSubmit(onSubmit)();
        }}
        isLoading={isLoading}
      />
    </form>
  );
};

export default NotesUpload;
