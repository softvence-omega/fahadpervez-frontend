"use client";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useUploadManualMcqMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { showAddContent } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ActionButtons from "../../ActionButtons";

// ✅ Zod schema based on your given types
const MCQOptionSchema = z.object({
  option: z.string(),
  optionText: z.string().min(1, { message: "Option text is required" }),
  explanation: z.string().optional(),
});

const MCQSchema = z.object({
  difficulty: z.enum(["Basics", "Intermediate", "Advance"]),
  question: z.string().min(1, { message: "Question is required" }),
  imageDescription: z.string().url().optional(),
  options: z.array(MCQOptionSchema).length(4),
  correctOption: z.string(),
});

type MCQFormValues = z.infer<typeof MCQSchema>;

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};

const AddMCQForm = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const { formData } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const [uploadManualMcq, { isLoading: isUploading }] =
    useUploadManualMcqMutation();

  const defaultOptions = [
    { option: "A", optionText: "", explanation: "" },
    { option: "B", optionText: "", explanation: "" },
    { option: "C", optionText: "", explanation: "" },
    { option: "D", optionText: "", explanation: "" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MCQFormValues>({
    resolver: zodResolver(MCQSchema),
    defaultValues: {
      question: "",
      difficulty: "Basics",
      correctOption: "A",
      options: defaultOptions,
    },
  });

  const correctAnswerOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
    { label: "Option D", value: "D" },
  ] as const;

  const difficultyOptions = [
    { label: "Basics", value: "Basics" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advance", value: "Advance" },
  ] as const;

  const onSubmit = async (data: MCQFormValues) => {
    if (formData) {
      const formattedPayload = {
        ...formData,
        mcqs: [data],
      };
      await uploadManualMcq(formattedPayload);
      dispatch(showAddContent());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonBorderWrapper>
        <div className="space-y-6">
          <div>
            <label className={inputClass.label}>Question</label>
            <textarea
              {...register("question")}
              rows={4}
              className={inputClass.input}
              placeholder="Question Text"
            />
            {errors.question && (
              <p className={inputClass.error}>{errors.question.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Answer Options
            </label>
            <div className="space-y-3">
              {defaultOptions.map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start rounded-md border border-[#CBD5E1] bg-[#EFF6FF]/60 p-4"
                >
                  <div className="flex items-center gap-2 pt-2">
                    <span className={inputClass.label}>
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Enter option ${String.fromCharCode(
                        65 + index
                      )}`}
                      {...register(`options.${index}.optionText` as const)}
                      className={inputClass.input}
                    />
                    {errors.options?.[index]?.optionText && (
                      <p className={inputClass.error}>
                        {errors.options[index]?.optionText?.message}
                      </p>
                    )}
                    <textarea
                      placeholder="Explanation (optional)"
                      rows={2}
                      {...register(`options.${index}.explanation` as const)}
                      className={`${inputClass.input} resize-none mt-2`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label className={inputClass.label}>Correct Answer</label>
            <Controller
              control={control}
              name="correctOption"
              render={({ field }) => (
                <CommonSelect
                  className="!bg-white border-[#CBD5E1]"
                  value={field.value}
                  item={correctAnswerOptions}
                  onValueChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>

          <div>
            <label className={inputClass.label}>Difficulty Label</label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <CommonSelect
                  className="!bg-white border-[#CBD5E1]"
                  value={field.value}
                  item={difficultyOptions}
                  onValueChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>
        </div>
      </CommonBorderWrapper>

      <ActionButtons
        onCancel={() => dispatch(showAddContent())}
        isLoading={isUploading}
      />
    </form>
  );
};

export default AddMCQForm;
