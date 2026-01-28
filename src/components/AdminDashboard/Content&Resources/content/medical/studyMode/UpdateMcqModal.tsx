import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { ANSWER_OPTIONS, CorrectAnswerOption, DifficultyLevel } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateMCQModalProps {
  data: BackendMCQData;
  onClose: () => void;
  onSubmit: (data: BackendMCQData) => void;
  isLoading?: boolean;
}

export interface BackendMCQData {
  difficulty: DifficultyLevel;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  optionF?: string;

  correctOption: CorrectAnswerOption;
  explanationA?: string;
  explanationB?: string;
  explanationC?: string;
  explanationD?: string;
  explanationE?: string;
  explanationF?: string;
}

// Zod schema
const UpdateMCQSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
  question: z.string().min(1, "Question is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  optionE: z.string().optional(),
  optionF: z.string().optional(),

  correctOption: z.enum(ANSWER_OPTIONS),
  explanationA: z.string().optional(),
  explanationB: z.string().optional(),
  explanationC: z.string().optional(),
  explanationD: z.string().optional(),
  explanationE: z.string().optional(),
  explanationF: z.string().optional(),
});

type UpdateMCQFormValues = z.infer<typeof UpdateMCQSchema>;

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

// Options and types
const options = ["A", "B", "C", "D", "E", "F"] as const;
type OptionKey = (typeof options)[number];

const correctAnswerOptions = options.map((o) => ({ label: o, value: o }));
const difficultyOptions = [
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
];

const UpdateMcqModal: FC<UpdateMCQModalProps> = ({
  data,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateMCQFormValues>({
    resolver: zodResolver(UpdateMCQSchema),
    defaultValues: {
      ...data,
      optionE: data.optionE ?? "",
      optionF: data.optionF ?? "",
      explanationE: data.explanationE ?? "",
      explanationF: data.explanationF ?? "",
    },
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const handleFormSubmit = (formData: UpdateMCQFormValues) => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader title="Update MCQ" />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className={inputClass.label}>Question</label>
            <textarea
              {...register("question")}
              className={inputClass.input}
              rows={3}
              placeholder="Question text"
            />
            {errors.question && (
              <p className={inputClass.error}>{errors.question.message}</p>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((opt) => (
              <div key={opt}>
                <label className={inputClass.label}>Option {opt}</label>
                <input
                  {...register(`option${opt}`)}
                  className={inputClass.input}
                  placeholder={`Option ${opt} text`}
                />
                <textarea
                  {...register(
                    `explanation${opt}` as `explanation${OptionKey}`,
                  )}
                  rows={2}
                  className={`${inputClass.input} mt-2 resize-none`}
                  placeholder={`Explanation for Option ${opt} (optional)`}
                />
                {errors[`option${opt}` as keyof UpdateMCQFormValues] && (
                  <p className={inputClass.error}>
                    {
                      errors[`option${opt}` as keyof UpdateMCQFormValues]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Correct Option and Difficulty */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={inputClass.label}>Correct Option</label>
              <Controller
                control={control}
                name="correctOption"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={correctAnswerOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>

            <div>
              <label className={inputClass.label}>Difficulty</label>
              <Controller
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={difficultyOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <CommonButton type="button" onClick={onClose} className="">
              Cancel
            </CommonButton>

            <CommonButton type="submit" className="!bg-blue-500 !text-white">
              {isLoading ? (
                <ButtonWithLoading title="Updating..." />
              ) : (
                "Update MCQ"
              )}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMcqModal;
