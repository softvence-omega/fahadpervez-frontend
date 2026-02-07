import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useCreateExamBulkMutation } from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ActionButtons from "../../ActionButtons";
import RequiredColumnsList from "../../medical/studyMode/RequiredColumsList";
import UploadDropzone from "../../medical/studyMode/UpdateDropZone";
import UploadPreview from "../../medical/studyMode/UploadPreview";

const columns = [
  { label: "Question", description: "The question text" },
  {
    label: "Image Description",
    description: "Description of the question image (if any)",
  },

  { label: "Option A", description: "First answer option" },
  { label: "Explanation A", description: "Explanation for option A" },

  { label: "Option B", description: "Second answer option" },
  { label: "Explanation B", description: "Explanation for option B" },

  { label: "Option C", description: "Third answer option" },
  { label: "Explanation C", description: "Explanation for option C" },

  { label: "Option D", description: "Fourth answer option" },
  { label: "Explanation D", description: "Explanation for option D" },

  { label: "Correct Option", description: "Correct answer: A, B, C, or D" },
  { label: "Difficulty", description: "Basic, Intermediate, or Advanced" },
];

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

const bulkExamSchema = z.object({
  examName: z.string().min(1, { message: "Exam Name is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  totalTime: z.number().min(1, { message: "Total Time is required" }), // Changed this line
});

type BulkExamFormData = z.infer<typeof bulkExamSchema>;

interface MCQFormValues {
  onClose: () => void;
}
const BulkExamModal: React.FC<MCQFormValues> = ({ onClose }) => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { profileType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BulkExamFormData>({
    resolver: zodResolver(bulkExamSchema),
    defaultValues: {
      examName: "",
      subject: "",
      totalTime: 0,
    },
  });
  const [uploadBulkMcqApi, { isLoading: isUploading }] =
    useCreateExamBulkMutation();

  const handleFileSelect = (file: File, detectedCount: number) => {
    setSelectedFile(file);
    setDetectedCount(detectedCount);
    console.log(`File uploaded: ${file.name}, rows detected: ${detectedCount}`);
  };

  const handleImport = async (data: BulkExamFormData) => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const payload = {
        profileType: profileType,
        examName: data.examName,
        subject: data.subject,
        totalTime: data.totalTime,
      };

      formData.append("data", JSON.stringify(payload));

      if (formData) {
        await uploadBulkMcqApi(formData);
        onClose();
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <div className="w-full fixed inset-0 bg-black/50 flex items-center justify-center z-50  ">
      <div className=" w-[50%] max-h-[90vh] overflow-y-auto bg-white z-100 shadow ">
        <CommonBorderWrapper className="mb-6">
          <h2 className="text-base font-semibold mb-4">Exam Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Exam Name</label>
              <input
                {...register("examName")}
                className={inputClass.input}
                placeholder="Enter exam name"
              />
              {errors.examName && (
                <p className={inputClass.error}>{errors.examName.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Subject</label>
              <input
                {...register("subject")}
                className={inputClass.input}
                placeholder="Enter subject"
              />
              {errors.subject && (
                <p className={inputClass.error}>{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Total Time (minutes)</label>
              <input
                type="number"
                {...register("totalTime", { valueAsNumber: true })}
                className={inputClass.input}
                placeholder="Enter total time"
              />
              {errors.totalTime && (
                <p className={inputClass.error}>{errors.totalTime.message}</p>
              )}
            </div>
          </div>
        </CommonBorderWrapper>
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
        <div className="mb-6">
          <ActionButtons
            onSavePublish={handleSubmit(handleImport)}
            isLoading={isUploading}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkExamModal;
