"use client";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import {
  usePostExamMutation,
  useUpdateExamMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { Exam } from "@/store/features/adminDashboard/ContentResources/MCQ/type/tree";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};

// Zod schema
const examSchema = z.object({
  examName: z.string().min(1, { message: "Exam Name is required" }),
});

type ExamFormData = z.infer<typeof examSchema>;

interface CreateQuestionModalProps {
  setIsQuestionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: null | Exam;
}

const CreateExamModal: React.FC<CreateQuestionModalProps> = ({
  setIsQuestionModalOpen,
  initialData,
}) => {
  const [postExam, { isLoading }] = usePostExamMutation();
  const [updateExam, { isLoading: updateLoading }] = useUpdateExamMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      examName: initialData?.examName || "",
    },
  });

  const onSubmit = async (data: ExamFormData) => {
    try {
      if (initialData) {
        await updateExam({ data, examId: initialData._id });
        setIsQuestionModalOpen(false);

        return;
      }
      await postExam(data);
      setIsQuestionModalOpen(false);
    } catch (error) {
      console.error("Failed to create exam", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <CommonBorderWrapper className="w-full max-w-lg relative max-h-full overflow-y-auto">
        <ModalCloseButton onClick={() => setIsQuestionModalOpen(false)} />

        <FormHeader
          title={initialData ? "Update Exam" : "Create New exam"}
          subtitle={
            initialData
              ? "Update Exam Details"
              : "Create a new exam. You can upload MCQ content to this exam and organize it using the subject hierarchy."
          }
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className={inputClass.label}>Exam Name</label>
            <input
              type="text"
              placeholder="Anatomy"
              className={inputClass.input}
              {...register("examName")}
            />
            {errors.examName && (
              <p className={inputClass.error}>{errors.examName.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CommonButton
              type="button"
              onClick={() => setIsQuestionModalOpen(false)}
            >
              Cancel
            </CommonButton>
            <CommonButton
              type="submit"
              className="!bg-blue-500 text-white"
              disabled={isLoading || updateLoading}
            >
              {isLoading || updateLoading ? (
                <ButtonWithLoading
                  title={isLoading ? "Saving" : updateLoading ? "Updating" : ""}
                />
              ) : (
                "Save"
              )}
            </CommonButton>
          </div>
        </form>
      </CommonBorderWrapper>
    </div>
  );
};

export default CreateExamModal;
