import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  useUploadManualMcqMutation,
  useUploadSingleImageMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { correctAnswerOptions, difficultyOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ActionButtons from "../ActionButtons";

const MCQOptionSchema = z.object({
  option: z.string(),
  optionText: z.string().min(1, { message: "Option text is required" }),
  explanation: z.string().optional(),
});

const MCQSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
  question: z.string().min(1, { message: "Question is required" }),
  imageDescription: z.string().url().optional().or(z.literal("")),
  options: z.array(MCQOptionSchema).length(4),
  correctOption: z.string(),
});

const FinalSchema = z.object({
  mcqs: z.array(MCQSchema).min(1),
});

type MCQFormValues = z.infer<typeof FinalSchema>;

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};

const AddMCQForm = () => {
  const { formData, contentType } = useAppSelector(
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
    reset,
    setValue,
    formState: { errors },
  } = useForm<MCQFormValues>({
    resolver: zodResolver(FinalSchema),
    defaultValues: {
      mcqs: [
        {
          question: "",
          difficulty: "Basic",
          correctOption: "A",
          options: defaultOptions,
          imageDescription: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mcqs",
  });

  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();

  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>(
    {}
  );

  const handleUploadImage = async (file: File, qIndex: number) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const result = await uploadSingleImage(formData).unwrap();
      const fileUrl = result.data.fileUrl;

      setValue(`mcqs.${qIndex}.imageDescription`, fileUrl);
      setImagePreviews((prev) => ({
        ...prev,
        [qIndex]: fileUrl,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const onSubmit = async (data: MCQFormValues) => {
    if (formData) {
      const formattedPayload = {
        ...formData,
        mcqs: data.mcqs,
      };

      try {
        await uploadManualMcq(formattedPayload).unwrap();
        navigate(`/admin/content-management/dashboard/${contentType}`);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  const handleSavePublish = () => {
    handleSubmit(onSubmit)();
    setImagePreviews({});
    reset();
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, qIndex) => (
        <CommonBorderWrapper key={field.id} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Question {qIndex + 1}</h2>

            {fields.length > 1 && (
              <CommonButton
                type="button"
                onClick={() => remove(qIndex)}
                className="text-red-500 "
              >
                Remove Question
              </CommonButton>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className={inputClass.label}>Question</label>
              <textarea
                {...register(`mcqs.${qIndex}.question`)}
                rows={4}
                className={inputClass.input}
                placeholder="Question Text"
              />
              {errors.mcqs?.[qIndex]?.question && (
                <p className={inputClass.error}>
                  {errors.mcqs[qIndex]?.question?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Image</label>
              <input
                type="file"
                accept="image/*"
                className={` cursor-pointer ${inputClass.input}`}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUploadImage(e.target.files[0], qIndex);
                  }
                }}
                disabled={isUploadingImage}
              />
              {isUploadingImage && (
                <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
              )}
              {imagePreviews[qIndex] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[qIndex]}
                    alt={`Preview for question ${qIndex + 1}`}
                    className="max-h-40 object-contain border rounded"
                  />
                  <p className="text-green-600 text-sm mt-1">
                    Image uploaded successfully!
                  </p>
                </div>
              )}
              <input
                type="hidden"
                {...register(`mcqs.${qIndex}.imageDescription`)}
              />
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
                    <span className={inputClass.label}>
                      {String.fromCharCode(65 + index)}
                    </span>

                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder={`Enter option ${String.fromCharCode(
                          65 + index
                        )}`}
                        {...register(
                          `mcqs.${qIndex}.options.${index}.optionText` as const
                        )}
                        className={inputClass.input}
                      />

                      {errors.mcqs?.[qIndex]?.options?.[index]?.optionText && (
                        <p className={inputClass.error}>
                          {
                            errors.mcqs[qIndex]?.options?.[index]?.optionText
                              ?.message
                          }
                        </p>
                      )}

                      <textarea
                        placeholder="Explanation (optional)"
                        rows={2}
                        {...register(
                          `mcqs.${qIndex}.options.${index}.explanation` as const
                        )}
                        className={`${inputClass.input} resize-none mt-2`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={inputClass.label}>Correct Answer</label>
              <Controller
                control={control}
                name={`mcqs.${qIndex}.correctOption`}
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value || undefined}
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
                name={`mcqs.${qIndex}.difficulty`}
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
      ))}
      <div className="mb-6 flex items-center justify-between ">
        <CommonButton
          type="button"
          onClick={() =>
            append({
              question: "",
              difficulty: "Basic",
              correctOption: "A",
              options: defaultOptions,
              imageDescription: "",
            })
          }
          className=" !text-blue-600  "
        >
          + Add Another Question
        </CommonButton>

        <ActionButtons
          isLoading={isUploading}
          onSavePublish={handleSavePublish}
          onCancel={handleCancel}
        />
      </div>
    </form>
  );
};

export default AddMCQForm;
